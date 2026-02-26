import { useWalletContext } from "@/context/wallet-context";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle, Trash, Key, Wallet, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WalletDisplayArea = () => {
  const { selectedCoinType, wallet, createWallet } = useWalletContext();

  return (
    <div className="rounded-3xl p-6  text-white ">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wallet className="text-cyan-400" />
          My Wallets
        </h1>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={createWallet}
            className="text-black flex items-center gap-2 hover:scale-105 transition"
          >
            <PlusCircle size={18} />
            Add Wallet
          </Button>

          <Button
            variant="destructive"
            className="flex items-center gap-2 hover:scale-105 transition"
          >
            <Trash size={18} />
            Clear Wallet
          </Button>
        </div>
      </div>

      {/* Wallet List */}
      <AnimatePresence>
        <div className="grid gap-5">
          {wallet &&
            wallet[selectedCoinType!]?.map((walletDetails, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md shadow-lg overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-purple-500/10 opacity-100 transition" />

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-3">

                  {/* Title */}
                  <h2 className="font-semibold text-2xl flex items-center gap-2">
                    <Key className="text-cyan-400 " size={18} />
                    Wallet {index + 1}
                  </h2>

                  {/* Public Key */}
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Public Key</p>
                    <p className="text-sm break-all text-cyan-100 flex items-center gap-3">
                      {walletDetails.publicKey.toString()} <Copy className="cursor-pointer w-6 h-6"></Copy>
                    </p>
                  </div>

                  {/* Private Key */}
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Private Key</p>

                    <Input
                      type="password"
                      value={walletDetails.privateKey.toString()}
                      readOnly
                      className="bg-black/40 border-white/10 focus:border-cyan-400 transition"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default WalletDisplayArea;