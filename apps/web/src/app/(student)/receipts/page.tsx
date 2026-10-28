"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Printer,
  Download,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowRight,
  Package,
  Layers,
  QrCode,
  Sparkles,
} from "lucide-react";

function ReceiptContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [invoice, setInvoice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(orderId));

  useEffect(() => {
    if (orderId) {
      setIsLoading(true);
      fetch(`/api/v1/payments/invoice/${orderId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.invoice_number) setInvoice(data);
          else setInvoice(null);
        })
        .catch(() => setInvoice(null))
        .finally(() => setIsLoading(false));
    } else {
      setInvoice(null);
      setIsLoading(false);
    }
  }, [orderId]);

  const formatINR = (val: string | number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(val));

  const handleDownloadPDF = () => {
    if (!invoice) return;
    const originalTitle = document.title;
    document.title = `${invoice.invoice_number}_Tax_Invoice`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="w-full p-16 text-center text-xs text-[#86868b]">
        Fetching invoice details from secure billing records...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="w-full p-6 sm:p-10 max-w-2xl mx-auto space-y-8">
        <div className="apple-card-elevated rounded-[28px] border border-[#e5e5ea] bg-white p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#0071e3] flex items-center justify-center mx-auto shadow-sm">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#1d1d1f]">No Invoice Selected</h2>
          <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed max-w-md mx-auto">
            Please select an order from your hardware orders dashboard to generate and print its official Indian GST tax invoice.
          </p>
          <div className="pt-2">
            <Link
              href="/orders"
              className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-2"
            >
              <span>View Hardware Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-10 max-w-5xl mx-auto space-y-6 print:p-0">
      {/* Top Control Bar (Hidden on print) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 print:hidden">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#10b981] border border-emerald-200 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-[#1d1d1f]">Payment Confirmed & Verified</h1>
            <span className="text-xs text-[#6e6e73]">Official GST Tax Invoice issued under Indian taxation laws.</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/orders"
            className="px-5 py-2.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-[#e5e5ea] text-[#1d1d1f] text-xs font-semibold rounded-full transition shadow-xs"
          >
            My Orders
          </Link>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full transition shadow-sm active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Invoice</span>
          </button>
        </div>
      </div>

      {/* Printable Tax Invoice Paper */}
      <article className="bg-white border border-[#e5e5ea] shadow-sm rounded-[28px] p-6 sm:p-10 print:border-none print:shadow-none print:p-0">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#0071e3] flex items-center justify-center text-white font-extrabold text-sm">
                S
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                SMPS ELECTRIC CONTROL PVT LTD
              </span>
            </div>
            <p className="text-xs text-[#0071e3] font-semibold">{invoice.supplier.facility}</p>
            <p className="text-[11px] text-slate-500 max-w-sm mt-1 leading-relaxed">
              {invoice.supplier.address}
            </p>
            <div className="mt-2 text-[11px] text-slate-700 font-mono space-y-0.5">
              <div>GSTIN: <strong>{invoice.supplier.gstin}</strong></div>
              <div>PAN: <strong>{invoice.supplier.pan}</strong></div>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-md mb-2">
              Tax Invoice
            </span>
            <div className="text-xs font-mono space-y-1 text-slate-800">
              <div>Invoice No: <strong>{invoice.invoice_number}</strong></div>
              <div>Date: <strong>{invoice.invoice_date}</strong></div>
              <div>Order Ref: <strong>{invoice.order_number}</strong></div>
              <div>Place of Supply: <strong>{invoice.place_of_supply}</strong></div>
            </div>
          </div>
        </div>

        {/* Billed To / Shipped To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
          <div>
            <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
              Billed To (Customer):
            </span>
            <h2 className="text-sm font-bold text-slate-900">{invoice.buyer.name}</h2>
            <p className="text-slate-600 mt-0.5">{invoice.buyer.street}</p>
            <p className="text-slate-600">{invoice.buyer.city}, {invoice.buyer.state} - {invoice.buyer.postal_code}</p>
            <p className="text-slate-600">Phone: {invoice.buyer.phone}</p>
            <p className="text-slate-700 font-mono mt-1">GSTIN: {invoice.buyer.gstin}</p>
          </div>

          <div className="sm:text-right">
            <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
              Payment Status:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PAID via Razorpay
            </span>
            <p className="text-[11px] text-slate-500 mt-2">
              Eligible for Input Tax Credit (ITC) under Section 16 of CGST Act.
            </p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Item Description</th>
                <th className="py-2.5 px-3">HSN Code</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Unit Rate</th>
                <th className="py-2.5 px-3 text-right">Taxable Val</th>
                <th className="py-2.5 px-3 text-right">GST %</th>
                <th className="py-2.5 px-3 text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.items.map((it: any, idx: number) => (
                <tr key={idx}>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{it.description}</span>
                    <span className="text-[10px] font-mono text-slate-500">{it.sku_code}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-700">{it.hsn_code}</td>
                  <td className="py-3 px-3 text-center font-bold text-slate-900">{it.quantity}</td>
                  <td className="py-3 px-3 text-right font-mono">{formatINR(it.unit_price_inr)}</td>
                  <td className="py-3 px-3 text-right font-mono">{formatINR(it.taxable_value_inr)}</td>
                  <td className="py-3 px-3 text-right">{it.tax_rate_percent}%</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatINR(it.total_inr)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Breakdown & Grand Total */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#fbfbfd] border border-[#e5e5ea]">
              <div className="w-12 h-12 bg-white rounded-xl border border-[#e5e5ea] flex items-center justify-center shrink-0">
                <QrCode className="w-8 h-8 text-[#1d1d1f]" />
              </div>
              <div className="text-[10px] text-[#6e6e73]">
                <span className="font-bold text-[#1d1d1f] block">GST e-Invoice QR Code</span>
                <span className="font-mono block truncate max-w-[200px] text-[9px] text-[#86868b]">
                  IRN: {invoice.irn_hash}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p><strong>Terms & Conditions:</strong></p>
              <p>1. Goods backed by 12 months SMPS manufacturer warranty.</p>
              <p>2. Subject to Bengaluru / Karnataka jurisdiction.</p>
              <p>3. This is an authentic digital tax invoice requiring no physical signature.</p>
            </div>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Amount:</span>
              <span className="font-mono font-bold text-slate-900">
                {formatINR(invoice.summary.subtotal_taxable_inr)}
              </span>
            </div>

            {invoice.is_intra_state ? (
              <>
                <div className="flex justify-between text-slate-600">
                  <span>CGST (Central Tax 9%):</span>
                  <span className="font-mono text-slate-800">{formatINR(invoice.summary.cgst_inr)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SGST (State Tax 9%):</span>
                  <span className="font-mono text-slate-800">{formatINR(invoice.summary.sgst_inr)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-slate-600">
                <span>IGST (Integrated Tax 18%):</span>
                <span className="font-mono text-slate-800">{formatINR(invoice.summary.igst_inr)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Freight / Shipping:</span>
              <span className="font-mono text-slate-800">
                {Number(invoice.summary.shipping_fee_inr) === 0 ? "FREE" : formatINR(invoice.summary.shipping_fee_inr)}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-300 flex justify-between items-baseline">
              <span className="font-black text-sm uppercase text-slate-900">Total Invoice:</span>
              <span className="font-mono font-black text-xl text-[#0071e3]">
                {formatINR(invoice.summary.total_invoice_amount_inr)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function ReceiptsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
          <div className="w-8 h-8 border-4 border-[#0071e3] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ReceiptContent />
    </Suspense>
  );
}
