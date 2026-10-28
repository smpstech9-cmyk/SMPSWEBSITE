import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Building2, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f7] text-[#6e6e73] pt-20 pb-12 border-t border-[#e5e5ea] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#e5e5ea]">
          {/* Company Bio */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block group" aria-label="SMPS Electric Control Home">
              <Image
                src="/logos/SMPS.png"
                alt="SMPS Electric - Think Beyond Smart Powertronics"
                width={160}
                height={58}
                unoptimized
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed max-w-sm font-normal">
              SMPS Electric Control Pvt Ltd corporate R&D and hardware incubation center operating inside the VTU-VRIF-TCOE Facility, Bengaluru. Pioneering high-power electronics, energy storage, and deep-tech ventures.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#6e6e73]">
              <Building2 className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>VTU Telecom Center of Excellence Campus, Nagarbhavi</span>
            </div>

            <p className="text-xs text-[#86868b] pt-2 font-mono">
              © {new Date().getFullYear()} SMPS Electric Control Pvt Ltd. All rights reserved.
            </p>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1d1d1f] mb-5">
              Platform & R&D
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-[#0071e3] transition">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/rnd" className="hover:text-[#0071e3] transition flex items-center gap-1.5">
                  R&D & Systems
                  <span className="text-[9px] font-bold text-[#0071e3] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">Core</span>
                </Link>
              </li>
              <li>
                <Link href="/entrepreneur" className="hover:text-[#059669] transition flex items-center gap-1.5">
                  Entrepreneurship & Ventures
                  <span className="text-[9px] font-bold text-[#059669] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Founders</span>
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-[#0071e3] transition flex items-center gap-1.5">
                  Corporate Partnerships
                  <span className="text-[9px] font-bold text-[#0071e3] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">ODM</span>
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-[#0071e3] transition">
                  Hardware Catalog
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-[#0071e3] transition">
                  VTU Certified Internships
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0071e3] transition">
                  About & Facility
                </Link>
              </li>
              <li>
                <Link href="/excom" className="hover:text-[#0071e3] transition flex items-center gap-1.5">
                  Executive Committee
                  <span className="text-[9px] font-bold text-[#0071e3] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">ExCom</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#0071e3] transition">
                  Gallery Showcase
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#0071e3] transition">
                  Events & Symposia
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#0071e3] transition flex items-center gap-1.5">
                  Careers & Hiring
                  <span className="text-[9px] font-bold text-[#059669] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Hiring</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hardware Systems */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1d1d1f] mb-5">
              Flagship Systems
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/store/purna-bess-commercial" className="hover:text-[#0071e3] transition">
                  PURNA BESS™ Energy Storage
                </Link>
              </li>
              <li>
                <Link href="/store/quantum-bess-container" className="hover:text-[#0071e3] transition">
                  Quantum BESS™ (Upcoming)
                </Link>
              </li>
              <li>
                <Link href="/store/smartlink-iot-gateway" className="hover:text-[#0071e3] transition">
                  SmartLink™ Industrial Gateway
                </Link>
              </li>
              <li>
                <Link href="/store/swarnali-60kw-dc-fast-charger" className="hover:text-[#0071e3] transition">
                  SWARNALI™ 60kW DC Fast Charger
                </Link>
              </li>
              <li>
                <Link href="/store/saralachip-dev-board" className="hover:text-[#0071e3] transition">
                  SaralaChip™ CCU Microcontroller
                </Link>
              </li>
              <li>
                <Link href="/store/iot-development-kit-esp32" className="hover:text-[#0071e3] transition">
                  SMPS IoT Dev Kit
                </Link>
              </li>
              <li>
                <Link href="/rnd" className="hover:text-[#0071e3] transition">
                  SUBAL PCS™ Power Conversion
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Facility */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1d1d1f] mb-5">
              R&D Center Contact
            </h4>
            <div className="space-y-3 text-xs text-[#6e6e73]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0071e3] flex-shrink-0 mt-0.5" />
                <span>
                  VTU-VRIF-TCOE Building, Visvesvaraya Technological University Campus, Nagarbhavi, Bengaluru, Karnataka 560072
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0071e3] flex-shrink-0" />
                <span>+91 98450 12345 / 080-23456789</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0071e3] flex-shrink-0" />
                <span className="font-mono text-[#1d1d1f]">contact@smpstechlab.com</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:text-[#0056b3] transition"
              >
                Inquire or Schedule Lab Visit
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868b]">
          <p>
            VTU Recognized Corporate Center for Advanced Hardware Research & Incubation.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/ops" className="hover:text-[#0071e3] text-[#0071e3] font-semibold transition">
              Operations Portal
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#1d1d1f] transition">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#1d1d1f] transition">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-[#1d1d1f] transition">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
