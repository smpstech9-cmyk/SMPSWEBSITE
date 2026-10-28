import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

    // Generate safe, unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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

    // On local systems, optionally cache to disk; on Vercel (read-only filesystem), safely skip
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      await writeFile(path.join(uploadsDir, fileName), buffer);
    } catch {
      // Intentionally non-fatal: Vercel / serverless operates with a read-only filesystem
    }

    // Authoritative Database Persistence via FastAPI backend
    let dbAsset = null;
    try {
      const dbRes = await fetch(`${API_BASE}/api/v1/media/record`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: fileName,
          file_url: publicUrl,
          mime_type: file.type,
          size_bytes: buffer.length,
          data_base64: buffer.toString("base64"),
        }),
      });

      if (dbRes.ok) {
        dbAsset = await dbRes.json();
      } else {
        const errText = await dbRes.text();
        console.error("Database media recording failed:", errText);
        return NextResponse.json(
          { error: `Database failed to store media: ${errText || dbRes.statusText}` },
          { status: 502 }
        );
      }
    } catch (e: any) {
      console.error("Backend database connection error:", e);
      return NextResponse.json(
        { error: `Could not connect to database backend: ${e.message}` },
        { status: 502 }
      );
    }

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
