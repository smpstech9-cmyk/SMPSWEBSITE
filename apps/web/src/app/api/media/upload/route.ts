import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import path from "path";

export const dynamic = "force-dynamic";

const RAW_API = process.env.NEXT_PUBLIC_API_URL || "https://smpswebsite.onrender.com";
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

    // 1. Cloudinary Storage (25 GB Free Cloud Storage - Never Disappears)
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    const API_KEY = process.env.CLOUDINARY_API_KEY;
    const API_SECRET = process.env.CLOUDINARY_API_SECRET;

    if (CLOUD_NAME && API_KEY && API_SECRET) {
      const timestamp = Math.round(Date.now() / 1000);
      const toSign = `timestamp=${timestamp}${API_SECRET}`;
      const signature = crypto.createHash("sha1").update(toSign).digest("hex");

      const uploadBody = new URLSearchParams();
      uploadBody.append("file", `data:${file.type};base64,${base64Data}`);
      uploadBody.append("api_key", API_KEY);
      uploadBody.append("timestamp", timestamp.toString());
      uploadBody.append("signature", signature);

      const cldRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: uploadBody,
        }
      );

      const cldData = await cldRes.json();
      if (!cldRes.ok || !cldData.secure_url) {
        throw new Error(cldData.error?.message || "Cloudinary upload failed");
      }

      const publicUrl = cldData.secure_url;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        fileName: file.name,
        sizeBytes: buffer.length,
        mimeType: file.type,
        uploadedAt: new Date().toISOString(),
        provider: "cloudinary",
      });
    }

    // 2. Fallback to server/backend upload
    const ext = path.extname(file.name) || `.${file.type.split("/")[1] || "jpg"}`;
    const cleanExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, "");
    const randomHash = crypto.randomBytes(8).toString("hex");
    const safeBaseName = file.name
      .replace(ext, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const fileName = `${safeBaseName}-${Date.now()}-${randomHash}${cleanExt}`;
    const publicUrl = `/uploads/${fileName}`;

    // Direct Database Storage: Persist permanently into the database via backend API
    const dbRes = await fetch(`${API_BASE}/api/v1/media/record`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: fileName,
        file_url: publicUrl,
        mime_type: file.type,
        size_bytes: buffer.length,
        data_base64: base64Data,
      }),
    });

    if (!dbRes.ok) {
      const errText = await dbRes.text();
      console.error("Database media recording failed:", errText);
      return NextResponse.json(
        { error: `Database failed to store media: ${errText || dbRes.statusText}` },
        { status: 502 }
      );
    }

    const dbAsset = await dbRes.json();

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      sizeBytes: buffer.length,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
      dbAsset,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save uploaded image" },
      { status: 500 }
    );
  }
}
