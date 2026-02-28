import { footerLink } from "@/config/seed-phrase";
import { Globe, Linkedin, X } from "lucide-react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full h-12 bg-linear-to-r from-cyan-500/40 via-transparent to-transparent">
      <div className=" bg-black/50 backdrop-blur-3xl h-full dark:bg-black text-white dark:text-white flex justify-between px-6 items-center">
        <p>
          Designed and Developed by{" "}
          <b>
            <i>Rahul Soni</i>
          </b>
        </p>
        <div className="flex gap-2 items-center">
          {
            footerLink.map((details) => {
              return <a
                href={details.href}
                target="_blank"
              >
                <details.icon className={details.iconClass} />
              </a>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Footer;
