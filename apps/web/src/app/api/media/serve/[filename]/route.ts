import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ filename: string }> }
) {
  try {
    const params = await props.params;
    const { filename } = params;
    if (!filename || filename.includes("..") || filename.includes("/")) {
      return new NextResponse("Invalid filename", { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadsDir, filename);

    // 1. If exists on disk, serve it
    if (existsSync(filePath)) {
      const fileBuffer = await readFile(filePath);
      const ext = path.extname(filename).toLowerCase();
      const mimeTypes: Record<string, string> = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
        ".gif": "image/gif",
      };
      const contentType = mimeTypes[ext] || "application/octet-stream";

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // 2. Fetch directly from backend database
    const backendRes = await fetch(`${API_BASE}/api/v1/media/file/${encodeURIComponent(filename)}`, {
      cache: "no-store",
    });

    if (backendRes.ok) {
      const arrayBuf = await backendRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);
      const contentType = backendRes.headers.get("content-type") || "image/jpeg";

      try {
        await mkdir(uploadsDir, { recursive: true });
        await writeFile(filePath, buffer);
      } catch (cacheErr) {
        console.warn("Could not write cache file:", cacheErr);
      }

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse("Image not found in database or storage", { status: 404 });
  } catch (err: any) {
    console.error("Error serving media:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
