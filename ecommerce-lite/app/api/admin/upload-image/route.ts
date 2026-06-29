import { NextResponse } from "next/server";

const MAX_BYTES = 8 * 1024 * 1024;
const R2_UPLOAD_PREFIX = "admin-uploads";
const KV_UPLOAD_PREFIX = "admin-upload";
const EXT_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

type UploadMetadata = {
  contentType: string;
  cacheControl: string;
};

function safeName(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "image"
  );
}

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

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image file first." }, { status: 400 });
  }

  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Only PNG, JPG, WebP and GIF images are supported." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be smaller than 8MB." }, { status: 400 });
  }

  const crypto = await import("node:crypto");
  const filename = `${safeName(file.name)}-${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
  const bytes = await file.arrayBuffer();

  const metadata: UploadMetadata = {
    contentType: file.type,
    cacheControl: "public, max-age=31536000, immutable",
  };
  const uploadStore = await getUploadStore();
  if (uploadStore.bucket) {
    const key = `${R2_UPLOAD_PREFIX}/${filename}`;
    await uploadStore.bucket.put(key, bytes, {
      httpMetadata: {
        contentType: metadata.contentType,
        cacheControl: metadata.cacheControl,
      },
    });

    return NextResponse.json({ url: `/api/uploads/${filename}` });
  }

  if (uploadStore.kv) {
    await uploadStore.kv.put(`${KV_UPLOAD_PREFIX}:${filename}`, bytes, { metadata });
    return NextResponse.json({ url: `/api/uploads/${filename}` });
  }

  if (process.env.NODE_ENV !== "development" && process.env.ENABLE_LOCAL_IMAGE_UPLOADS !== "true") {
    return NextResponse.json(
      { error: "Image uploads need Cloudflare KV or R2 storage in production." },
      { status: 501 },
    );
  }

  const [{ promises: fs }, path] = await Promise.all([import("node:fs"), import("node:path")]);

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const target = path.join(uploadsDir, filename);

  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(target, Buffer.from(bytes));

  return NextResponse.json({ url: `/uploads/${filename}` });
}
