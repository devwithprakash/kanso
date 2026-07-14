"use client";

import { useGetAllPublicForms } from "@/hooks/form/use-forms";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, ExternalLink, Calendar1Icon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

const serif = { fontFamily: "'Fraunces', Georgia, serif" } as const;

interface ExploreForm {
  id: string;
  title: string;
  titleColor?: string;
  description: string;
  badgeTheme: "teal" | "purple" | "green";
  questions: string;
  responses: string;
  author: string;
  date: string;
}

interface PublicFormType {
  title: string;
  id: string;
  visibility: "public" | "unlisted" | "private";
  description: string | null;
  createdAt: string;
  slug: string;
  updatedAt: string | null;
  theme: "clean-zen" | "cyber-sunset" | "cherry-blossom" | "ocean-mist" | "lavender-dream";
  createdBy: string;
}

function FormPreviewCard({ form }: { form: PublicFormType }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group flex h-full flex-col rounded-2xl border border-border/50 bg-card p-5 transition-all hover:border-primary/50"
    >
      <div className="flex-1">
        <div className="mb-3 flex justify-between">
          {form.visibility === "public" && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
              Live
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-1 text-lg font-semibold font-serif">{form.title}</h3>

        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {form.description || "No description provided."}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar1Icon className="h-3 w-3" />
          {new Date(form.createdAt).toLocaleDateString()}
        </div>

        <Button
          size="sm"
          variant="outline"
          className="h-8 rounded-xl text-xs"
          onClick={() => window.open(`/forms/${form.slug}`, "_blank")}
        >
          Fill Form
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
}

export function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory] = useState("All");

  const { data: publicForms } = useGetAllPublicForms();

  const filteredForms = (publicForms ?? []).filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (form.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesCategory = selectedCategory === "All";

    return matchesSearch && matchesCategory;
  });
  return (
    <section id="explore" className="relative overflow-hidden bg-background px-4 py-24 md:py-32">
      {/* Background gradients for the section */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[600px] rounded-full bg-secondary/40 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
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

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredForms.slice(0, 6).map((form) => (
              <FormPreviewCard key={form.id} form={form} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
