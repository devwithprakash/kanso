"use client";

import { useMemo } from "react";

export default function CyberSunsetEffect() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 80,
        size: 120 + Math.random() * 160,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 4,
        hue: i % 2 === 0 ? "bg-[#ff2dc4]/20" : "bg-[#a63bff]/20",
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {orbs.map((o) => (
        <span
          key={o.id}
          className={`absolute rounded-full blur-3xl animate-orb-pulse ${o.hue}`}
          style={{
            left: `${o.left}%`,
            top: `${o.top}%`,
            width: o.size,
            height: o.size,
            animationDelay: `${o.delay}s`,
            animationDuration: `${o.duration}s`,
          }}
        />
      ))}
      {/* subtle scanline texture, pure CSS, no extra DOM nodes */}
      <div className="absolute inset-0 animate-scanline-drift opacity-[0.04] bg-[repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_3px)]" />
    </div>
  );
}
