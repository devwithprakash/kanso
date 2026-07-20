"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

const STEPS = ["Details", "Fields", "Configure", "Preview"] as const;

type StepIdx = 0 | 1 | 2 | 3;

export function Stepper({ step, onGo }: { step: StepIdx; onGo: (s: StepIdx) => void }) {
  return (
    <ol className="mx-auto flex w-full max-w-3xl items-center gap-1 sm:gap-2">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <React.Fragment key={label}>
            <li className="flex min-w-0 items-center gap-2">
              <button
                onClick={() => i <= step && onGo(i as StepIdx)}
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-medium transition-all",
                  active &&
                    "border-primary bg-primary text-primary-foreground shadow-[0_0_0_4px_oklch(0.42_0.045_150/0.15)]",
                  done && "border-primary/60 bg-primary/10 text-primary",
                  !active && !done && "border-border bg-background text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </button>
              <span
                className={cn(
                  "hidden sm:inline text-sm truncate",
                  active
                    ? "font-medium text-foreground"
                    : done
                      ? "text-foreground/80"
                      : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </li>
            {i < STEPS.length - 1 && (
              <li
                aria-hidden
                className={cn("h-px flex-1", i < step ? "bg-primary/50" : "bg-border")}
              />
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}
