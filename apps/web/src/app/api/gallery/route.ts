import { NextRequest, NextResponse } from "next/server";
import { getGalleryItems, saveGalleryItems } from "@/lib/server-storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await getGalleryItems();
    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
      source: "local-persistent",
    });
  } catch (error: any) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch gallery items",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let currentItems = await getGalleryItems();

    // Check if it's a batch sync request
    if (Array.isArray(body) || body.items) {
      const itemsList = Array.isArray(body) ? body : body.items;
      currentItems = itemsList.map((item: any) => ({
        id: item.id || `gal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title: item.title,
        category: item.category || "labs",
        date: item.date || "",
        location: item.location || "",
        image_url: item.imageUrl || item.image_url,
        description: item.description || "",
      }));
    } else {
      // Single item upsert
      const newItem = {
        id: body.id || `gal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title: body.title,
        category: body.category || "labs",
        date: body.date || "",
        location: body.location || "",
        image_url: body.imageUrl || body.image_url,
        description: body.description || "",
      };

      const existingIndex = currentItems.findIndex((it) => it.id === newItem.id);
      if (existingIndex >= 0) {
        currentItems[existingIndex] = newItem;
      } else {
        currentItems.unshift(newItem);
      }
    }

    await saveGalleryItems(currentItems);
    return NextResponse.json({ success: true, count: currentItems.length, data: currentItems });
  } catch (error: any) {
    console.error("Gallery save error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save to gallery" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    const currentItems = await getGalleryItems();
    const updated = currentItems.filter((item) => item.id !== id);
    await saveGalleryItems(updated);

    return NextResponse.json({ success: true, count: updated.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
