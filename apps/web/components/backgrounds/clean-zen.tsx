export function CleanZenBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#1a0b2e]">
      {/* sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e] via-[#3d1a52] to-[#6b1f4e]" />

      {/* sun — signature element, banded like classic synthwave */}
      <div className="absolute left-1/2 top-[28%] h-[280px] w-[280px] -translate-x-1/2 overflow-hidden rounded-full md:h-[380px] md:w-[380px]">
        <div className="cyberSunGlow h-full w-full bg-gradient-to-b from-[#ffd66b] via-[#ff8c42] to-[#ff5f8f]" />
        {/* horizontal bands cut into the sun, wider gaps near the bottom */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute left-0 w-full bg-[#1a0b2e]"
            style={{
              top: `${58 + i * 7}%`,
              height: `${2 + i}px`,
            }}
          />
        ))}
      </div>

      {/* horizon line */}
      <div className="absolute left-0 top-[62%] h-px w-full bg-[#ff8c42]/50" />

      {/* receding grid floor */}
      <div className="cyberGridScroll absolute left-0 top-[62%] h-[45%] w-full [perspective:300px]">
        <div
          className="absolute inset-0 [transform:rotateX(75deg)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(255,140,66,0.35) 0 1px, transparent 1px 60px), repeating-linear-gradient(to bottom, rgba(255,140,66,0.35) 0 1px, transparent 1px 60px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* fade grid into darkness at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#1a0b2e]" />

      {/* faint scanlines for CRT texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, #fff 0 1px, transparent 1px 3px)",
        }}
      />

      <style>{`
        @keyframes cyberSunGlow {
          0%, 100% { filter: brightness(1) saturate(1); }
          50% { filter: brightness(1.08) saturate(1.15); }
        }
        @keyframes cyberGridScroll {
          0% { background-position-y: 0; }
          100% { background-position-y: 60px; }
        }
        .cyberSunGlow { animation: cyberSunGlow 6s ease-in-out infinite; }
        .cyberGridScroll > div { animation: cyberGridScroll 3s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cyberSunGlow, .cyberGridScroll > div { animation: none; }
        }
      `}</style>
    </div>
  );
}
