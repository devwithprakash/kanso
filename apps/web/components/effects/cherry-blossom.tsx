"use client";

import { useMemo } from "react";

export default function CherryBlossomEffect() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 6,
        size: 10 + Math.random() * 8,
        rotate: Math.random() * 360,
        spinDuration: 3 + Math.random() * 3,
        spinReverse: i % 2 === 0,
        shade: i % 3 === 0 ? "from-pink-200 to-pink-400" : "from-pink-300 to-pink-500",
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-5%] animate-petal-fall"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          <span
            className={`block w-full h-full bg-gradient-to-br ${p.shade} ${
              p.spinReverse ? "animate-petal-spin-reverse" : "animate-petal-spin"
            }`}
            style={{
              borderRadius: "0% 100% 0% 100%",
              transform: `rotate(${p.rotate}deg)`,
              animationDuration: `${p.spinDuration}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
