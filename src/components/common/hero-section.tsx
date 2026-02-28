import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .font-syne  { font-family: 'Syne', sans-serif; }
  .font-dm    { font-family: 'DM Sans', sans-serif; }

  /* Cyan → Violet text gradient */
  .tg-cv {
    background: linear-gradient(125deg, #e0f7fa 0%, #67e8f9 28%, #c4b5fd 68%, #a78bfa 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  /* Subdued gradient for accents */
  .tg-accent {
    background: linear-gradient(130deg, rgba(6,182,212,.95), rgba(139,92,246,.95));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Animated glowing border via pseudo-element gradient */
  .glow-border {
    position: relative;
  }
  .glow-border::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(6,182,212,.65), rgba(124,58,237,.65), rgba(6,182,212,.35));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
    animation: gb-pulse 3.5s ease-in-out infinite;
  }
  @keyframes gb-pulse {
    0%,100% { opacity: .55; }
    50%      { opacity: 1;   }
  }

  /* Pill glow border */
  .pill-glow {
    position: relative;
  }
  .pill-glow::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 999px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(6,182,212,.6), rgba(124,58,237,.55));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* Aurora animations */
  @keyframes aur1 {
    0%,100%{transform:translate(0%,0%)   scale(1);   opacity:.48}
    33%    {transform:translate(7%,-11%) scale(1.08); opacity:.68}
    66%    {transform:translate(-5%,7%)  scale(.96);  opacity:.38}
  }
  @keyframes aur2 {
    0%,100%{transform:translate(0%,0%)   scale(1.08); opacity:.38}
    33%    {transform:translate(-9%,9%)  scale(.94);  opacity:.58}
    66%    {transform:translate(11%,-5%) scale(1.04); opacity:.28}
  }
  @keyframes aur3 {
    0%,100%{transform:translate(0%,0%) scale(.94); opacity:.22}
    50%    {transform:translate(5%,5%)  scale(1.08); opacity:.48}
  }
  @keyframes aur4 {
    0%,100%{transform:translate(0%,0%)    rotate(0deg)  scale(1);    opacity:.16}
    50%    {transform:translate(-7%,-7%)  rotate(8deg)  scale(1.12); opacity:.35}
  }
  .aur1 { animation: aur1 19s ease-in-out infinite; }
  .aur2 { animation: aur2 23s ease-in-out infinite; }
  .aur3 { animation: aur3 17s ease-in-out infinite; }
  .aur4 { animation: aur4 29s ease-in-out infinite; }

  /* Spin for swap arrow */
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .spin-slow { animation: spin-slow 3.2s linear infinite; }
`;


function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0" style={{ background: "#000" }} />

      {/* blob 1 – cyan, top-left */}
      <div className="aur1 absolute rounded-full" style={{
        width: "62vw", height: "58vh", top: "-22%", left: "-16%",
        filter: "blur(130px)",
        background: "radial-gradient(ellipse, rgba(6,182,212,.21) 0%, rgba(6,182,212,.06) 55%, transparent 72%)",
      }} />
      {/* blob 2 – violet, top-right */}
      <div className="aur2 absolute rounded-full" style={{
        width: "68vw", height: "62vh", top: "-28%", right: "-22%",
        filter: "blur(155px)",
        background: "radial-gradient(ellipse, rgba(124,58,237,.26) 0%, rgba(139,92,246,.07) 55%, transparent 72%)",
      }} />
      {/* blob 3 – cyan-violet mix, bottom-center */}
      <div className="aur3 absolute rounded-full" style={{
        width: "48vw", height: "44vh", bottom: "0%", left: "18%",
        filter: "blur(115px)",
        background: "radial-gradient(ellipse, rgba(6,182,212,.13) 0%, rgba(139,92,246,.1) 50%, transparent 72%)",
      }} />
      {/* blob 4 – violet, bottom-right */}
      <div className="aur4 absolute rounded-full" style={{
        width: "58vw", height: "52vh", bottom: "-28%", right: "-12%",
        filter: "blur(172px)",
        background: "radial-gradient(ellipse, rgba(124,58,237,.17) 0%, transparent 68%)",
      }} />

      {/* grid lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: .022 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hg" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth=".5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hg)" />
      </svg>

      {/* radial vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 88% 78% at 50% 50%, transparent 32%, rgba(0,0,0,.92) 100%)",
      }} />
    </div>
  );
}


function Spotlight() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0" style={{
      zIndex: 5,
      background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, rgba(6,182,212,.055), transparent 55%)`,
    }} />
  );
}


