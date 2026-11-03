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

    // In production / Vercel, redirect directly to static CDN URL to avoid the 4.5MB Serverless payload cap
    const staticPath = `/documents/IPs/drive-download-20261103T132506Z-1-001/${encodeURIComponent(asset.file)}`;
    return NextResponse.redirect(new URL(staticPath, req.url), 307);
  } catch (err: any) {
    console.error("Error serving IP document:", err);
    return NextResponse.json(
      { error: "Internal server error serving document" },
      { status: 500 }
    );
  }
}

