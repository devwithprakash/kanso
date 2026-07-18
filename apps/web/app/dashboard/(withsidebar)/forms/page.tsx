"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Eye,
  Users,
  Trash2,
  ExternalLink,
  BarChart3,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDeleteForm, useGetAllForms } from "@/hooks/form/use-forms";
import { useRouter } from "next/navigation";
import { FormCardSkeleton } from "@/components/dashboard/form-card-skeleton";
import { NoForms } from "@/components/dashboard/no-forms";

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const router = useRouter();

  const { data: forms, isLoading } = useGetAllForms();
  const { deleteMutation } = useDeleteForm();

  const filteredForms =
    forms?.filter((form) => {
      const matchesSearch = form.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || form.visibility === statusFilter;

      return matchesSearch && matchesStatus;
    }) ?? [];

  const handleDeleteForm = async (formId: string) => {
    try {
      await deleteMutation.mutateAsync({ formId });
      router.push("/dashboard/forms");
    } catch (error) {
      console.error("Failed to delete form", error);
    }
  };

  const handleCopyLink = async (slug: string) => {
    const url = `${FRONTEND_URL}/forms/${slug}`;

    await navigator.clipboard.writeText(url);
  };

  const getVisibilityStyles = (visibility: string) => {
    switch (visibility) {
      case "public":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
      case "unlisted":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
      case "private":
        return "bg-rose-500/10 text-rose-700 dark:text-rose-400";
      default:
        return "bg-slate-500/10 text-slate-700 dark:text-slate-400";
    }
  };

  const hashForms = forms && forms.length > 0;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground">Forms</h1>
          <p className="text-muted-foreground mt-1">Manage and organize all your forms.</p>
        </div>

        <Link href={"/dashboard/forms/new"}>
          <Button className="rounded-lg cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" />
            Create Form
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/50"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] bg-card border-border/50">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="unlisted">Unlisted</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <FormCardSkeleton key={index} />)
        ) : hashForms ? (
          filteredForms.map((form, index) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-card rounded-2xl border border-border p-5 flex flex-col h-full shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              {/* Top: Visibility Badge & Menu */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[10px] px-2.5 py-0.5 font-bold uppercase tracking-wider rounded-full ${getVisibilityStyles(
                    form.visibility,
                  )}`}
                >
                  {form.visibility}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/forms/${form.id}/edit`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <FileText className="h-4 w-4 opacity-70" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/forms/${form.id}/preview`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Eye className="h-4 w-4 opacity-70" /> Preview
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/forms/${form.id}/analytics`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <BarChart3 className="h-4 w-4 opacity-70" /> Analytics
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/forms/${form.id}/responses`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <FileText className="h-4 w-4 opacity-70" /> Responses
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleCopyLink(form.slug)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4 opacity-70" /> Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteForm(form.id)}
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Middle: Title & Description */}
              <div className="flex-1 mb-6">
                <Link
                  href={`/dashboard/forms/${form.id}/builder`}
                  className="block mb-2 group/title"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover/title:text-primary transition-colors line-clamp-1 tracking-tight">
                    {form.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {form.description || "No description provided."}
                </p>
              </div>

              {/* Bottom: Date & Responses */}
              <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                <span className="text-xs text-muted-foreground">
                  {new Date(form.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

                <div className="flex items-center gap-1.5 text-sm">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-semibold text-foreground">{form.responseCount}</span>
                  <span className="text-muted-foreground text-[10px] uppercase font-bold">
                    Responses
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full">
            <NoForms />
          </div>
        )}
      </div>
    </div>
  );
}
