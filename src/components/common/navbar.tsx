import { servicesList } from "@/config/seed-phrase";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { MoonIcon, Sun } from "lucide-react";

const Navbar = () => {
  return (
    <div className="top-0 fixed  h-16 shadow bg-linear-to-r from-transparent via-transparent to-cyan-500/20 backdrop-blur-3xl w-full text-white flex items-center justify-between px-8 z-50">
      <h1 className="text-2xl flex gap-1 items-center font-(--font-satoshi)">
        <img src="/logo.png" className="w-28 h-20"></img>Mnemonic
        <span className="font-(--font-satoshi) text-transparent bg-clip-text bg-linear-to-tr from-cyan-500 to-violet-600">
          X
        </span>
      </h1>
      <div className="flex items-center gap-8">
        {servicesList.map((details) => {
          return (
            <a href={details.href} className="flex items-center  gap-1 cursor-pointer">
              <details.icon></details.icon>
              {/* <img src={details.imgPath} className="w-20 h-20"></img> */}
              <Label>{details.label}</Label>
            </a>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <Sun /> <Switch size="default" color="blue" className=""></Switch>{" "}
        <MoonIcon></MoonIcon>
      </div>
    </div>
  );
};

export default Navbar;