function Particles() {
  const pts = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    size: Math.random() * 1.8 + .5,
    x: Math.random() * 100,
    y: 30 + Math.random() * 70,
    dur: Math.random() * 14 + 10,
    del: Math.random() * 9,
    col: i % 2 === 0 ? "rgba(6,182,212,.45)" : "rgba(139,92,246,.45)",
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {pts.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, background: p.col }}
          animate={{ y: [0, -90, 0], opacity: [0, .75, 0] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}


const TOKS = [
  { sym: "SOL",   icon: "◎", col: "#c084fc", bg: "rgba(192,132,252,.14)", border: "rgba(192,132,252,.28)" },
  { sym: "ETH",   icon: "⟠", col: "#a5b4fc", bg: "rgba(165,180,252,.13)", border: "rgba(165,180,252,.25)" },
  { sym: "USDC",  icon: "$", col: "#67e8f9", bg: "rgba(103,232,249,.12)", border: "rgba(103,232,249,.25)" },
  { sym: "BTC",   icon: "₿", col: "#fbbf24", bg: "rgba(251,191,36,.11)",  border: "rgba(251,191,36,.22)"  },
  { sym: "MATIC", icon: "⬡", col: "#a78bfa", bg: "rgba(167,139,250,.13)", border: "rgba(167,139,250,.26)" },
];

function SwapCard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((k) => k + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const from = TOKS[tick % TOKS.length];
  const to   = TOKS[(tick + 2) % TOKS.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: 64, rotateY: -14 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 1.05, delay: .55, ease: [.22, 1, .36, 1] }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{ y: [0, -13, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Outer halo */}
        <div className="absolute -inset-1 rounded-3xl pointer-events-none" style={{
          boxShadow: "0 0 70px rgba(6,182,212,.1), 0 0 130px rgba(124,58,237,.09)",
        }} />

        {/* Card */}
        <div className="glow-border w-72 rounded-3xl overflow-hidden" style={{
          background: "rgba(4,4,4,.94)",
          backdropFilter: "blur(32px)",
          boxShadow: "inset 0 1px 0 rgba(6,182,212,.1), 0 32px 80px rgba(0,0,0,.6)",
        }}>
          {/* Header */}
          <div className="px-5 pt-5 pb-4 flex items-center justify-between font-syne" style={{
            borderBottom: "1px solid rgba(255,255,255,.045)",
          }}>
            <span className="text-[9px] uppercase tracking-[.22em] font-semibold tg-accent">Instant Swap</span>
            <div className="flex gap-1.5">
              {[0,1,2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{
                  background: i === 0 ? "rgba(6,182,212,.65)" : "rgba(255,255,255,.1)",
                  boxShadow: i === 0 ? "0 0 6px rgba(6,182,212,.6)" : "none",
                }} />
              ))}
            </div>
          </div>

          <div className="px-5 py-4 flex flex-col gap-2.5">
            {/* FROM */}
            <AnimatePresence mode="wait">
              <motion.div key={`f${tick}`}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }} transition={{ duration: .3 }}
                className="flex items-center justify-between p-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,.028)", border: "1px solid rgba(255,255,255,.055)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-syne" style={{
                    background: from.bg, border: `1px solid ${from.border}`, color: from.col,
                  }}>{from.icon}</div>
                  <div>
                    <p className="text-sm font-syne font-700 text-white/85">{from.sym}</p>
                    <p className="text-[9px] text-white/25 font-dm">You pay</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-semibold text-white/75">1.000</p>
                  <p className="text-[9px] text-white/25">≈ $127.40</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="spin-slow w-7 h-7 rounded-full flex items-center justify-center" style={{
                background: "linear-gradient(135deg, rgba(6,182,212,.14), rgba(124,58,237,.14))",
                border: "1px solid rgba(6,182,212,.28)",
                color: "rgba(6,182,212,.9)",
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
            </div>

            {/* TO */}
            <AnimatePresence mode="wait">
              <motion.div key={`t${tick}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: .3 }}
                className="flex items-center justify-between p-3 rounded-2xl"
                style={{ background: "rgba(6,182,212,.04)", border: "1px solid rgba(6,182,212,.14)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-syne" style={{
                    background: to.bg, border: `1px solid ${to.border}`, color: to.col,
                  }}>{to.icon}</div>
                  <div>
                    <p className="text-sm font-syne font-700" style={{ color: "rgba(6,182,212,.88)" }}>{to.sym}</p>
                    <p className="text-[9px] text-white/25 font-dm">You receive</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-semibold" style={{ color: "rgba(6,182,212,.78)" }}>~0.9814</p>
                  <p className="text-[9px] text-white/25">≈ $124.98</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swap CTA */}
          <div className="px-5 pb-5">
            <div className="glow-border relative w-full py-3 rounded-2xl overflow-hidden text-center font-syne text-[11px] font-bold tracking-[.14em] uppercase"
              style={{ background: "linear-gradient(135deg, rgba(6,182,212,.12), rgba(124,58,237,.16))" }}>
              {/* top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{
                background: "linear-gradient(90deg, transparent, rgba(6,182,212,.75), rgba(139,92,246,.7), transparent)",
              }} />
              <span className="tg-cv">Swap Now</span>
            </div>
          </div>
        </div>

        {/* Floating chain badges */}
        <motion.div
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
          className="pill-glow absolute -left-16 top-10 flex items-center gap-2 px-3 py-1.5 rounded-full font-syne"
          style={{ background: "rgba(0,0,0,.82)", backdropFilter: "blur(16px)" }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{
            background: "radial-gradient(circle, #c084fc, #9333ea)",
            boxShadow: "0 0 8px rgba(192,132,252,.6)",
          }} />
          <span className="text-[10px] font-semibold" style={{ color: "#c084fc" }}>Solana</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.55 }}
          className="pill-glow absolute -right-14 bottom-16 flex items-center gap-2 px-3 py-1.5 rounded-full font-syne"
          style={{ background: "rgba(0,0,0,.82)", backdropFilter: "blur(16px)" }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{
            background: "radial-gradient(circle, #67e8f9, #06b6d4)",
            boxShadow: "0 0 8px rgba(6,182,212,.6)",
          }} />
          <span className="text-[10px] font-semibold" style={{ color: "#67e8f9" }}>Ethereum</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   GLOW BUTTON
───────────────────────────────────────────── */
function GlowButton({ children, primary = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.035 }} whileTap={{ scale: .97 }}
      className={`glow-border relative overflow-hidden rounded-2xl px-7 py-3.5 text-sm font-bold font-syne tracking-wide`}
      style={primary ? {
        background: "linear-gradient(135deg, rgba(6,182,212,.14), rgba(124,58,237,.18))",
        color: "rgba(255,255,255,.92)",
        boxShadow: "0 0 40px rgba(6,182,212,.12), 0 0 80px rgba(124,58,237,.08)",
      } : {
        background: "transparent",
        color: "rgba(255,255,255,.38)",
        border: "none",
      }}
    >
      {primary && (
        <>
          {/* shimmer line top */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,.7) 40%, rgba(139,92,246,.65) 65%, transparent 100%)",
          }} />
          {/* bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,.35) 50%, transparent 100%)",
          }} />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   STAGGER VARIANTS
───────────────────────────────────────────── */
const sv = {
  wrap: { animate: { transition: { staggerChildren: .11, delayChildren: .22 } } },
  item: {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0, transition: { duration: .75, ease: [.22, 1, .36, 1] } },
  },
};

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <section className="relative min-h-screen w-full overflow-hidden flex flex-col font-dm" style={{ background: "#000" }}>
        <Aurora />
        <Particles />
        <Spotlight />

        {/* ── NAV ── */}
        <motion.nav
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
          className="relative flex items-center justify-between px-8 py-6 md:px-16"
          style={{ zIndex: 20 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl glow-border" style={{
                background: "linear-gradient(135deg, rgba(6,182,212,.18), rgba(124,58,237,.22))",
                boxShadow: "0 0 22px rgba(6,182,212,.22)",
              }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#67e8f9"/>
                      <stop offset="100%" stopColor="#a78bfa"/>
                    </linearGradient>
                  </defs>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="url(#lg1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <span className="font-syne text-lg text-white/90" style={{ fontWeight: 700, letterSpacing: "-.02em" }}>
              Mnemonic<span className="tg-accent">X</span>
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Swap","Wallets","Docs","Pricing"].map(l => (
              <a key={l} href="#" className="font-dm text-[13px] hover:text-white/72 transition-colors duration-200"
                style={{ color: "rgba(255,255,255,.32)" }}>{l}</a>
            ))}
          </div>

          {/* CTA */}
          <GlowButton primary>
            Launch App
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </GlowButton>
        </motion.nav>

        {/* ── BODY ── */}
        <div className="relative flex-1 flex items-center px-8 md:px-16 lg:px-24 py-10" style={{ zIndex: 20 }}>
          <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[1fr_auto] gap-16 xl:gap-28 items-center">

            {/* LEFT */}
            <motion.div variants={sv.wrap} initial="initial" animate="animate"
              className="flex flex-col gap-7 max-w-xl">

              {/* Status pill */}
              <motion.div variants={sv.item}>
                <span className="pill-glow inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-syne"
                  style={{ background: "rgba(0,0,0,.55)", backdropFilter: "blur(18px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
                    background: "radial-gradient(circle, #67e8f9, #06b6d4)",
                    boxShadow: "0 0 10px rgba(6,182,212,.9)",
                  }} />
                  <span className="text-[10px] uppercase tracking-[.2em] font-semibold" style={{ color: "rgba(6,182,212,.82)" }}>
                    Live on Solana & Ethereum
                  </span>
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div variants={sv.item} className="flex flex-col gap-1.5">
                <h1 className="font-syne leading-[1.04]" style={{ fontWeight: 700, letterSpacing: "-.03em" }}>
                  <span className="block text-5xl lg:text-6xl xl:text-[68px]" style={{ color: "rgba(255,255,255,.87)" }}>
                    One Interface.
                  </span>
                  <span className="block text-5xl lg:text-6xl xl:text-[68px] tg-cv">
                    Every Chain.
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p variants={sv.item} className="font-dm text-base lg:text-[17px] leading-relaxed"
                style={{ color: "rgba(255,255,255,.36)", fontWeight: 300 }}>
                Create non-custodial wallets on{" "}
                <span style={{ color: "rgba(192,132,252,.88)", fontWeight: 400 }}>Solana</span> and{" "}
                <span style={{ color: "rgba(6,182,212,.88)", fontWeight: 400 }}>Ethereum</span>,
                then swap any token at the best rate — instantly, with no middlemen.
              </motion.p>

              {/* Feature chips */}
              <motion.div variants={sv.item} className="flex flex-wrap gap-2">
                {[
                  { icon: "◎",  label: "Solana Wallets",   c: "#c084fc" },
                  { icon: "⟠",  label: "Ethereum Wallets", c: "#a5b4fc" },
                  { icon: "⇄",  label: "Token Swaps",      c: "#67e8f9" },
                  { icon: "🔒", label: "Non-Custodial",     c: "rgba(255,255,255,.42)" },
                ].map(f => (
                  <span key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-dm font-medium"
                    style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.06)", color: "rgba(255,255,255,.45)" }}>
                    <span style={{ color: f.c }}>{f.icon}</span>
                    {f.label}
                  </span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={sv.item} className="flex items-center gap-3 mt-1">
                <GlowButton primary>
                  Get Started
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </GlowButton>
                <GlowButton>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
                  </svg>
                  Watch demo
                </GlowButton>
              </motion.div>

              {/* Stats */}
              <motion.div variants={sv.item}
                className="grid grid-cols-3 rounded-2xl overflow-hidden mt-2"
                style={{ border: "1px solid rgba(255,255,255,.045)", background: "rgba(255,255,255,.02)" }}>
                {[
                  { val: "$2.4B+", label: "Volume"     },
                  { val: "180K+",  label: "Wallets"    },
                  { val: "< 0.3s", label: "Swap time"  },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center py-4 px-2"
                    style={{
                      background: "rgba(0,0,0,.55)",
                      borderRight: i < 2 ? "1px solid rgba(255,255,255,.045)" : "none",
                    }}>
                    <span className="font-syne tg-cv" style={{ fontSize: "1.15rem", fontWeight: 700 }}>{s.val}</span>
                    <span className="font-dm uppercase tracking-widest mt-1"
                      style={{ fontSize: ".65rem", color: "rgba(255,255,255,.2)" }}>{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT */}
            <div className="hidden lg:flex justify-center items-center pr-6">
              <SwapCard />
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{
          zIndex: 22,
          background: "linear-gradient(to top, #000, transparent)",
        }} />
      </section>
    </>
  );
}