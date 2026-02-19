import { useWalletContext } from "@/context/wallet-context"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle, Trash } from "lucide-react";

const WalletDisplayArea = () => {
    const { selectedCoinType, wallet, createWallet } = useWalletContext();
    console.log("this is the wallet.",wallet);
    return (
        <div className="rounded-2xl p-4 bg-neutral-800 text-white">
            <div className="flex justify-end gap-4 items-center">
            <Button variant={"outline"} onClick={createWallet} className="text-black cursor-pointer flex items-center gap-2"><PlusCircle></PlusCircle>Add Wallet</Button>
            <Button variant={"destructive"} onClick={createWallet}className=" flex items-center gap-2"><Trash></Trash>Clear Wallet</Button>
            </div>
            {(wallet && wallet[selectedCoinType!]) &&
                wallet[selectedCoinType!]?.map((walletDetails, index: number) => {
                    return <div className="flex flex-col gap-3 items-start">
                        <h1 className="flex items-center gap-2c text-3xl font-semibold">Wallet {index + 1}</h1>
                        <p>Public Key :- {walletDetails.publicKey.toString()}</p>
                        <Input type={"password"} value={walletDetails.privateKey.toString()}></Input>
                    </div>
                })
            }

        </div>
    )
}

export default WalletDisplayArea