"use client";
import { useEffect, useRef } from "react";
import { AuroraBackground } from "./background";
import { FloatingDock } from "./header";
import { FlipWords } from "./flipWords";
import { gsap } from "gsap";
import Image from "next/image";

export default function HeroSection() {

    const dockRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.fromTo(
            dockRef.current,
            { opacity: 0, y: -40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1 }
        )
            .fromTo(
                h1Ref.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1 },
                "-=0.5"
            )
            .fromTo(
                pRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1 },
                "-=0.7"
            );
    }, []);

    return (
        <AuroraBackground className="h-screen w-full">
            <div className="text-branco text-2xl fixed top-12 pl-[5%] w-full flex items-center">
                <Image
                    src="images/favicon.svg"
                    alt="CamelSec"
                    width={22}
                    height={22}
                    className="inline-block mr-2"
                />
                Camel<span className="text-branco font-thin">Sec</span>
            </div>
            <div ref={dockRef} id="main-header" className="fixed top-10 w-full flex items-center justify-center">
                <FloatingDock
                    items={[
                        {
                            title: "Vantagens",
                            href: "#",
                        },
                        {
                            title: "Pilares",
                            href: "#",
                        },
                        {
                            title: "Funcionalidades",
                            href: "#",
                        },
                        {
                            title: "Porque nós",
                            href: "#",
                        },
                    ]}
                    desktopClassName="h-12 w-fit z-50 px-12 py-2 bg-branco/5 backdrop-blur-md shadow"
                    mobileClassName=" h-12 z-50 px-12 py-2 bg-branco/5 backdrop-blur-md shadow"
                />
            </div>
            <div className="text-start pl-[5%] w-full flex flex-col items-start">
                <h1 ref={h1Ref} className="text-7xl text-branco pb-8">
                    Sua missão é o cuidado. <br />
                    A nossa é proteger o seu
                    <FlipWords
                        duration={2000}
                        words={[" Paciente.", " Hospital.", " Consultório."]}
                    />
                </h1>
                <p
                    ref={pRef}
                    className="text-start text-branco font-thin text-2xl py-4 px-8 bg-branco/5 rounded-2xl border-neutral-900 backdrop-blur-md shadow">
                    Somos a primeira e única empresa de{" "}
                    <span className="font-normal">cibersegurança</span> do Brasil com
                    foco exclusivo no setor da{" "}
                    <span className="font-normal">saúde</span>.
                </p>
            </div>
        </AuroraBackground>
    );
}



