import "./index.css";

import { Outlet, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/root-layout";
import SwapRoutes from "./routes/swap.routes";
import WalletCreationRoute from "./routes/wallet-creation.routes";
import HeroSection from "./components/common/hero-section";

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RootLayout>
            <Outlet></Outlet>
          </RootLayout>
        }
      >
        <Route path="/" element={<HeroSection></HeroSection>}></Route>
        {SwapRoutes()}
        {WalletCreationRoute()}
      </Route>
    </Routes>
  );
}

export default App;
