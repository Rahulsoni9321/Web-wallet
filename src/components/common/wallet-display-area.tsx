import { useWalletContext } from "@/context/wallet-context";
import { Button } from "../ui/button";
import { PlusCircle, Trash, Wallet } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import WalletCard from "./wallet-card";

const WalletDisplayArea = () => {
  const { selectedCoinType, wallet, createWallet } = useWalletContext();

  return (
    <div className="rounded-3xl p-6  text-white flex flex-col gap-8">
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
        <div className="grid grid-cols-3 gap-5">
          {wallet &&
            wallet[selectedCoinType!]?.map((walletDetails, index: number) => (
              <WalletCard
                index={index}
                   //@ts-ignore
                walletDetails={walletDetails}
                // privateKey={walletDetails.privateKey.toString()}
                // publicKey={walletDetails.publicKey.toString()}
              />
            ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default WalletDisplayArea;
