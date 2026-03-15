import { motion } from "framer-motion";

const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  dur: Math.random() * 4 + 3,
  delay: Math.random() * 5,
}));

function FloatingSparkle({ x, y, size, dur, delay }: { x: number; y: number; size: number; dur: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: "radial-gradient(circle, rgba(250,204,21,0.9), rgba(251,146,60,0.6))",
        boxShadow: "0 0 6px rgba(250,204,21,0.5)",
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 1, 0],
        scale: [0.6, 1.1, 0.6],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  .swap-font-syne { font-family: 'Syne', sans-serif; }
  .swap-font-dm { font-family: 'DM Sans', sans-serif; }

  @keyframes swap-float {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50%       { transform: translateY(-18px) rotate(2deg); }
  }
  .swap-float { animation: swap-float 4s ease-in-out infinite; }

  @keyframes swap-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .swap-shimmer-text {
    background: linear-gradient(110deg, #fbbf24 10%, #f97316 30%, #ec4899 50%, #a78bfa 70%, #fbbf24 90%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: swap-shimmer 4s linear infinite;
  }

  @keyframes swap-pulse-ring {
    0% { transform: scale(0.9); opacity: 0.8; }
    70% { transform: scale(1.5); opacity: 0; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  .swap-pulse-ring { animation: swap-pulse-ring 2.5s ease-out infinite; }
`;

const Swap = () => {
  return (
    <>
      <style>{CSS}</style>
      <div
        className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(145deg, #0a0a0e 0%, #120d1a 50%, #0a0e0d 100%)" }}
      >
        {/* Ambient blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "60vw",
            height: "55vh",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            filter: "blur(120px)",
            background: "radial-gradient(ellipse, rgba(251,191,36,0.08) 0%, rgba(249,115,22,0.06) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: "45vw",
            height: "40vh",
            bottom: "5%",
            left: "20%",
            filter: "blur(100px)",
            background: "radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 65%)",
          }}
        />

        {/* Floating sparkles */}
        {SPARKLES.map((s) => (
          <FloatingSparkle key={s.id} {...s} />
        ))}

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl"
        >
          {/* Floating emoji */}
          <div className="swap-float text-7xl mb-6 select-none" style={{ filter: "drop-shadow(0 0 28px rgba(251,191,36,0.4))" }}>
            👨‍🍳
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 swap-font-syne"
            style={{
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.22)",
            }}
          >
            {/* Pulse ring + dot */}
            <span className="relative flex items-center justify-center w-2.5 h-2.5">
              <span
                className="swap-pulse-ring absolute inline-flex rounded-full"
                style={{ width: "100%", height: "100%", background: "rgba(251,191,36,0.55)" }}
              />
              <span
                className="relative inline-flex rounded-full w-2 h-2"
                style={{ background: "#fbbf24", boxShadow: "0 0 8px rgba(251,191,36,0.9)" }}
              />
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "rgba(251,191,36,0.85)" }}
            >
              Coming Soon
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="swap-font-syne text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            <span style={{ color: "rgba(255,255,255,0.88)" }}>Swaps are</span>
            <br />
            <span className="swap-shimmer-text">still cooking.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="swap-font-dm text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.35)", fontWeight: 300 }}
          >
            We're whipping up the best cross-chain swap experience for you.
            <br />
            <span style={{ color: "rgba(255,255,255,0.22)" }}>won't be long, grab a coffee ☕</span>
          </motion.p>

          {/* Feature teaser chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-wrap gap-2.5 justify-center mb-10"
          >
            {[
              { icon: "⇄", label: "Cross-chain swaps", col: "#fbbf24" },
              { icon: "⚡", label: "Low fees",           col: "#f97316" },
              { icon: "◎", label: "SOL & ETH",          col: "#a78bfa" },
              { icon: "🔒", label: "Non-custodial",       col: "rgba(255,255,255,0.5)" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] swap-font-dm font-medium"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                <span style={{ color: chip.col }}>{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </motion.div>

          {/* Notify me button (purely aesthetic) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden px-8 py-3.5 rounded-2xl swap-font-syne text-sm font-bold tracking-wide"
              style={{
                background: "linear-gradient(135deg, rgba(251,191,36,0.14), rgba(249,115,22,0.18))",
                border: "1px solid rgba(251,191,36,0.28)",
                color: "rgba(255,255,255,0.85)",
                boxShadow: "0 0 40px rgba(251,191,36,0.1)",
              }}
            >
              {/* shimmer top line */}
              <span
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.7), rgba(249,115,22,0.6), transparent)",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                🔔 Notify me when it's live
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0a0a0e, transparent)" }}
        />
      </div>
    </>
  );
};

export default Swap;