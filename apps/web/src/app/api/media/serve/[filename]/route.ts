import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

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

    // 1. If it exists in local public directory, serve it
    try {
      const localPath = path.join(process.cwd(), "public", "uploads", filename);
      if (existsSync(localPath)) {
        const fileBuffer = await readFile(localPath);
        const ext = path.extname(filename).toLowerCase();
        const mimeTypes: Record<string, string> = {
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".webp": "image/webp",
          ".svg": "image/svg+xml",
          ".gif": "image/gif",
        };
        const contentType = mimeTypes[ext] || "image/jpeg";
        return new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch {
      // Ignore local check on cloud environments
    }

    // 2. Authoritative Database Fetch: Stream directly from the Database via backend API
    const backendRes = await fetch(`${API_BASE}/api/v1/media/file/${encodeURIComponent(filename)}`, {
      cache: "no-store",
    });

    if (backendRes.ok) {
      const arrayBuf = await backendRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);
      const contentType = backendRes.headers.get("content-type") || "image/jpeg";

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse("Image not found in database", { status: 404 });
  } catch (err: any) {
    console.error("Error streaming image from database:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
