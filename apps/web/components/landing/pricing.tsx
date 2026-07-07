"use client";

import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "/month",
    features: [
      "Up to 3 forms",
      "100 responses/month",
      "Basic analytics",
      "Email notifications",
      "Kanso branding",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing teams",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited forms",
      "10,000 responses/month",
      "Advanced analytics",
      "Custom branding",
      "File uploads",
      "Priority support",
      "Integrations",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    period: "",
    features: [
      "Unlimited everything",
      "Custom integrations",
      "SSO & SAML",
      "Dedicated support",
      "SLA guarantee",
      "Custom contracts",
      "On-premise option",
    ],
    highlighted: false,
  },
];

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export function Pricing() {
  const tiers = [
    {
      name: "Free",
      tagline: "Perfect for getting started",
      price: "$0",
      period: "/month",
      features: [
        "Up to 3 forms",
        "100 responses/month",
        "Basic analytics",
        "Email notifications",
        "Kanso branding",
      ],
      cta: "Get Started Free",
    },
    {
      name: "Pro",
      tagline: "For growing teams",
      price: "$29",
      period: "/month",
      featured: true,
      features: [
        "Unlimited forms",
        "10,000 responses/month",
        "Advanced analytics",
        "Custom branding",
        "File uploads",
        "Priority support",
        "Integrations",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      tagline: "For large organizations",
      price: "Custom",
      period: "",
      features: [
        "Unlimited everything",
        "Custom integrations",
        "SSO & SAML",
        "Dedicated support",
        "SLA guarantee",
        "Custom contracts",
        "On-premise option",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="bg-secondary/40 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Pricing
          </p>
          <h2
            className="mt-4 text-4xl tracking-[-0.02em] text-foreground md:text-5xl"
            style={serif}
          >
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                t.featured
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_30px_80px_-40px_rgba(40,60,40,0.45)]"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-background">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl" style={serif}>
                {t.name}
              </h3>
              <p
                className={`mt-1 text-sm ${t.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}
              >
                {t.tagline}
              </p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl tracking-tight" style={serif}>
                  {t.price}
                </span>
                {t.period && (
                  <span
                    className={`pb-1.5 text-sm ${t.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}
                  >
                    {t.period}
                  </span>
                )}
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-primary-foreground" : "text-primary"}`}
                    />
                    <span
                      className={t.featured ? "text-primary-foreground/90" : "text-foreground/90"}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="/sign-up"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  t.featured
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
