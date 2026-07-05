"use client";

import * as React from "react";
import { Nav } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero-section";
import { Features } from "@/components/landing/features-grid";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background font-[Inter,system-ui,sans-serif] text-foreground antialiased">
      <div className="pt-4">
        <Nav />
      </div>
      <main className="pt-20">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
