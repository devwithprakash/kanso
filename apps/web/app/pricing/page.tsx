import { Nav } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PricingContent } from "@/components/pricing/pricing-content";

export const metadata = {
  title: "Pricing — Kanso",
  description: "Simple, transparent pricing. Start free and scale as you grow.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <PricingContent />
      <Footer />
    </main>
  );
}
