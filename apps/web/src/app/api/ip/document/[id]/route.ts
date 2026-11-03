import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { IP_ASSETS_REGISTRY } from "@/lib/ip-registry-data";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const asset = IP_ASSETS_REGISTRY.find(
      (a) => a.id.toLowerCase() === id.toLowerCase() || a.code.toLowerCase().includes(id.toLowerCase())
    );

    if (!asset || !asset.file) {
      return NextResponse.json({ error: "IP Document not found" }, { status: 404 });
    }

    // Search for file in public documents folder
    const basePath = path.join(
      process.cwd(),
      "public",
      "documents",
      "IPs",
      "drive-download-20261103T132506Z-1-001",
      asset.file
    );

    let targetPath = basePath;
    if (!fs.existsSync(targetPath)) {
      // Fallback search
      const fallbackDir = path.join(process.cwd(), "public", "documents", "IPs");
      if (fs.existsSync(fallbackDir)) {
        const findInDir = (dir: string): string | null => {
          const files = fs.readdirSync(dir, { withFileTypes: true });
          for (const f of files) {
            const p = path.join(dir, f.name);
            if (f.isDirectory()) {
              const res = findInDir(p);
              if (res) return res;
            } else if (f.name === asset.file) {
              return p;
            }
          }
          return null;
        };
        const found = findInDir(fallbackDir);
        if (found) targetPath = found;
      }
    }

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json(
        { error: `File not found on server: ${asset.file}` },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(targetPath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `inline; filename="${asset.file}"`,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (err: any) {
    console.error("Error serving IP document:", err);
    return NextResponse.json(
      { error: "Internal server error serving document" },
      { status: 500 }
    );
  }
}

