import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon, ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

interface ExploreForm {
  id: string;
  title: string;
  visibility: "public" | "unlisted" | "private";
  description: string | null;
  createdAt: string;
  totalResponses: number;
  slug: string;
}

type ExploreFormCardProps = {
  form: ExploreForm;
};

export default function ExploreFormCard({ form }: ExploreFormCardProps) {
  return (
    <motion.div
      key={form.id}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group flex flex-col bg-card rounded-2xl border border-border p-5 transition-all duration-300 hover:border-primary/30 shadow-sm hover:shadow-md h-full"
    >
      <div className="flex-1">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="font-serif text-lg font-medium text-foreground truncate leading-tight">
            {form.title}
          </h3>
          {form.visibility === "public" && (
            <span className="shrink-0 text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Public
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
          {form.description || "No description provided."}
        </p>
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-3 w-3" />
            {new Date(form.createdAt).toLocaleDateString()}
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5">
            <MessageSquare className="h-3 w-3" />
            {form.totalResponses ?? 0}
          </span>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="h-8 px-4 cursor-pointer text-xs bg-secondary/50 border-none text-secondary-foreground hover:bg-secondary font-medium transition-colors"
          onClick={() => window.open(`/forms/${form.slug}`, "_blank")}
        >
          Fill Form <ExternalLink className="ml-1.5 h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
}
