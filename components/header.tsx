"use client";
import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: { title: string; href: string }[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: { title: string; href: string }[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <a
                                    href={item.href}
                                    key={item.title}
                                    className="flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 py-2 font-semibold text-lg"
                                >
                                    {item.title}
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
            >
                <span className="text-neutral-500 dark:text-neutral-400 text-xl">≡</span>
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: { title: string; href: string }[];
    className?: string;
}) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden items-end gap-4 rounded-2xl px-4 pb-3 md:flex",
                className,
            )}
        >
            {items.map((item) => (
                <TextDockItem mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

// Componente animado apenas para texto
function TextDockItem({
    mouseX,
    title,
    href,
}: {
    mouseX: MotionValue;
    title: string;
    href: string;
}) {
    let ref = useRef<HTMLDivElement>(null);

    // Efeito dock animado (apenas altura)
    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Remova a animação do width!
    // let widthTransform = useTransform(distance, [-150, 0, 150], [150, 180, 150]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [30, 50, 30]);
    let fontSizeTransform = useTransform(distance, [-150, 0, 150], [18, 28, 18]);

    // let width = useSpring(widthTransform, { ... });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let fontSize = useSpring(fontSizeTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <a href={href}>
            <motion.div
                ref={ref}
                // Remova o width do style!
                style={{ height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={cn(
                    "relative flex items-center justify-around rounded-md hover:bg-preto-secundario duration-100 px-12 py-2",
                    hovered ? "shadow-lg" : ""
                )}
            >
                <motion.span
                    style={{
                        fontSize,
                        fontWeight: hovered ? 700 : 500,
                        background: hovered ? "linear-gradient(90deg,#4EFFEA,#4EA4FF,#6C4EFF)" : "none",
                        WebkitBackgroundClip: hovered ? "text" : "unset",
                        WebkitTextFillColor: hovered ? "transparent" : "",
                        transition: "all 0.2s",
                    }}
                    className="select-none text-branco"
                >
                    {title}
                </motion.span>
            </motion.div>
        </a>
    );
}
