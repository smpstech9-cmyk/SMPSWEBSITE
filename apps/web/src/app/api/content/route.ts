import { NextResponse, NextRequest } from "next/server";

const BACKEND_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "https://smpswebsite.onrender.com";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/content`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({}, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching content from backend API:", err);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${BACKEND_URL}/api/v1/content`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to save content" }, { status: res.status });
    }
    const saved = await res.json();
    return NextResponse.json(saved);
  } catch (err) {
    console.error("Error saving content to backend API:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
