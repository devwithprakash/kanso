"use client";

import * as React from "react";
import { Nav } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero-section";
import { Features } from "@/components/landing/features-grid";
import { ExploreSection } from "@/components/landing/explore-section";
import { Pricing } from "@/components/landing/pricing";
import { CallToAction } from "@/components/landing/call-to-action";
import { Footer } from "@/components/landing/footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background font-[Inter,system-ui,sans-serif] text-foreground antialiased">
      <div className="pt-4">
        <Nav />
      </div>
      <main>
        {/* 1. Hero — no showcase, clean copy + stats */}
        <Hero />

        {/* 2. Features grid — unchanged */}
        <Features />

        {/* 3. Explore — 4 live form template cards */}
        <ExploreSection />

        {/* 4. Pricing — unchanged */}
        <Pricing />

        {/* 5. CTA banner — above footer */}
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
