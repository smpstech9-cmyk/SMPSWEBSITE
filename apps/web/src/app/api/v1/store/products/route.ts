import { NextRequest, NextResponse } from "next/server";
import { getStoreProducts, saveStoreProducts } from "@/lib/server-storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getStoreProducts();
    return NextResponse.json(products);
  } catch (err: any) {
    console.error("Error reading store products:", err);
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of products" }, { status: 400 });
    }

    await saveStoreProducts(body);
    return NextResponse.json({ success: true, count: body.length, products: body });
  } catch (err: any) {
    console.error("Error saving store products:", err);
    return NextResponse.json({ error: "Failed to save products" }, { status: 500 });
  }
}

