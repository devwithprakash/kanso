"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Download, Inbox, Loader2, AlertCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetFormResponse } from "@/hooks/response/use-response";
import { useGetForm } from "@/hooks/form/use-forms";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ResponseField } from "@/types/form";

export default function FormResponsesPage() {
  const params = useParams();
  const formId = params.formId as string;
  const [selectedResponse, setSelectedResponse] = useState<(typeof responses)[number] | null>(null);

  const { data, error, isLoading } = useGetFormResponse(formId);
  const { form } = useGetForm(formId);

  const formatAnswer = (field: ResponseField, value: string | null) => {
    if (!value) return null;

    if (field.type === "checkbox") {
      try {
        const values = JSON.parse(value) as string[];
        return values.join(", ");
      } catch {
        return value;
      }
    }

    return value;
  };

  if (isLoading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-3 text-muted-foreground animate-in fade-in">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
        <p className="text-sm font-medium">Retrieving form submission records...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 border border-destructive/20 bg-destructive/5 rounded-xl text-destructive text-sm flex items-center gap-3 max-w-xl mx-auto mt-12 animate-in slide-in-from-top-4">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <div>
          <h5 className="font-semibold">Failed to load responses</h5>
          <p className="text-xs opacity-90 mt-0.5">
            The requested form layout might not exist or you lack sufficient access permissions.
          </p>
        </div>
      </div>
    );
  }

  const { fields, responses } = data;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 max-w-full min-w-0 overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            href="/dashboard/forms"
            className="group flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Forms
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground tracking-tight">
            {form?.title}{" "}
            <span className="text-muted-foreground font-sans text-lg font-normal">
              ({responses.length})
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Review live raw submissions collected from your published schema.
          </p>
        </div>

        {responses.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="bg-card border-border/50 self-start sm:self-auto"
          >
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        )}
      </div>

      {responses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-border/60 rounded-2xl bg-card/30 min-h-[400px]">
          <div className="h-12 w-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground mb-4">
            <Inbox className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">No submissions yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            Once users start filling out this form layout interface shell, their answers will map
            safely right here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-full min-w-0">
          {responses.map((resp) => {
            const preview = fields
              .map((field) => resp.answers.find((ans) => ans.fieldId === field.id))
              .filter((ans) => ans?.value)
              .slice(0, 2);

            return (
              <button
                key={resp.id}
                onClick={() => setSelectedResponse(resp)}
                className="text-left rounded-xl border border-border/50 bg-card p-4 shadow-sm hover:border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(resp.submittedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 group-hover:text-foreground transition-colors">
                    View →
                  </span>
                </div>

                <div className="space-y-2">
                  {preview.length > 0 ? (
                    preview.map((ans, i) => {
                      const field = fields.find((f) => f.id === ans!.fieldId);
                      return (
                        <div key={i} className="min-w-0">
                          <p className="text-[11px] text-muted-foreground/70 truncate">
                            {field?.label}
                          </p>
                          <p className="text-sm text-foreground truncate">{ans!.value}</p>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-muted-foreground/30 italic text-xs">Empty</span>
                  )}
                </div>

                {fields.length > preview.length && (
                  <p className="text-[11px] text-muted-foreground/60 mt-3">
                    +{fields.length - preview.length} more field
                    {fields.length - preview.length > 1 ? "s" : ""}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      )}

      <Dialog open={!!selectedResponse} onOpenChange={(open) => !open && setSelectedResponse(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Submission details</DialogTitle>
            <DialogDescription className="flex items-center gap-1.5 text-xs">
              <Calendar className="h-3 w-3" />
              {selectedResponse &&
                new Date(selectedResponse.submittedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {fields.map((field) => {
              const matchingAnswer = selectedResponse?.answers.find(
                (ans) => ans.fieldId === field.id,
              );
              return (
                <div key={field.id} className="border-b border-border/40 pb-3 last:border-0">
                  <p className="text-xs font-medium text-muted-foreground mb-1">{field.label}</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                    {matchingAnswer?.value ? (
                      formatAnswer(field, matchingAnswer.value)
                    ) : (
                      <span className="text-muted-foreground/30 italic">Empty</span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
