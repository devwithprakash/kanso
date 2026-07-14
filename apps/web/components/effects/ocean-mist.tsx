import { useMemo } from "react";

export default function OceanMistEffect() {
  const blobs = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: 5 + Math.random() * 90,
        size: 200 + Math.random() * 220,
        delay: Math.random() * 6,
        duration: 18 + Math.random() * 10,
        reverse: i % 2 === 0,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {blobs.map((b) => (
        <span
          key={b.id}
          className={`absolute rounded-full blur-3xl bg-[#5ec5d6]/[0.07] ${
            b.reverse ? "animate-fog-drift-reverse" : "animate-fog-drift"
          }`}
          style={{
            top: `${b.top}%`,
            width: b.size,
            height: b.size * 0.5,
            left: "-15%",
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
