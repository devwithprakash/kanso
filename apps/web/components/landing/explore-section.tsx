"use client";

import { useGetAllPublicForms } from "@/hooks/form/use-forms";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ExploreFormCard from "./explore-form-card";
import { serif } from "@/constants/form";
import { ExploreFormCardSkeleton } from "./explore-form-skeleton";

export function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory] = useState("All");

  const { data: publicForms, isLoading } = useGetAllPublicForms();

  const filteredForms = (publicForms ?? []).filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (form.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesCategory = selectedCategory === "All";

    return matchesSearch && matchesCategory;
  });
  return (
    <section id="explore" className="relative overflow-hidden bg-background px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[600px] rounded-full bg-secondary/40 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            className="max-w-2xl text-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mt-3 text-4xl tracking-tight text-foreground md:text-5xl" style={serif}>
              Explore shared creations
            </h2>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground md:text-base">
              Discover forms designed and published by members.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>Explore all forms</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => <ExploreFormCardSkeleton key={index} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredForms.slice(0, 6).map((form) => (
                <ExploreFormCard key={form.id} form={form} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
