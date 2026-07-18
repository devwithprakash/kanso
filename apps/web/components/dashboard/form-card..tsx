import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  BarChart3,
  ExternalLink,
  Eye,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";

interface Form {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  visibility: "public" | "unlisted" | "private";
  title: string;
  description: string | null;
  theme: "clean-zen" | "cyber-sunset" | "cherry-blossom" | "ocean-mist" | "lavender-dream";
  slug: string;
  createdBy: string;
  responseCount: number;
}

type FormCardProps = {
  form: Form;
  index: number;
  handleCopyLink: (slug: string) => Promise<void>;
  handleDeleteForm: (formId: string) => Promise<void>;
};
export default function FormCard({ form, index, handleCopyLink, handleDeleteForm }: FormCardProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-card rounded-2xl border border-border p-5 flex flex-col h-full shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
    >
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
                <Pencil className="h-4 w-4 opacity-70" /> Edit
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

      <div className="flex-1 mb-6">
        <Link href={`/dashboard/forms/${form.id}/builder`} className="block mb-2 group/title">
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover/title:text-primary transition-colors line-clamp-1 tracking-tight">
            {form.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {form.description || "No description provided."}
        </p>
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
        <span className="text-xs text-muted-foreground">
          {new Date(form.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-semibold text-foreground">{form.responseCount}</span>
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </motion.div>
  );
}
