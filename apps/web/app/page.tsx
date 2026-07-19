import type { Metadata } from "next";
import { Nav } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero-section";
import { Features } from "@/components/landing/features-grid";
import { ExploreSection } from "@/components/landing/explore-section";
import { CallToAction } from "@/components/landing/call-to-action";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Kanso",
  description:
    "Create stunning forms with drag-and-drop simplicity. Collect responses, analyze data, and share with anyone. Kanso makes form building effortless.",
  keywords: ["form builder", "drag and drop", "forms", "survey", "analytics"],
  openGraph: {
    title: "Kanso — Build Beautiful Forms in Minutes",
    description:
      "Create stunning forms with drag-and-drop simplicity. Collect responses, analyze data, and share with anyone.",
    type: "website",
  },
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background font-[Inter,system-ui,sans-serif] text-foreground antialiased">
      <div className="pt-4">
        <Nav />
      </div>
      <main>
        <Hero />

        <Features />

        <ExploreSection />

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
