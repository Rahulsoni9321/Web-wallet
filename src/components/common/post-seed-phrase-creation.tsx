import { supportedCoins } from "@/config/seed-phrase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useWalletContext } from "@/context/wallet-context";
import type { coinType } from "@/types/wallets.type";
import WalletDisplayArea from "./wallet-display-area";

const PostSeedPhraseCreation = () => {
  const { setSelectedCoinType } = useWalletContext();

  return (
    <div className="w-full">
      <Tabs
      defaultValue="SOLANA"
        className="rounded-2xl bg-neutral-900/40 backdrop-blur-3xl shadow-2xl p-8 w-full "
        onValueChange={(value) => {
          setSelectedCoinType(value as coinType);
          localStorage.setItem('coinType',value);
        }}
      >
        <TabsList variant={"line"} className="text-white">
          {supportedCoins.map((coins: string) => (
            <TabsTrigger
              key={coins}
              value={coins}
              className="
          text-xl cursor-pointer
          text-gray-400
          data-[state=active]:text-white
          data-[state=active]:underline-offset-8
          transition-all flex items-center gap-2"
            >
              <img src={coins === "SOLANA" ? "/solana-logo.png" : "/Ethereum-Logo.png" }className="w-10 h-10"></img>
              {coins}
            </TabsTrigger>
          ))}
        </TabsList>

        {supportedCoins.map((coins: string) => (
          <TabsContent key={coins} value={coins} className="mt-8">
            <WalletDisplayArea />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PostSeedPhraseCreation;
