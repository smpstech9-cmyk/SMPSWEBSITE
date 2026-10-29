import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const RAW_API = process.env.NEXT_PUBLIC_API_URL || "https://smpswebsite.onrender.com";
const API_BASE = RAW_API.replace(/\/api\/v1\/?$/, "");

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/gallery`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Backend returned status ${res.status}`);
    }

    const items = await res.json();
    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
      source: "database",
    });
  } catch (error: any) {
    console.error("Gallery database fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch gallery items from database",
        source: "error",
      },
      { status: 502 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if it's a batch sync request
    if (Array.isArray(body) || body.items) {
      const itemsList = Array.isArray(body) ? body : body.items;
      const res = await fetch(`${API_BASE}/api/v1/gallery/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsList.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category || "labs",
            date: item.date || "",
            location: item.location || "",
            image_url: item.imageUrl || item.image_url,
            description: item.description || "",
          })),
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Batch sync failed");
      }

      const saved = await res.json();
      return NextResponse.json({ success: true, count: saved.length, data: saved });
    }

    // Single item creation / upsert
    const res = await fetch(`${API_BASE}/api/v1/gallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: body.id,
        title: body.title,
        category: body.category || "labs",
        date: body.date || "",
        location: body.location || "",
        image_url: body.imageUrl || body.image_url,
        description: body.description || "",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Item save failed");
    }

    const saved = await res.json();
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    console.error("Gallery database save error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save to database" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  return POST(request);
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
    }

    const res = await fetch(`${API_BASE}/api/v1/gallery/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete item from database");
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
