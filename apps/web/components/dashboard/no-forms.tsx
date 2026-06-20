import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoFormsProps {
  onCreate?: () => void;
}

export function NoForms({ onCreate }: NoFormsProps) {
  return (
    <div className="rounded-xl border border-dashed border-border/60 bg-card">
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-primary" />
        </div>

        <h3 className="font-serif text-xl font-semibold tracking-tight">No forms yet</h3>

        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Create your first form to start collecting responses, feedback, and registrations.
        </p>

        <Button onClick={onCreate} className="mt-6">
          <Plus className="h-4 w-4 mr-2" />
          Create Form
        </Button>
      </div>
    </div>
  );
}
