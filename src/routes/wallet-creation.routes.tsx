import WalletCreation from "@/page/wallet-creation"
import { Route } from "react-router-dom"

const WalletCreationRoute = () => {
  return (
    <>
  <Route path="/generate-wallet" element={<WalletCreation></WalletCreation>}></Route>
    </>
  )
}

export default WalletCreationRoute