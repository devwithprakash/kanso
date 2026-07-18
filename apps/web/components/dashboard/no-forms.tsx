import { FilePlus, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NoFormsProps {
  onCreate?: () => void;
}

export function NoForms({ onCreate }: NoFormsProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 border-2 border-dashed border-border rounded-2xl bg-secondary/20 text-center animate-in fade-in duration-500">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <FilePlus className="h-8 w-8 text-primary" />
      </div>

      <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
        No forms created yet
      </h3>
      <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
        Get started by creating your first form to collect responses.
      </p>

      <Link href={"/dashboard/forms/new"}>
        <Button
          className="gap-2 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          onClick={() => {}}
        >
          <Plus className="h-4 w-4" />
          Create New Form
        </Button>
      </Link>
    </div>
  );
}
