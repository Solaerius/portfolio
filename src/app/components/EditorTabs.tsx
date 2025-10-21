"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, FC } from "react";
import { Mail, Github, ExternalLink } from "lucide-react";

const PROJECTS = [
    { title: "Tears of Iron — Strategy Game", description: "...", stack: ["Lua", "Roblox", "OOP", "DataStore"], github: "...", stars: 48 },
];

export default function EditorTabs({externalTab, onTabChange}: {externalTab?: string; onTabChange?: (tab:string) => void; }) {
    const [tab, setTab] = useState<"about" | "projects" | "contact">((externalTab as any) || "about");
    useEffect(() => {
        if (externalTab && externalTab !== tab) setTab(externalTab as any);
    }, [externalTab]);

    const changeTab = (t: "about" | "projects" | "contact") => {
        setTab(t);
        onTabChange?.(t);
    };

    return (
        <div className="mt-10 w-full max-w-5xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto">
                {(["about", "projects", "contact"] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => changeTab(t)}
                        className={
                            "px-3 py-2 rounded-t-lg border-x border-t text-sm" + 
                            (tab === t
                                ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                                : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-zinc-200")
                        }
                        >{t}.tsx</button>
                ))}
                <div className="flex-1 border-b border-zinc-800"/>
            </div>

            <div className="border border-zinc-800 rouded-b-xl rounded-tr-xl bg-zinc-950/60">
                <AnimatePresence mode="wait">
                    {tab === "about" && (
                        <motion.div
                            key="about"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3}}
                            className="p-6 text-zinc-300"
                        >
                            <p className="text-lg leading-relaxed">
                                I'm Eddie, a software engineer who loves building interactive 
                                systems, smooth UIs, and data-driven tools. I enjoy creating 
                                experiences that feel alive, expressive, and performant.
                            </p>

                            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                {/* Will be added when techlist function has been created:
                                <TechList title="Languages" items={["TypeScript", "Java", "Python", "C#"]} />
                                TechList title="Frameworks" items={["Next.js", "React"]} />
                                TechList title="Tools" items={["Tailwind", "Framer Motion", "Git"]} />
                                TechList title="Focus" items={["UX polish", "Real-Time data", "Performance", "Interactivity"]} /> */}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}