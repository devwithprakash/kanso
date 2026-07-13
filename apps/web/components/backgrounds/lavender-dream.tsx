// components/backgrounds/lavender-dream.tsx
const SPARKLES = [
  { top: "15%", left: "20%", size: 3, delay: "0s" },
  { top: "30%", left: "70%", size: 2, delay: "1.2s" },
  { top: "55%", left: "12%", size: 4, delay: "2.4s" },
  { top: "68%", left: "85%", size: 2, delay: "0.6s" },
  { top: "80%", left: "45%", size: 3, delay: "3s" },
  { top: "22%", left: "48%", size: 2, delay: "1.8s" },
];

export function LavenderDreamBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f5f0fa]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f2fb] via-[#f5f0fa] to-[#ede3f7]" />

      {/* drifting aurora blobs — signature element */}
      <div className="lavenderDrift1 absolute -top-24 left-[15%] h-[420px] w-[420px] rounded-full bg-[#c9b6e4] opacity-40 blur-[80px]" />
      <div className="lavenderDrift2 absolute top-[20%] -right-20 h-[380px] w-[380px] rounded-full bg-[#e8b4d8] opacity-35 blur-[80px]" />
      <div className="lavenderDrift3 absolute bottom-[-15%] left-[30%] h-[340px] w-[340px] rounded-full bg-[#b8a4d4] opacity-30 blur-[90px]" />

      {/* twinkling sparkles */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="lavenderSparkle absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            boxShadow: "0 0 6px 1px rgba(255,255,255,0.8)",
          }}
        />
      ))}

      <style>{`
        @keyframes lavenderDrift1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,25px) scale(1.06); }
        }
        @keyframes lavenderDrift2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-25px,20px) scale(1.08); }
        }
        @keyframes lavenderDrift3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20px,-20px) scale(1.05); }
        }
        @keyframes lavenderTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }
        .lavenderDrift1 { animation: lavenderDrift1 16s ease-in-out infinite; }
        .lavenderDrift2 { animation: lavenderDrift2 19s ease-in-out infinite; }
        .lavenderDrift3 { animation: lavenderDrift3 22s ease-in-out infinite; }
        .lavenderSparkle { animation: lavenderTwinkle 3.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lavenderDrift1, .lavenderDrift2, .lavenderDrift3, .lavenderSparkle { animation: none; opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}