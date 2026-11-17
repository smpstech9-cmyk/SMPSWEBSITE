import { NextRequest, NextResponse } from "next/server";
import {
  getOperationsRecords,
  addOperationsRecord,
  updateOperationsRecord,
  deleteOperationsRecord,
  OperationsRecord,
} from "@/lib/server-storage";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";

    const records = await getOperationsRecords({ type, status, search });
    return NextResponse.json({
      success: true,
      count: records.length,
      records,
    });
  } catch (err: any) {
    console.error("Error reading operations records:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch records" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.type || !body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: "Required fields missing (type, name, email)" },
        { status: 400 }
      );
    }

    const titleMap: Record<string, string> = {
      contact: `Inquiry: ${body.subject || "General Consultation"}`,
      career: `Application: ${body.roleTitle || "DeepTech Engineer"}`,
      event: `Event Pass: ${body.eventTitle || "Conference Registration"}`,
      internship: `Internship: ${body.trackName || "VTU R&D Track"}`,
      hardware_inquiry: `Hardware Quote: ${body.productName || "Hardware Unit"}`,
    };

    const newRecord = await addOperationsRecord({
      type: body.type,
      title: body.title || titleMap[body.type] || "Direct Inbound Lead",
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      data: body.data || body,
      status: "new",
      notes: body.notes || "",
    });

    return NextResponse.json({ success: true, record: newRecord }, { status: 201 });
  } catch (err: any) {
    console.error("Error saving operations record:", err);
    return NextResponse.json({ success: false, error: "Failed to save record" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing record id" }, { status: 400 });
    }

    const updated = await updateOperationsRecord(id, { status, notes });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, record: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing record id" }, { status: 400 });
    }

    await deleteOperationsRecord(id);
    return NextResponse.json({ success: true, message: "Record removed" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

