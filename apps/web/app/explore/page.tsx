"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Nav } from "@/components/landing/navbar";
import { useGetAllPublicForms } from "@/hooks/form/use-forms";
import ExploreFormCard from "@/components/landing/explore-form-card";
import { ExploreFormCardSkeleton } from "@/components/landing/explore-form-skeleton";
import { NoForms } from "@/components/dashboard/no-forms";

export default function ExplorePage() {
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

  const hashForms = filteredForms && filteredForms.length > 0;

  return (
    <>
      <Nav />
      <div className="min-h-screen not-[]: bg-background pt-24 pb-16">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 space-y-4">
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
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => <ExploreFormCardSkeleton key={index} />)
            ) : hashForms ? (
              <AnimatePresence mode="popLayout">
                {filteredForms
                  .slice()
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((form) => (
                    <ExploreFormCard key={form.id} form={form} />
                  ))}
              </AnimatePresence>
            ) : (
              <div className="col-span-full">
                <NoForms />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
