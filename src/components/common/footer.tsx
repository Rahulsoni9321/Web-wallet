import { footerLink } from "@/config/seed-phrase";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full h-12 bg-linear-to-r from-cyan-500/40 via-transparent to-transparent">
      <div className="bg-black/50 backdrop-blur-3xl h-full dark:bg-black text-white dark:text-white flex justify-between px-6 items-center">
        <p className="text-sm">
          Designed and Developed by{" "}
          <b>
            <i>Rahul Soni</i>
          </b>
        </p>

        <div className="flex gap-1 items-center">
          {footerLink.map((details) => (
            <a
              key={details.id}
              href={details.href}
              target="_blank"
              rel="noopener noreferrer"
              title={details.label}
              className="group relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:bg-white/10"
            >
              <details.icon className={details.iconClass} />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                style={{ background: "rgba(0,0,0,0.75)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {details.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
