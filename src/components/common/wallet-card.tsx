import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Copy, Eye, EyeOff, Check, Wallet, TrendingUp, Shield } from "lucide-react";

/* ─── Token row (mock balances) ─── */
const MOCK_TOKENS = {
  SOL:  { symbol: "SOL",  name: "Solana",   balance: "4.2069",  usdValue: "831.22",  change: "+3.4%",  up: true  },
  USDC: { symbol: "USDC", name: "USD Coin", balance: "250.00",  usdValue: "250.00",  change: "+0.01%", up: true  },
};

function TokenRow({ token }: { token: typeof MOCK_TOKENS.SOL }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-xl transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{
          background: token.symbol === "SOL"
            ? "linear-gradient(135deg, #9945FF, #14F195)"
            : "linear-gradient(135deg, #2775CA, #5AA7E5)",
        }}>
          {token.symbol === "SOL" ? "◎" : "$"}
        </div>
        <div>
          <p className="text-[11px] font-semibold leading-none" style={{ color: "rgba(255,255,255,0.8)" }}>{token.symbol}</p>
          <p className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>{token.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-mono font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>{token.balance}</p>
        <div className="flex items-center gap-1 justify-end mt-0.5">
          <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>${token.usdValue}</p>
          <span className={`text-[8px] font-semibold px-1 py-0.5 rounded-full ${
            token.up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"
          }`}>{token.change}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Copy button ─── */
function CopyButton({ text, accent = "cyan" }: { text: string; accent?: "cyan" | "violet" }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const hoverCol = accent === "cyan" ? "hover:text-cyan-400" : "hover:text-violet-400";
  return (
    <button onClick={handleCopy}
      className={`ml-1 p-1 rounded-md hover:bg-white/10 transition-all text-white/25 ${hoverCol} shrink-0`}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="check" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
            <Check size={11} className="text-emerald-400" />
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
            <Copy size={11} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/* ─── Tag badge ─── */
function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span className="text-[8px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono"
      style={{ background: `${color}14`, color, border: `1px solid ${color}28` }}>
      {label}
    </span>
  );
}

/* ─── Wallet card ─── */
interface WalletCardProps {
  index?: number;
  walletDetails?: { publicKey: string; privateKey: string };
}

export default function WalletCard({
  index = 0,
  walletDetails = {
    publicKey:  "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    privateKey: "5KJvsngHeMpm884wtkJNzQGaCWmmTSH1xMQRSS3BYYY2",
  },
}: WalletCardProps) {
  const [showPrivate, setShowPrivate] = useState(false);
  const [showTokens,  setShowTokens]  = useState(false);

  const pubKey  = walletDetails?.publicKey?.toString()  ?? "";
  const privKey = walletDetails?.privateKey?.toString() ?? "";
  const shortPub = pubKey  ? `${pubKey.slice(0, 8)}…${pubKey.slice(-6)}`  : "—";

  /* Colour palette rotates per wallet */
  const palettes = [
    { accent: "rgba(6,182,212,1)",   bg: "rgba(6,182,212,0.07)",   border: "rgba(6,182,212,0.15)",   glow: "rgba(6,182,212,0.12)"   },
    { accent: "rgba(139,92,246,1)",  bg: "rgba(139,92,246,0.07)",  border: "rgba(139,92,246,0.15)",  glow: "rgba(139,92,246,0.12)"  },
    { accent: "rgba(20,241,149,1)",  bg: "rgba(20,241,149,0.06)",  border: "rgba(20,241,149,0.14)",  glow: "rgba(20,241,149,0.10)"  },
  ];
  const pal = palettes[index % palettes.length];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      animate={{ opacity: 1, y: 0,  scale: 1     }}
      exit={{ opacity: 0, y: -16, scale: 0.93 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
        border: `1px solid ${pal.border}`,
        boxShadow: `0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px ${pal.border}, inset 0 1px 0 rgba(255,255,255,0.06)`,
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Ambient orb */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, ${pal.glow} 0%, transparent 70%)`,
      }} />

      {/* ── Header ── */}
      <div className="relative z-10 px-5 pt-5 pb-4"
        style={{ borderBottom: `1px solid ${pal.border}` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{
              background: pal.bg,
              border: `1px solid ${pal.border}`,
            }}>
              <Wallet size={15} style={{ color: pal.accent }} />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] font-semibold mb-0.5"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Syne', sans-serif" }}>Account</p>
              <h2 className="text-base font-bold leading-none"
                style={{ color: "rgba(255,255,255,0.88)", fontFamily: "'Syne', sans-serif" }}>
                Wallet #{String(index + 1).padStart(2, "0")}
              </h2>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col items-end gap-1">
            <Tag label="Active"  color="#34d399" />
            <Tag label="HD"      color={pal.accent} />
          </div>
        </div>
      </div>

      {/* ── Keys ── */}
      <div className="relative z-10 px-5 py-4 flex flex-col gap-3.5">

        {/* Public key */}
        <div>
          <p className="text-[8px] uppercase tracking-[0.2em] font-semibold mb-1.5 flex items-center gap-1.5"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Syne', sans-serif" }}>
            <Key size={8} style={{ color: "rgba(6,182,212,0.7)" }} />
            Public Key
          </p>
          <div className="flex items-center justify-between rounded-xl px-3 py-2.5" style={{
            background: "rgba(6,182,212,0.05)",
            border: "1px solid rgba(6,182,212,0.1)",
          }}>
            <span className="text-[11px] font-mono truncate" style={{ color: "rgba(103,232,249,0.75)" }}>
              {shortPub}
            </span>
            <CopyButton text={pubKey} accent="cyan" />
          </div>
        </div>

        {/* Private key */}
        <div>
          <p className="text-[8px] uppercase tracking-[0.2em] font-semibold mb-1.5 flex items-center gap-1.5"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Syne', sans-serif" }}>
            <Shield size={8} style={{ color: "rgba(167,139,250,0.7)" }} />
            Private Key
            <span className="text-[7px] px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(248,113,113,0.12)", color: "rgba(248,113,113,0.8)", border: "1px solid rgba(248,113,113,0.2)" }}>
              sensitive
            </span>
          </p>
          <div className="flex items-center justify-between rounded-xl px-3 py-2.5 gap-2" style={{
            background: "rgba(139,92,246,0.05)",
            border: "1px solid rgba(139,92,246,0.12)",
          }}>
            <span className="text-[11px] font-mono flex-1 truncate" style={{ color: "rgba(196,181,253,0.65)" }}>
              {showPrivate
                ? privKey
                : "•".repeat(Math.min(privKey.length, 32))}
            </span>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={() => setShowPrivate(v => !v)}
                className="p-1 rounded-md hover:bg-white/10 transition-all text-white/25 hover:text-violet-400"
              >
                {showPrivate ? <EyeOff size={11} /> : <Eye size={11} />}
              </button>
              <CopyButton text={privKey} accent="violet" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Token toggle ── */}
      <div className="relative z-10 px-5 pb-5">
        <button
          onClick={() => setShowTokens(v => !v)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group"
          style={{
            background: showTokens ? `${pal.bg}` : "rgba(255,255,255,0.02)",
            border: `1px solid ${showTokens ? pal.border : "rgba(255,255,255,0.06)"}`,
          }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={11} style={{ color: showTokens ? pal.accent : "rgba(255,255,255,0.25)" }} />
            <span className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ fontFamily: "'Syne', sans-serif", color: showTokens ? pal.accent : "rgba(255,255,255,0.35)" }}>
              Token Balances
            </span>
          </div>
          <motion.span animate={{ rotate: showTokens ? 180 : 0 }} transition={{ duration: 0.2 }}
            className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            ▾
          </motion.span>
        </button>

        <AnimatePresence>
          {showTokens && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-2.5">
                {Object.values(MOCK_TOKENS).map(token => (
                  <TokenRow key={token.symbol} token={token} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{
        background: `linear-gradient(90deg, transparent, ${pal.accent}, transparent)`,
        opacity: 0.4,
      }} />
    </motion.div>
  );
}

/* ─── Demo grid ─── */
export function WalletGrid() {
  const wallets = [
    { publicKey: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", privateKey: "5KJvsngHeMpm884wtkJNzQGaCWmmTSH1xMQRSS3BYYY2" },
    { publicKey: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", privateKey: "4YHGeGbHsVREFCygPpzMcXBsRHtNLVPnKPEiuXHBUGpB" },
    { publicKey: "2MsGnhHZMdrSiAkqTPKbumLiH9Bg3XFvnfCt7MnPuJy7", privateKey: "3XkLvDTMqzUr5PQR8WsmJbEyVkN1oHFxGdCpMaZ4ThLq" },
  ];
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #07070f 0%, #0d0d1f 50%, #06090f 100%)" }}>
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-white/88 text-2xl font-bold tracking-tight" style={{ fontFamily: "'Syne',sans-serif" }}>My Wallets</h1>
          <p className="text-white/28 text-sm mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>Manage your accounts</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((w, i) => <WalletCard key={i} index={i} walletDetails={w} />)}
        </div>
      </div>
    </div>
  );
}