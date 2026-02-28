import Swap from "@/page/swap";
import { Route } from "react-router-dom";

const SwapRoutes = () => {
  return (
    <>
      <Route path="/swap" element={<Swap></Swap>} ></Route>
    </>
  );
};

export default SwapRoutes;
