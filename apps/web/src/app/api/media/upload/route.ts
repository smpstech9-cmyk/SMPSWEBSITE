import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import path from "path";
import fs from "fs/promises";

export const dynamic = "force-dynamic";

const RAW_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_BASE = RAW_API.replace(/\/api\/v1\/?$/, "");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided in upload request" },
        { status: 400 }
      );
    }

    // Verify it is an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: `File type "${file.type}" is not supported. Please upload an image.` },
        { status: 400 }
      );
    }

    // Read image binary bytes directly into memory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString("base64");

    const ext = path.extname(file.name) || `.${file.type.split("/")[1] || "jpg"}`;
    const cleanExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, "");
    const randomHash = crypto.randomBytes(8).toString("hex");
    const safeBaseName = file.name
      .replace(ext, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const fileName = `${safeBaseName}-${Date.now()}-${randomHash}${cleanExt}`;

    // 1. Guaranteed Local Filesystem Persistence: Save into public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const localFilePath = path.join(uploadDir, fileName);
    await fs.writeFile(localFilePath, buffer);
    const localPublicUrl = `/uploads/${fileName}`;

    // 2. Try Cloudinary if keys exist, but never fail or throw if offline / unreachable
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    const API_KEY = process.env.CLOUDINARY_API_KEY;
    const API_SECRET = process.env.CLOUDINARY_API_SECRET;

    if (CLOUD_NAME && API_KEY && API_SECRET) {
      try {
        const timestamp = Math.round(Date.now() / 1000);
        const toSign = `timestamp=${timestamp}${API_SECRET}`;
        const signature = crypto.createHash("sha1").update(toSign).digest("hex");

        const uploadBody = new URLSearchParams();
        uploadBody.append("file", `data:${file.type};base64,${base64Data}`);
        uploadBody.append("api_key", API_KEY);
        uploadBody.append("timestamp", timestamp.toString());
        uploadBody.append("signature", signature);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const cldRes = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: uploadBody,
            signal: controller.signal,
          }
        );
        clearTimeout(timeoutId);

        if (cldRes.ok) {
          const cldData = await cldRes.json();
          if (cldData.secure_url) {
            return NextResponse.json({
              success: true,
              url: cldData.secure_url,
              localUrl: localPublicUrl,
              fileName: file.name,
              sizeBytes: buffer.length,
              mimeType: file.type,
              uploadedAt: new Date().toISOString(),
              provider: "cloudinary",
            });
          }
        }
      } catch (cldErr) {
        console.warn("Cloudinary upload bypassed/failed, continuing with local disk storage:", (cldErr as Error).message);
      }
    }

    // 3. Try recording asset in database API asynchronously (non-blocking)
    try {
      const dbBase = process.env.BACKEND_API_URL || "http://localhost:8000";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      await fetch(`${dbBase}/api/v1/media/record`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: fileName,
          file_url: localPublicUrl,
          mime_type: file.type,
          size_bytes: buffer.length,
          data_base64: base64Data,
        }),
        signal: controller.signal,
      }).catch(() => {});
      clearTimeout(timeoutId);
    } catch {
      // Non-blocking
    }

    // 4. Return guaranteed local disk URL
    return NextResponse.json({
      success: true,
      url: localPublicUrl,
      fileName,
      sizeBytes: buffer.length,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
      provider: "local-storage",
    });
  } catch (error: any) {
    console.error("Local media upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save uploaded image" },
      { status: 500 }
    );
  }
}
