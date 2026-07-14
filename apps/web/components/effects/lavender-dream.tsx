"use client";
import { useMemo } from "react";

export default function LavenderDreamEffect() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 6,
        size: 6 + Math.random() * 8,
        shade: i % 3 === 0 ? "bg-purple-200" : "bg-purple-400",
      })),
    []
  );

  const glowBlobs = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 70,
        top: 10 + Math.random() * 70,
        size: 260 + Math.random() * 180,
        delay: Math.random() * 5,
        duration: 12 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {glowBlobs.map((b) => (
        <span
          key={`blob-${b.id}`}
          className="absolute rounded-full bg-purple-300/20 blur-3xl animate-orb-pulse"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}

      {sparkles.map((s) => (
        <span
          key={s.id}
          className={`absolute bottom-[-5%] rounded-full ${s.shade} animate-sparkle-float`}
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 10px 2px rgba(196,165,255,0.55)",
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}