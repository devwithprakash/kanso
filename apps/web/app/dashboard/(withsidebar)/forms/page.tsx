"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDeleteForm, useGetAllForms } from "@/hooks/form/use-forms";
import { FormCardSkeleton } from "@/components/dashboard/form-card-skeleton";
import { NoForms } from "@/components/dashboard/no-forms";
import FormCard from "@/components/dashboard/form-card.";
import { toast } from "sonner";

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

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
      toast.success("Form deleted successfully");
    } catch (error) {
      toast.error("Failed to delete form");
    }
  };

  const handleCopyLink = async (slug: string) => {
    const url = `${FRONTEND_URL}/forms/${slug}`;

    await navigator.clipboard.writeText(url);
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
          filteredForms
            .slice()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((form, index) => (
              <FormCard
                form={form}
                index={index}
                handleCopyLink={handleCopyLink}
                handleDeleteForm={handleDeleteForm}
                key={form.id}
              />
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
