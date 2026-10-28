import React from "react";
import { IncubationDynamicView } from "@/components/incubation/incubation-dynamic-view";

export const metadata = {
  title: "Entrepreneurship & Hardware Incubation | SMPS Tech Lab",
  description:
    "Accelerating deep-tech hardware startups, technology transfer, and student entrepreneurship at the VTU-VRIF-TCOE incubation facility in Bengaluru.",
};

export default function IncubationPage() {
  return <IncubationDynamicView />;
}
