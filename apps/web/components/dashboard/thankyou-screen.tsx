"use client";

import { CONFETTI_COLORS, serif } from "@/constants/form";
import { Check, Copy, Download, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function PublishedInline({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const FROTNEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL as string;

  const formURL = `${FROTNEND_URL}/forms/${slug}`;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(formURL)}`;


  const copy = async () => {
    try {
      await navigator.clipboard.writeText(formURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const downloadQr = () => {
    const a = document.createElement("a");
    a.href = qrSrc;
    a.download = `${title || "form"}-qr.png`;
    a.target = "_blank";
    a.rel = "noopener";
    a.click();
  };

  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.6 + Math.random() * 2.4,
        rotate: Math.random() * 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 9,
        shape: i % 3,
        x: (Math.random() - 0.5) * 40,
      })),
    [],
  );

  return (
    <div className="relative">
      <style>{`
        @keyframes kanso-confetti-fall {
          0% { transform: translate3d(0,-10vh,0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(var(--x),110vh,0) rotate(var(--r)); opacity: 1; }
        }
        @keyframes kanso-pop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        {pieces.map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: "-20px",
              left: `${p.left}%`,
              width: p.size,
              height: p.size * (p.shape === 1 ? 0.4 : 1),
              background: p.color,
              borderRadius: p.shape === 2 ? "9999px" : "2px",
              transform: `rotate(${p.rotate}deg)`,
              // @ts-expect-error CSS var
              "--x": `${p.x}vw`,
              "--r": `${p.rotate + 540}deg`,
              animation: `kanso-confetti-fall ${p.duration}s ${p.delay}s cubic-bezier(.2,.6,.3,1) forwards`,
            }}
          />
        ))}
      </div>

      <div
        className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        style={{ animation: "kanso-pop .5s cubic-bezier(.2,.7,.3,1.2) both" }}
      >
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
          <PartyPopper className="h-8 w-8" />
        </div>
        <h2 className="mt-5 text-3xl sm:text-4xl font-medium text-foreground" style={serif}>
          Your form is live
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share the link or QR code — responses will roll in gently.
        </p>

        <div className="mt-6 w-full">
          <div className="mx-auto flex max-w-md items-stretch gap-2">
            <div className="flex-1 truncate rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-left text-sm text-foreground/80">
              {formURL}
            </div>
            <button
              onClick={copy}
              className="inline-flex cursor-pointer shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-sm font-medium text-primary-foreground hover:-translate-y-px transition-transform"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-card/70 p-5 shadow-[0_20px_60px_-30px_oklch(0.3_0.02_150/0.35)]">
          <img
            src={qrSrc}
            alt="Form QR code"
            width={240}
            height={240}
            className="h-[240px] w-[240px] rounded-xl bg-white"
          />
          <button
            onClick={downloadQr}
            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Download className="h-4 w-4" /> Download QR code
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.42_0.045_150/0.5)] hover:-translate-y-px transition-transform"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
