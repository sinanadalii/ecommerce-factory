import { NextResponse } from "next/server";

const R2_UPLOAD_PREFIX = "admin-uploads";
const KV_UPLOAD_PREFIX = "admin-upload";

type UploadMetadata = {
  contentType?: string;
  cacheControl?: string;
};

async function getUploadStore(): Promise<{ bucket?: R2Bucket; kv?: KVNamespace }> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const cloudflareEnv = env as CloudflareEnv;
    return { bucket: cloudflareEnv.UPLOADS, kv: cloudflareEnv.CLIENT_CONFIGS };
  } catch {
    return {};
  }
}

function safeFilename(value: string): string | null {
  if (!/^[a-z0-9][a-z0-9.-]*\.(png|jpg|jpeg|webp|gif)$/i.test(value)) return null;
  if (value.includes("..")) return null;
  return value;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename: rawFilename } = await params;
  const filename = safeFilename(rawFilename);
  if (!filename) return NextResponse.json({ error: "Invalid upload path." }, { status: 400 });

  const uploadStore = await getUploadStore();
  if (uploadStore.bucket) {
    const object = await uploadStore.bucket.get(`${R2_UPLOAD_PREFIX}/${filename}`);
    if (!object) return NextResponse.json({ error: "Upload not found." }, { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("cache-control", headers.get("cache-control") ?? "public, max-age=31536000, immutable");

    return new Response(object.body, { headers });
  }

  if (uploadStore.kv) {
    const result = await uploadStore.kv.getWithMetadata<UploadMetadata>(
      `${KV_UPLOAD_PREFIX}:${filename}`,
      "arrayBuffer",
    );
    if (!result.value) return NextResponse.json({ error: "Upload not found." }, { status: 404 });

    const headers = new Headers({
      "content-type": result.metadata?.contentType ?? "application/octet-stream",
      "cache-control": result.metadata?.cacheControl ?? "public, max-age=31536000, immutable",
    });

    return new Response(result.value, { headers });
  }

  if (!uploadStore.bucket && !uploadStore.kv) {
    return NextResponse.json({ error: "Upload storage is not configured." }, { status: 501 });
  }
}
