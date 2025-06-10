"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children?: ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <div
            className={cn(
                "transition-bg relative flex h-full w-full flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900 overflow-hidden",
                className,
            )}
            {...props}
        >
            <div
                className="absolute inset-0 overflow-hidden"
                style={{
                    "--aurora":
                        "repeating-linear-gradient(100deg,#4EFFEA_10%,#4EA4FF_30%,#6C4EFF_50%,#5B6EFF_70%,#4EFFEA_90%)",
                    "--dark-gradient":
                        "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
                    "--white-gradient":
                        "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
                    "--verde": "#4EFFEA",
                    "--azul": "#4EA4FF",
                    "--roxo": "#6C4EFF",
                    "--roxo-medio": "#5B6EFF", // tom intermediário entre azul e roxo
                    "--black": "#000",
                    "--white": "#fff",
                    "--transparent": "transparent",
                } as React.CSSProperties}
            >
                <div
                    className={cn(
                        `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--verde)_10%,var(--azul)_30%,var(--roxo)_50%,var(--roxo-medio)_70%,var(--verde)_90%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

                        showRadialGradient &&
                        `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
                    )}
                ></div>
            </div>
            <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
                {children}
            </div>
        </div>
    );
};
