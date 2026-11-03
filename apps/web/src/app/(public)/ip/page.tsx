import React from "react";
import { IpDynamicView } from "@/components/ip/ip-dynamic-view";

export const metadata = {
  title: "Intellectual Property & Patent Portfolio | SMPS Tech Lab",
  description:
    "Authoritative Strategic IP Asset Intelligence Registry (SIPAIR) for SMPS Tech Lab. Explore 12 filed design patents, controller silicon topologies, and clean power architectures.",
};

export default function IpPage() {
  return <IpDynamicView />;
}

