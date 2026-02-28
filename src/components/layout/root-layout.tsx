import type { ReactNode } from "react";
import Navbar from "../common/navbar";
import Footer from "../common/footer";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      <div className="w-full h-full">{children}</div>
      <Footer></Footer>
    </>
  );
};

export default RootLayout;
