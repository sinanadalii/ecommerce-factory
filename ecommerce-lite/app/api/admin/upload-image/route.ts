import { NextResponse } from "next/server";

const MAX_BYTES = 8 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
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

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development" && process.env.ENABLE_LOCAL_IMAGE_UPLOADS !== "true") {
    return NextResponse.json(
      { error: "Local image uploads are disabled outside development." },
      { status: 501 },
    );
  }

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

  const [{ promises: fs }, path, crypto] = await Promise.all([
    import("node:fs"),
    import("node:path"),
    import("node:crypto"),
  ]);

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const filename = `${safeName(file.name)}-${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
  const target = path.join(uploadsDir, filename);

  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(target, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/uploads/${filename}` });
}
