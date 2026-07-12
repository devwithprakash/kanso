import { CONFETTI_COLORS, serif } from "@/constants/form";
import { Check, Copy, Download, PartyPopper, X } from "lucide-react";
import { useMemo, useState } from "react";

export function ThankYouScreen({ title, formUrl }: { title: string; formUrl: string }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = formUrl
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(fullUrl)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
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
      Array.from({ length: 60 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 2.2,
        rotate: Math.random() * 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 8,
        shape: i % 3,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
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

      <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />

      {/* Confetti layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
              "--x": `${(Math.random() - 0.5) * 40}vw`,
              "--r": `${p.rotate + 540}deg`,
              animation: `kanso-confetti-fall ${p.duration}s ${p.delay}s cubic-bezier(.2,.6,.3,1) forwards`,
            }}
          />
        ))}
      </div>

      <div
        className="relative w-full max-w-md rounded-3xl border border-border bg-background/95 p-7 sm:p-8 shadow-[0_40px_120px_-30px_oklch(0.3_0.02_150/0.45)]"
        style={{ animation: "kanso-pop .5s cubic-bezier(.2,.7,.3,1.2) both" }}
      >
        <button
          //   onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <PartyPopper className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-medium text-foreground" style={serif}>
            Your form is live
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Share the link or QR code — responses will roll in gently.
          </p>

          <div className="mt-6 w-full">
            <div className="flex items-stretch gap-2">
              <div className="flex-1 truncate rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-left text-sm text-foreground/80">
                {formUrl}
              </div>
              <button
                onClick={copy}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-sm font-medium text-primary-foreground hover:-translate-y-px transition-transform"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card/70 p-4">
            <img
              src={qrSrc}
              alt="Form QR code"
              width={200}
              height={200}
              className="h-[200px] w-[200px] rounded-lg bg-white"
            />
          </div>

          <div className="mt-5 flex w-full items-center justify-center gap-2">
            <button
              onClick={downloadQr}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Download className="h-4 w-4" /> Download QR
            </button>
            <button
              //   onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
