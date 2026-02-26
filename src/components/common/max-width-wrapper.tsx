import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function MaxWidthWrapper({ children, className }: { children: ReactNode, className?: string }) {
    return <div className={cn('  min-h-screen w-full max-w-8xl  mx-auto my-16 ', className)}>{children}</div>
}