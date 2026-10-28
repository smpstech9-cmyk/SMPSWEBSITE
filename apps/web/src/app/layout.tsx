import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smps.in";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SMPS Tech Lab | Power Electronics, VTU Internships & Energy Storage",
    template: "%s | SMPS Tech Lab",
  },
  description:
    "SMPS Electric Control Pvt Ltd corporate R&D facility inside VTU-VRIF-TCOE, Bengaluru. Manufacturer of PURNA BESS, SUBAL PCS, SaralaChip, and provider of VTU engineering internships.",
  keywords: [
    "Power Electronics",
    "VTU Internships",
    "Bengaluru Engineering Internships",
    "PURNA BESS",
    "Energy Storage Systems",
    "SaralaChip CCU",
    "EV Fast Chargers",
    "Battery Management Systems BMS",
    "VTU-VRIF Center of Excellence",
  ],
  authors: [{ name: "SMPS Electric Control Pvt Ltd" }],
  creator: "SMPS Electric Control Pvt Ltd",
  publisher: "SMPS Electric Control Pvt Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "SMPS Tech Lab | Power Electronics, VTU Internships & Energy Storage",
    description:
      "Corporate R&D facility inside VTU-VRIF-TCOE, Bengaluru. Manufacturer of PURNA BESS, SUBAL PCS, SaralaChip, and provider of hands-on VTU engineering internships.",
    siteName: "SMPS Tech Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMPS Tech Lab | Power Electronics & Energy Storage",
    description:
      "Enterprise R&D facility inside VTU-VRIF-TCOE Bengaluru. Manufacturer of PURNA BESS, SaralaChip, and provider of certified VTU engineering internships.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-[#1d1d1f] antialiased selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
