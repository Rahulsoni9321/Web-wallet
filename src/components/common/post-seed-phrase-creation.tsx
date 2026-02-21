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
        className="rounded-2xl bg-neutral-700/40 backdrop-blur-3xl shadow-2xl p-8"
        onValueChange={(value) => setSelectedCoinType(value as coinType)}
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
          transition-all"
            >
              {coins}
            </TabsTrigger>
          ))}
        </TabsList>

        {supportedCoins.map((coins: string) => (
          <TabsContent key={coins} value={coins}>
            <WalletDisplayArea />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PostSeedPhraseCreation;
