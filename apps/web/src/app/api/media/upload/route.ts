import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

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

    // Upload directly to Cloudinary
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    const API_KEY = process.env.CLOUDINARY_API_KEY;
    const API_SECRET = process.env.CLOUDINARY_API_SECRET;

    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary credentials not configured in environment" },
        { status: 500 }
      );
    }

    const timestamp = Math.round(Date.now() / 1000);
    const toSign = `timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto.createHash("sha1").update(toSign).digest("hex");

    const uploadBody = new URLSearchParams();
    uploadBody.append("file", `data:${file.type};base64,${base64Data}`);
    uploadBody.append("api_key", API_KEY);
    uploadBody.append("timestamp", timestamp.toString());
    uploadBody.append("signature", signature);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const cldRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: uploadBody,
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    const cldData = await cldRes.json();
    if (!cldRes.ok || !cldData.secure_url) {
      throw new Error(cldData.error?.message || "Cloudinary upload failed");
    }

    const publicUrl = cldData.secure_url;

    // Optional: Record asset in backend database asynchronously
    try {
      const dbBase = process.env.BACKEND_API_URL || "http://localhost:8000";
      const dbController = new AbortController();
      const dbTimeout = setTimeout(() => dbController.abort(), 2000);

      await fetch(`${dbBase}/api/v1/media/record`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          file_url: publicUrl,
          mime_type: file.type,
          size_bytes: buffer.length,
          data_base64: base64Data,
        }),
        signal: dbController.signal,
      }).catch(() => {});
      clearTimeout(dbTimeout);
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
      sizeBytes: buffer.length,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
      provider: "cloudinary",
    });
  } catch (error: any) {
    console.error("Cloudinary media upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image to Cloudinary" },
      { status: 500 }
    );
  }
}
