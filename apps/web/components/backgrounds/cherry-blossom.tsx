// components/backgrounds/cherry-blossom.tsx
const PETALS = [
  { left: "6%", size: 14, delay: "0s", duration: "11s", drift: "40px" },
  { left: "18%", size: 10, delay: "2.4s", duration: "9s", drift: "-30px" },
  { left: "30%", size: 16, delay: "1s", duration: "13s", drift: "50px" },
  { left: "44%", size: 11, delay: "4s", duration: "10s", drift: "-25px" },
  { left: "58%", size: 15, delay: "0.6s", duration: "12s", drift: "35px" },
  { left: "70%", size: 9,  delay: "3.2s", duration: "9.5s", drift: "-40px" },
  { left: "82%", size: 13, delay: "1.8s", duration: "11.5s", drift: "20px" },
  { left: "92%", size: 10, delay: "5s",   duration: "10.5s", drift: "-20px" },
];

export function CherryBlossomBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#fafafa]">
      {/* faint branch silhouette, top-right — signature element */}
      <svg
        className="absolute -top-6 -right-10 h-64 w-64 opacity-[0.12] md:h-80 md:w-80"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M180 10 C 150 30, 140 55, 110 65 C 90 72, 70 68, 55 82 C 40 96, 42 115, 25 125"
          stroke="#8B7D77"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M120 60 C 108 50, 92 48, 82 38"
          stroke="#8B7D77"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M60 84 C 50 92, 48 104, 38 108"
          stroke="#8B7D77"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* a few blossoms sitting on the branch */}
        {[
          [110, 65], [82, 38], [55, 82], [38, 108], [150, 30],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill="#EFA8C4" opacity="0.8" />
        ))}
      </svg>

      {/* falling petals */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal absolute top-[-5%]"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              "--drift": p.drift,
            } as React.CSSProperties
          }
        />
      ))}

      {/* soft radial vignette so petals fade into the page edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafafa]/60" />

      <style>{`
        .petal {
          border-radius: 100% 0 100% 0;
          background: linear-gradient(135deg, #F7C6D9, #EFA8C4);
          opacity: 0.55;
          animation-name: petalFall;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
        @keyframes petalFall {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.55; }
          50% {
            transform: translate(var(--drift), 55vh) rotate(180deg);
          }
          90% { opacity: 0.5; }
          100% {
            transform: translate(calc(var(--drift) * 1.6), 110vh) rotate(320deg);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .petal { animation: none; opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}