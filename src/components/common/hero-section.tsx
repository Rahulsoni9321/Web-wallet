import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ──────────────────────────────────────────────
   GLOBAL STYLES
────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .font-syne  { font-family: 'Syne', sans-serif; }
  .font-dm    { font-family: 'DM Sans', sans-serif; }

  /* ── Gradient preset: cyan→violet text ── */
  .tg-cv {
    background: linear-gradient(125deg, #e0f7fa 0%, #67e8f9 28%, #c4b5fd 68%, #a78bfa 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .tg-accent {
    background: linear-gradient(130deg, rgba(6,182,212,.95), rgba(139,92,246,.95));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Glow border ── */
  .glow-border { position: relative; }
  .glow-border::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(6,182,212,.65), rgba(124,58,237,.65), rgba(6,182,212,.35));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; mask-composite: exclude;
    pointer-events: none;
    animation: gb-pulse 3.5s ease-in-out infinite;
  }
  @keyframes gb-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }

  /* ── Pill glow ── */
  .pill-glow { position: relative; }
  .pill-glow::before {
    content: '';
    position: absolute; inset: 0; border-radius: 999px; padding: 1px;
    background: linear-gradient(135deg, rgba(6,182,212,.6), rgba(124,58,237,.55));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; mask-composite: exclude;
    pointer-events: none;
  }

  /* ── Aurora blobs ── */
  @keyframes aur1 {
    0%,100%{transform:translate(0%,0%)   scale(1);   opacity:.48}
    33%    {transform:translate(7%,-11%) scale(1.08); opacity:.7}
    66%    {transform:translate(-5%,7%)  scale(.96);  opacity:.38}
  }
  @keyframes aur2 {
    0%,100%{transform:translate(0%,0%)   scale(1.08); opacity:.38}
    33%    {transform:translate(-9%,9%)  scale(.94);  opacity:.6}
    66%    {transform:translate(11%,-5%) scale(1.04); opacity:.28}
  }
  @keyframes aur3 {
    0%,100%{transform:translate(0%,0%) scale(.94); opacity:.22}
    50%    {transform:translate(5%,5%)  scale(1.08); opacity:.5}
  }
  @keyframes aur4 {
    0%,100%{transform:translate(0%,0%)   rotate(0deg)  scale(1);    opacity:.16}
    50%    {transform:translate(-7%,-7%) rotate(8deg)  scale(1.12); opacity:.38}
  }
  .aur1{animation:aur1 19s ease-in-out infinite}
  .aur2{animation:aur2 23s ease-in-out infinite}
  .aur3{animation:aur3 17s ease-in-out infinite}
  .aur4{animation:aur4 29s ease-in-out infinite}

  /* ── Ticker ── */
  @keyframes ticker { 0%{transform:translateX(0%)} 100%{transform:translateX(-50%)} }
  .ticker-track { animation: ticker 22s linear infinite; }
  .ticker-track:hover { animation-play-state: paused; }

  /* ── Shimmer word ── */
  @keyframes word-shimmer {
    0%,100% { opacity:.85 }
    50%     { opacity:1  }
  }
`;

/* ──────────────────────────────────────────────
   AURORA BACKGROUND
────────────────────────────────────────────── */
function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0" style={{ background: "#000" }} />

      <div className="aur1 absolute rounded-full" style={{
        width: "70vw", height: "65vh", top: "-20%", left: "-18%",
        filter: "blur(140px)",
        background: "radial-gradient(ellipse, rgba(6,182,212,.22) 0%, rgba(6,182,212,.06) 55%, transparent 72%)",
      }} />
      <div className="aur2 absolute rounded-full" style={{
        width: "75vw", height: "68vh", top: "-30%", right: "-20%",
        filter: "blur(160px)",
        background: "radial-gradient(ellipse, rgba(124,58,237,.28) 0%, rgba(139,92,246,.07) 55%, transparent 72%)",
      }} />
      <div className="aur3 absolute rounded-full" style={{
        width: "50vw", height: "46vh", bottom: "0%", left: "22%",
        filter: "blur(120px)",
        background: "radial-gradient(ellipse, rgba(6,182,212,.14) 0%, rgba(139,92,246,.11) 50%, transparent 72%)",
      }} />
      <div className="aur4 absolute rounded-full" style={{
        width: "60vw", height: "54vh", bottom: "-30%", right: "-14%",
        filter: "blur(180px)",
        background: "radial-gradient(ellipse, rgba(124,58,237,.18) 0%, transparent 68%)",
      }} />

      {/* subtle grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: .018 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hg" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="white" strokeWidth=".5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hg)" />
      </svg>

      {/* radial vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 28%, rgba(0,0,0,.94) 100%)",
      }} />
    </div>
  );
}

/* ──────────────────────────────────────────────
   MOUSE SPOTLIGHT
────────────────────────────────────────────── */
function Spotlight() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0" style={{
      zIndex: 5,
      background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, rgba(6,182,212,.06), transparent 55%)`,
    }} />
  );
}

