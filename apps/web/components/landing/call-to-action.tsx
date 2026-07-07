"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export function CallToAction() {
  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center md:px-16 md:py-20"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decoration */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
            {/* Grid dot pattern */}
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.04]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="cta-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-dots)" className="text-primary-foreground" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Icon badge */}
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary-foreground/15 text-primary-foreground backdrop-blur-sm">
              <Zap className="h-6 w-6" />
            </div>

            <h2
              className="text-balance text-4xl text-primary-foreground md:text-5xl lg:text-6xl"
              style={serif}
            >
              Your next great form
              <br className="hidden sm:block" />
              starts right here.
            </h2>

            <p className="mx-auto mt-5 max-w-md text-pretty text-base text-primary-foreground/75 md:text-lg">
              Join thousands of teams already using Kanso to collect smarter data,
              understand their users, and grow faster.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/sign-up"
                className="group inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary shadow-xl transition-all duration-300 hover:bg-primary-foreground/90 hover:shadow-2xl hover:gap-3"
              >
                Create your first form
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="/sign-in"
                className="inline-flex items-center rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:border-primary-foreground/50 hover:bg-primary-foreground/10"
              >
                Sign in
              </a>
            </div>

            <p className="mt-4 text-xs text-primary-foreground/50">
              Free plan · No credit card needed · Set up in under 2 minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
