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
            </div>
        </div>
    )
}