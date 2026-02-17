import { useWalletContext } from "@/context/wallet-context"

const WalletDisplayArea = () => {
    const { selectedCoinType} = useWalletContext();
    return (
        <div>WalletDisplayArea</div>
    )
}

export default WalletDisplayArea