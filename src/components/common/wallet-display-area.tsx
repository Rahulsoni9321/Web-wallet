import { useWalletContext } from "@/context/wallet-context"
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const WalletDisplayArea = () => {
    const { selectedCoinType, wallet, createWallet } = useWalletContext();
    return (
        <div className="rounded-2xl p-4 bg-neutral-800 text-white">
            <Button variant={"default"} onClick={createWallet}>Add Wallet</Button>
            {(wallet && wallet[selectedCoinType!]) &&
                wallet[selectedCoinType!]?.map((walletDetails, index: number) => {
                    return <div className="flex flex-col gap-3 items-center">
                        <h1 className="flex items-center gap-2">Wallet {index + 1}</h1>
                        {walletDetails.publicKey.toString()}
                        <Input type={"password"} value={walletDetails.privateKey.toString()}></Input>
                    </div>
                })
            }

        </div>
    )
}

export default WalletDisplayArea