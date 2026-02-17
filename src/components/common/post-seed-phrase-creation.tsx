import { supportedCoins } from "@/config/seed-phrase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { useWalletContext } from "@/context/wallet-context"
import type { coinType } from "@/types/wallets.type";

const PostSeedPhraseCreation = () => {

    const { setSelectedCoinType } = useWalletContext();

    return (
        <div className="w-full">
            <Tabs defaultValue="" onValueChange={(value) => setSelectedCoinType(value as coinType)}>
                <TabsList variant={"line"}>
                    {
                        supportedCoins.map((coins: string) => {
                            return <TabsTrigger value={coins}>{coins}</TabsTrigger>
                        })
                    }
                </TabsList>
                <TabsContent value="SOLANA">
                    <div>Solana</div>
                </TabsContent>
                <TabsContent value="ETHEREUM">
                    <div>Ethereum</div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default PostSeedPhraseCreation