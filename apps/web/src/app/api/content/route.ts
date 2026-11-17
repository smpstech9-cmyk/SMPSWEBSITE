import { NextResponse, NextRequest } from "next/server";
import { getCmsContent, saveCmsContent } from "@/lib/server-storage";
import { FullSiteContent } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

const BACKEND_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const content = await getCmsContent();
    return NextResponse.json(content);
  } catch (err) {
    console.error("Local CMS storage read error:", err);
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body: FullSiteContent = await req.json();
    const success = await saveCmsContent(body);

    if (!success) {
      return NextResponse.json({ error: "Failed to persist content locally" }, { status: 500 });
    }

    // Optional background sync to remote backend if alive
    if (BACKEND_URL && !BACKEND_URL.includes("localhost")) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);

      fetch(`${BACKEND_URL}/api/v1/content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      })
        .catch(() => {})
        .finally(() => clearTimeout(timeout));
    }

    return NextResponse.json(body);
  } catch (err) {
    console.error("Error saving content:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
