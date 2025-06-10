import { AuroraBackground } from "./background";
import { FlipWords } from "./flipWords";

export default function HeroSection() {
    return (
        <AuroraBackground className="h-screen w-full">
            <div className="text-start w-full pl-[10%]">
                <h1 className="text-5xl text-branco/65 pb-8">Sua segurança é a <br />segurança do seu<FlipWords
                    duration={2000}
                    words={[" Paciente.", " Hospital.", " Consultório."]}
                />
                </h1>
            </div>
        </AuroraBackground>
    );
}