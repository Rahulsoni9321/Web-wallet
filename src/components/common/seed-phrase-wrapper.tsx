import { cn } from "@/lib/utils";
import {
    motion,
    type TargetAndTransition,
    type Transition,
} from "framer-motion";
import { ChevronDown, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SeedPhraseWrapper({ seedPhrase }: { seedPhrase: string[] }) {
    const [seedDisplay, setSeedDisplay] = useState(false);
    const initial: TargetAndTransition = { opacity: 0 };
    const animate: TargetAndTransition = { opacity: 100 };
    const transition: Transition = { damping: 10, stiffness: 100, duration: 1 };

    const handleCopy = () => {
        const seedPhraseString = seedPhrase.join(" ");
        navigator.clipboard.writeText(seedPhraseString);
        toast.success("seed phrase copied successfully.", {
            position: "bottom-right"
        })
    };

    return (
        <motion.div
            onClick={handleCopy}
            initial={initial}
            animate={animate}
            transition={transition}
            className="px-5 py-8 w-full border border-neutral-800 shadow rounded-xl"
        >
            <div className="flex flex-col gap-10 items-start">
                <div className="flex justify-between items-center px-6 mb-4 w-full">
                    <p className="text-5xl font-bold text-white font-sans ">
                        Seed Phrase
                    </p>
                    <ChevronDown
                        onClick={(e) => {
                            e.stopPropagation();
                            setSeedDisplay(!seedDisplay)}
                        }
                        className={cn(
                            "text-white cursor-pointer hover:scale-110 ease-in-out duration-100 hover:bg-gray-300/20 rounded-full",
                            { "rotate-180": seedDisplay },
                        )}
                    ></ChevronDown>
                </div>
                {seedPhrase && seedDisplay && (
                    <div className="grid grid-cols-4 gap-6 w-full">
                        {seedPhrase.map((details, index) => {
                            return (
                                <motion.button
                                    initial={{
                                        y: 20,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        y: 0,
                                        opacity: 100,
                                    }}
                                    transition={{
                                        duration: index / 8,
                                    }}
                                    className="px-4 py-3 max-w-50 rounded-md bg-neutral-800/50 backdrop-blur-2xl font-thin font-serif text-md text-white shadow"
                                >
                                    {details}
                                </motion.button>
                            );
                        })}
                    </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Copy></Copy> Click anywhere to copy
                </div>
            </div>
        </motion.div>
    );
}
