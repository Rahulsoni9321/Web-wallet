import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Copy, Eye, EyeOff, Check, Wallet, TrendingUp } from "lucide-react";

// Mock token data — replace with real balances
const MOCK_TOKENS = {
  SOL: { symbol: "SOL", name: "Solana", balance: "4.2069", usdValue: "831.22", change: "+3.4%", up: true },
  USDC: { symbol: "USDC", name: "USD Coin", balance: "250.00", usdValue: "250.00", change: "+0.01%", up: true },
};

function TokenRow({token}:{ token:any }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all duration-200">
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{
            background:
              token.symbol === "SOL"
                ? "linear-gradient(135deg, #9945FF, #14F195)"
                : "linear-gradient(135deg, #2775CA, #5AA7E5)",
          }}
        >
          {token.symbol === "SOL" ? "◎" : "$"}
        </div>
        <div>
          <p className="text-[11px] font-semibold text-white/90 leading-none">{token.symbol}</p>
          <p className="text-[9px] text-white/30 mt-0.5">{token.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-mono font-semibold text-white/90">{token.balance}</p>
        <div className="flex items-center gap-1 justify-end mt-0.5">
          <p className="text-[9px] text-white/40">${token.usdValue}</p>
          <span
            className={`text-[8px] font-semibold px-1 py-0.5 rounded-full ${
              token.up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"
            }`}
          >
            {token.change}
          </span>
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text }:{text : any}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-1 p-1 rounded-md hover:bg-white/10 transition-all text-white/30 hover:text-cyan-400 shrink-0"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="check" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
            <Check size={12} className="text-emerald-400" />
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
            <Copy size={12} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function WalletCard({ index = 0, walletDetails = {
  publicKey: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  privateKey: "5KJvsngHeMpm884wtkJNzQGaCWmmTSH1xMQRSS3BYYY2LnzDRQ4X3Xb89uyAKnDv3oHE4mQKhPmDQYBBYDEjxhj",
} }) {
  const [showPrivate, setShowPrivate] = useState(false);
  const [showTokens, setShowTokens] = useState(false);

  const pubKey = walletDetails.publicKey?.toString() || "";
  const privKey = walletDetails.privateKey?.toString() || "";
  const shortPub = pubKey ? `${pubKey.slice(0, 6)}...${pubKey.slice(-6)}` : "";

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      whileHover={{ y: -2 }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Ambient gradient orb */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${
            index % 3 === 0
              ? "rgba(6,182,212,0.12)"
              : index % 3 === 1
              ? "rgba(139,92,246,0.12)"
              : "rgba(20,241,149,0.10)"
          } 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-5 pt-5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))",
                border: "1px solid rgba(6,182,212,0.25)",
              }}
            >
              <Wallet size={14} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-[18px] text-white/80 uppercase font-medium">Wallet</p>
              <h2 className="text-sm font-bold text-white leading-none mt-0.5">#{String(index + 1).padStart(2, "0")}</h2>
            </div>
          </div>
          
        </div>
      </div>

      {/* Keys Section */}
      <div className="relative z-10 px-5 py-4 flex flex-col gap-4">
        {/* Public Key */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-white/30 font-semibold mb-1.5 flex items-center gap-1.5">
            <Key size={9} className="text-cyan-500" />
            Public Key
          </p>
          <div
            className="flex items-center justify-between rounded-xl px-3 py-2.5"
            style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.12)" }}
          >
            <span className="text-[11px] font-mono text-cyan-200/80 truncate">{shortPub}</span>
            <CopyButton text={pubKey} />
          </div>
        </div>

        {/* Private Key */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-white/30 font-semibold mb-1.5 flex items-center gap-1.5">
            <Key size={9} className="text-violet-400" />
            Private Key
          </p>
          <div
            className="flex items-center justify-between rounded-xl px-3 py-2.5 gap-2"
            style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.12)" }}
          >
            <span className="text-[11px] font-mono text-violet-200/70 truncate flex-1">
              {showPrivate ? privKey : "•".repeat(Math.min(privKey.length, 32))}
            </span>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={() => setShowPrivate((v) => !v)}
                className="p-1 rounded-md hover:bg-white/10 transition-all text-white/30 hover:text-violet-400"
              >
                {showPrivate ? <EyeOff size={12} /> : <Eye size={12} />}
              </button>
              <CopyButton text={privKey} />
            </div>
          </div>
        </div>
      </div>

      {/* Tokens toggle */}
      <div className="relative z-10 px-5 pb-4">
        <button
          onClick={() => setShowTokens((v) => !v)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group"
          style={{
            background: showTokens ? "rgba(20,241,149,0.07)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${showTokens ? "rgba(20,241,149,0.18)" : "rgba(255,255,255,0.07)"}`,
          }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={12} className={showTokens ? "text-emerald-400" : "text-white/30 group-hover:text-white/60"} />
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${showTokens ? "text-emerald-400" : "text-white/40 group-hover:text-white/70"}`}>
              Token Balances
            </span>
          </div>
          <motion.span
            animate={{ rotate: showTokens ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/30 text-[10px]"
          >
            ▾
          </motion.span>
        </button>

        <AnimatePresence>
          {showTokens && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-2.5">
                {Object.values(MOCK_TOKENS).map((token) => (
                  <TokenRow key={token.symbol} token={token} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(139,92,246,0.4), transparent)",
        }}
      />
    </motion.div>
  );
}

// --- Demo: 3-column grid preview ---
export function WalletGrid() {
  const wallets = [
    { publicKey: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", privateKey: "5KJvsngHeMpm884wtkJNzQGaCWmmTSH1xMQRSS3BYYY2LnzDRQ4X3Xb89uyAKnDv3oHE4mQKhPmDQYBBYDEjxhj" },
    { publicKey: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", privateKey: "4YHGeGbHsVREFCygPpzMcXBsRHtNLVPnKPEiuXHBUGpBMzL3JK5RN6xFGmQyYV7t" },
    { publicKey: "2MsGnhHZMdrSiAkqTPKbumLiH9Bg3XFvnfCt7MnPuJy7", privateKey: "3XkLvDTMqzUr5PQR8WsmJbEyVkN1oHFxGdCpMaZ4ThLqR2vKj9wYBnSuAeXc6TiP" },
  ];

  return (
    <div
      className="min-h-screen p-8 flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #070711 0%, #0d0d1f 50%, #060d12 100%)" }}
    >
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-white/90 text-2xl font-bold tracking-tight">My Wallets</h1>
          <p className="text-white/30 text-sm mt-1">Manage your Solana accounts</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((wallet, i) => (
            <WalletCard key={i} index={i} walletDetails={wallet} />
          ))}
        </div>
      </div>
    </div>
  );
}