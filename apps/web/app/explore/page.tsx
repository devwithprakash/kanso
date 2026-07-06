"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  ArrowUpRight,
  Calendar as CalendarIcon,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/landing/navbar";
import { useGetAllPublicForms } from "@/hooks/form/use-forms";

export default function ExplorePage() {
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
    <>
      <Nav />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                Community Hub
              </div>

              <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                Explore Public Forms
              </h1>
              <p className="text-muted-foreground font-serif">
                Explore, submit, and interact with forms created by others.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 bg-card rounded-xl pl-10 pr-4 border border-border/60 text-sm focus:border-primary/60 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredForms.map((form) => (
                <motion.div
                  key={form.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group flex flex-col bg-card rounded-2xl border border-border/50 p-5 hover:border-primary/50 transition-all h-full"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      {form.visibility === "public" && (
                        <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                          Live
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg font-semibold mb-2 truncate">{form.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-3 mb-4">
                      {form.description || "No description provided."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/30 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(form.createdAt).toLocaleDateString()}
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-x cursor-pointer text-xs h-8"
                      onClick={() => window.open(`/forms/${form.slug}`, "_blank")}
                    >
                      <ExternalLink className="ml-1 h-3 w-3" /> Fill Form
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
