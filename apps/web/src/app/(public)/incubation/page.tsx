import React from "react";
import { IncubationDynamicView } from "@/components/incubation/incubation-dynamic-view";

export const metadata = {
  title: "Hardware Incubation & Prototyping Laboratory | SMPS Tech Lab",
  description:
    "Zero-capex hardware testbenches, prototyping facilities, and regulatory de-risking at the VTU-VRIF-TCOE facility in Bengaluru.",
};

export default function IncubationPage() {
  return <IncubationDynamicView />;
}
