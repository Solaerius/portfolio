import type { FC } from "react";

interface HeroProps {
    name: string;
    role: string;
    tagline: string;
}

const Hero: FC<HeroProps> = ({name, role, tagline}) => {
    return (
        <div className="relative mx-auto w-full max-w-5xl">
            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from zinc-950 to-zinc-900 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-950/60">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"/>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"/>
                    <span className="w-3 h-3 rounded-full bg-red-500/80"/>
                    <span className="ml-2 text-xs text-zinc-400">
                        terminal  ~/home/{name.toLowerCase()}
                    </span>
                </div>

                <div className="px-6 py-8 font-mono text-zinc-200">
                    <div className="text-zinc-400">$ whoami</div>
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-2">
                        {name.toLowerCase()}
                    </h1>
                    <div className="text-zinc-400 mt-4">$ echo "{role}"</div>
                    <p className="font-mono text-lg sm:text-xl text-zinc-300 mt-1">
                        {role} : {tagline}
                    </p>
                    <div className="text-zinc-400 mt-6">$ ls ./socials</div>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <a 
                            href="https://github.com/solaerius"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 hover:bg-zinc-800/60 transittion"
                        >
                            GitHub
                        </a>
                        <a 
                            href="mailto:eddie@ervenius.com"
                            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 hover:bg-zinc-800/60 transittion"
                        >
                            Email
                        </a>
                        <a 
                            href="/resume.pdf"
                            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 hover:bg-zinc-800/60 transittion"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;