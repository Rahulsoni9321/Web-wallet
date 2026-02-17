import { supportedCoins } from "@/config/seed-phrase"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

const PostSeedPhraseCreation = () => {
    return (
        <div className="w-full">
            
            <Tabs>
                <TabsList>
                {
                    supportedCoins.map((coins: string) => {
                        return <TabsTrigger value={coins}>{coins}</TabsTrigger>
                    })
                } 
                </TabsList>
            </Tabs>
                {/* <TabsTrigger va></TabsTrigger> */}
        </div>
    )
}

export default PostSeedPhraseCreation