/* ──────────────────────────────────────────────
   FLOATING PARTICLES
────────────────────────────────────────────── */
function Particles() {
  const pts = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + .6,
    x: Math.random() * 100,
    y: 25 + Math.random() * 72,
    dur: Math.random() * 14 + 10,
    del: Math.random() * 9,
    col: i % 2 === 0 ? "rgba(6,182,212,.5)" : "rgba(139,92,246,.5)",
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {pts.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, background: p.col }}
          animate={{ y: [0, -100, 0], opacity: [0, .8, 0] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   GLOW BUTTON
────────────────────────────────────────────── */
function GlowButton({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.035 }} whileTap={{ scale: .97 }}
      className="glow-border relative overflow-hidden rounded-2xl px-7 py-3.5 text-sm font-bold font-syne tracking-wide"
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
          <div className="absolute top-0 left-0 right-0 h-px" style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,.7) 40%, rgba(139,92,246,.65) 65%, transparent 100%)",
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,.35) 50%, transparent 100%)",
          }} />
        </>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

/* ──────────────────────────────────────────────
   SCROLLING TOKEN TICKER
────────────────────────────────────────────── */
const TICKER_ITEMS = [
  { sym: "SOL",   icon: "◎", col: "#c084fc", price: "$127.40", chg: "+3.4%" },
  { sym: "ETH",   icon: "⟠", col: "#a5b4fc", price: "$3,481.20", chg: "+1.7%" },
  { sym: "USDC",  icon: "$", col: "#67e8f9", price: "$1.00",    chg: "+0.01%" },
  { sym: "BTC",   icon: "₿", col: "#fbbf24", price: "$67,200",  chg: "+2.1%" },
  { sym: "MATIC", icon: "⬡", col: "#a78bfa", price: "$0.84",   chg: "-0.5%" },
  { sym: "AVAX",  icon: "▲", col: "#f87171", price: "$36.20",  chg: "+4.2%" },
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // duplicate for seamless loop
  return (
    <div className="w-full overflow-hidden" style={{
      borderTop: "1px solid rgba(255,255,255,.045)",
      borderBottom: "1px solid rgba(255,255,255,.045)",
      background: "rgba(0,0,0,.5)",
      backdropFilter: "blur(12px)",
    }}>
      <div className="ticker-track flex items-center gap-0" style={{ width: "max-content" }}>
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-8 py-3" style={{
            borderRight: "1px solid rgba(255,255,255,.04)",
          }}>
            <span className="font-syne text-sm font-bold" style={{ color: t.col }}>{t.icon}</span>
            <span className="font-syne text-[11px] font-semibold text-white/55">{t.sym}</span>
            <span className="font-mono text-[11px] text-white/40">{t.price}</span>
            <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full font-semibold
              ${t.chg.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}
              style={{ background: t.chg.startsWith('+') ? 'rgba(52,211,153,.1)' : 'rgba(248,113,113,.1)' }}
            >{t.chg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   FEATURE CARD
────────────────────────────────────────────── */
function FeatureCard({ icon, title, desc, color, delay }: {
  icon: string; title: string; desc: string; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [.22, 1, .36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glow-border flex flex-col gap-3 p-5 rounded-2xl"
      style={{
        background: "rgba(255,255,255,.025)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{
        background: `radial-gradient(circle, ${color}22 0%, ${color}08 100%)`,
        border: `1px solid ${color}33`,
      }}>{icon}</div>
      <div>
        <p className="font-syne text-sm font-bold text-white/80 mb-1">{title}</p>
        <p className="font-dm text-xs text-white/30 leading-relaxed" style={{ fontWeight: 300 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   STAGGER VARIANTS
────────────────────────────────────────────── */
const sv = {
  wrap: { animate: { transition: { staggerChildren: .1, delayChildren: .18 } } },
  item: {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0, transition: { duration: .75, ease: [.22, 1, .36, 1] } },
  },
};

/* ──────────────────────────────────────────────
   HERO SECTION  (full-width, centred)
────────────────────────────────────────────── */
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

          <div className="hidden md:flex items-center gap-8">
            {["Swap","Wallets","Docs"].map(l => (
              <a key={l} href="#" className="font-dm text-[13px] hover:text-white/72 transition-colors duration-200"
                style={{ color: "rgba(255,255,255,.32)" }}>{l}</a>
            ))}
          </div>

          <GlowButton primary>
            Launch App
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </GlowButton>
        </motion.nav>

        {/* ── HERO BODY ── */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-12 pb-16 pt-6 text-center" style={{ zIndex: 20 }}>
          <motion.div variants={sv.wrap} initial="initial" animate="animate"
            className="flex flex-col items-center gap-8 max-w-4xl w-full mx-auto"
          >
            {/* Status pill */}
            <motion.div variants={sv.item}>
              <span className="pill-glow inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-syne"
                style={{ background: "rgba(0,0,0,.55)", backdropFilter: "blur(18px)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{
                  background: "radial-gradient(circle, #67e8f9, #06b6d4)",
                  boxShadow: "0 0 10px rgba(6,182,212,.9)",
                }} />
                <span className="text-[10px] uppercase tracking-[.2em] font-semibold" style={{ color: "rgba(6,182,212,.82)" }}>
                  Live on Solana &amp; Ethereum
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={sv.item} className="flex flex-col gap-2">
              <h1 className="font-syne leading-[1.04]" style={{ fontWeight: 800, letterSpacing: "-.035em" }}>
                <span className="block text-5xl md:text-6xl xl:text-[76px]" style={{ color: "rgba(255,255,255,.88)" }}>
                  One Wallet.
                </span>
                <span className="block text-5xl md:text-6xl xl:text-[76px] tg-cv">
                  Every Chain.
                </span>
                <span className="block text-5xl md:text-6xl xl:text-[76px]" style={{ color: "rgba(255,255,255,.22)" }}>
                  Zero Compromise.
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p variants={sv.item} className="font-dm text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "rgba(255,255,255,.36)", fontWeight: 300 }}>
              Create non-custodial wallets on{" "}
              <span style={{ color: "rgba(192,132,252,.88)", fontWeight: 400 }}>Solana</span> and{" "}
              <span style={{ color: "rgba(6,182,212,.88)", fontWeight: 400 }}>Ethereum</span>,
              then swap any token at the best rate — instantly, with no middlemen.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={sv.item} className="flex items-center gap-3">
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

            {/* Stats row */}
            <motion.div variants={sv.item}
              className="grid grid-cols-3 rounded-2xl overflow-hidden w-full max-w-md"
              style={{ border: "1px solid rgba(255,255,255,.045)", background: "rgba(255,255,255,.02)" }}>
              {[
                { val: "$2.4B+", label: "Volume" },
                { val: "180K+",  label: "Wallets" },
                { val: "< 0.3s", label: "Swap time" },
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

          {/* ── Feature cards ── */}
          <div className="relative z-20 w-full max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "◎",  title: "Solana Wallets",   desc: "HD wallets derived from a single mnemonic", color: "#c084fc", delay: .7 },
              { icon: "⟠",  title: "Ethereum Wallets", desc: "Full EVM support with private key export",   color: "#a5b4fc", delay: .8 },
              { icon: "⇄",  title: "Token Swaps",      desc: "Best-rate cross-chain swaps, coming soon",   color: "#67e8f9", delay: .9 },
              { icon: "🔒", title: "Non-Custodial",     desc: "Your keys, your crypto. Always.",           color: "#34d399", delay: 1.0 },
            ].map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="relative" style={{ zIndex: 20 }}>
          <Ticker />
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{
          zIndex: 22,
          background: "linear-gradient(to top, #000, transparent)",
        }} />
      </section>
    </>
  );
}