"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Command, TerminalSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import useCommandPalette from "./hooks/useCommandPalette";

interface CommandPaletteProps {
  onCommand?: (section: string) => void;
}

export default function CommandPalette({ onCommand }: CommandPaletteProps) {
  const { open, setOpen, query, setQuery, inputRef, filtered, run } =
    useCommandPalette(onCommand);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
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

  // Close on Enter
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
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/30 backdrop-filter backdrop-blur-2xl backdrop-saturate-150 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed top-[30px] left-1/2 -translate-x-1/2 z-[100] w-full max-w-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <motion.div
                ref={overlayRef}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden"
              >
                <div className="px-5 py-3 border-b border-zinc-800 flex items-center">
                  <TerminalSquare className="w-4 h-4 text-zinc-500 mr-3" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command… (about, projects, contact, github, resume)"
                    className="w-full bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500 text-base leading-6"
                    autoFocus
                  />
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {filtered.length > 0 ? (
                    filtered.map((cmd) => (
                      <button
                        key={cmd.id}
                        onClick={() => run(cmd)}
                        className="w-full text-left px-5 py-3 hover:bg-zinc-900/70 transition flex items-center gap-3"
                      >
                        <TerminalSquare className="w-4 h-4 text-zinc-400" />
                        <div className="flex-1">
                          <div className="text-zinc-100">{cmd.label}</div>
                          <div className="text-xs text-zinc-500">
                            {cmd.hint}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-5 py-4 text-zinc-500 text-sm">
                      No matching commands
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
