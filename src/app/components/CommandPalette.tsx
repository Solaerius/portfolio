"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Command, TerminalSquare } from "lucide-react";
import { useEffect, useEffectEvent, useRef } from "react";
import useCommandPalette from "./hooks/useCommandPalette";

interface CommandPalatteProps {
    onCommand?: (section: string) => void;
}

export default function CommandPalatte({ onCommand }: CommandPalatteProps) {
    const { open, setOpen, query, setQuery, inputRef, filtered, run } = 
        useCommandPalette(onCommand);

    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                open &&
                overlayRef.current &&
                !overlayRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    useEffect(() => {
        function handleEnter(e: KeyboardEvent) {
            if (open && e.key === "Enter") setOpen(false);
        }
        window.addEventListener("keydown", handleEnter);
        return () => window.removeEventListener("keydown", handleEnter);
    }, [open]);

    return (
    <>
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-lg px-3 py-1.5 cursor-pointer backdrop-blur-md"
        >
          <Command className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
          <span className="text-sm text-zinc-400 group-hover:text-zinc-200 truncate">
            Press Ctrl / ⌘ + K or click to open
          </span>
        </div>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/60 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={overlayRef}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl"
            >
              <div className="px-4 py-3 border-b border-zinc-800 flex items-center">
                <TerminalSquare className="w-4 h-4 text-zinc-500 mr-2" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command… (about, projects, contact, github, resume)"
                  className="w-full bg-transparent outline-none text-zinc-200 placeholder:text-zinc-500"
                />
              </div>
              <div className="max-h-80 overflow-y-auto">
                {filtered.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => run(cmd)}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-900 flex items-center gap-3"
                  >
                    <TerminalSquare className="w-4 h-4 text-zinc-400" />
                    <div className="flex-1">
                      <div className="text-zinc-100">{cmd.label}</div>
                      <div className="text-xs text-zinc-500">{cmd.hint}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}