// components/backgrounds/ocean-mist.tsx
const BUBBLES = [
  { left: "10%", size: 6, delay: "0s", duration: "14s" },
  { left: "24%", size: 4, delay: "3s", duration: "11s" },
  { left: "40%", size: 8, delay: "1.5s", duration: "16s" },
  { left: "58%", size: 5, delay: "5s", duration: "12s" },
  { left: "74%", size: 7, delay: "2s", duration: "15s" },
  { left: "88%", size: 4, delay: "4.5s", duration: "13s" },
];

export function OceanMistBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#eef6f7]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5fafb] via-[#eef6f7] to-[#dcedef]" />

      {/* soft mist — signature element, slow breathing blur blobs */}
      <div className="oceanMist1 absolute -top-20 left-[8%] h-72 w-72 rounded-full bg-[#c9e6e9] opacity-40 blur-3xl" />
      <div className="oceanMist2 absolute top-[10%] right-[5%] h-96 w-96 rounded-full bg-[#a8d8dc] opacity-30 blur-3xl" />

      {/* wave layers, back to front, each drifting a different speed */}
      <svg
        className="oceanWaveBack absolute bottom-0 left-0 h-40 w-[200%] opacity-30"
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60 C 100 20, 200 100, 300 60 C 400 20, 500 100, 600 60 C 700 20, 800 100, 800 60 L 800 120 L 0 120 Z"
          fill="#6fa8b5"
        />
      </svg>
      <svg
        className="oceanWaveMid absolute bottom-0 left-0 h-32 w-[200%] opacity-40"
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 70 C 120 30, 220 100, 340 70 C 460 40, 560 100, 680 70 C 740 55, 780 85, 800 70 L 800 120 L 0 120 Z"
          fill="#8fc0c9"
        />
      </svg>
      <svg
        className="oceanWaveFront absolute bottom-0 left-0 h-24 w-[200%] opacity-60"
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80 C 100 50, 200 100, 300 80 C 400 60, 500 100, 600 80 C 700 60, 800 100, 800 80 L 800 120 L 0 120 Z"
          fill="#bfe0e4"
        />
      </svg>

      {/* rising bubbles */}
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="oceanBubble absolute bottom-[-5%] rounded-full bg-white/50 ring-1 ring-white/70"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}

      <style>{`
        @keyframes oceanMistBreathe1 {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.4; }
          50% { transform: translate(15px,-10px) scale(1.08); opacity: 0.55; }
        }
        @keyframes oceanMistBreathe2 {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.3; }
          50% { transform: translate(-20px,15px) scale(1.05); opacity: 0.45; }
        }
        @keyframes oceanWaveDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes oceanBubbleRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        .oceanMist1 { animation: oceanMistBreathe1 10s ease-in-out infinite; }
        .oceanMist2 { animation: oceanMistBreathe2 13s ease-in-out infinite; }
        .oceanWaveBack { animation: oceanWaveDrift 30s linear infinite; }
        .oceanWaveMid { animation: oceanWaveDrift 20s linear infinite reverse; }
        .oceanWaveFront { animation: oceanWaveDrift 14s linear infinite; }
        .oceanBubble { animation-name: oceanBubbleRise; animation-timing-function: ease-in; animation-iteration-count: infinite; }
        @media (prefers-reduced-motion: reduce) {
          .oceanMist1, .oceanMist2, .oceanWaveBack, .oceanWaveMid, .oceanWaveFront, .oceanBubble { animation: none; }
        }
      `}</style>
    </div>
  );
}