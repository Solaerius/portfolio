"use client";
import { useState, useEffect, useRef, useMemo } from "react";

interface Command {
  id: string;
  label: string;
  hint: string;
  section?: string;
  external?: string;
}

const commands: Command[] = [
  { id: "about", label: "Open About", hint: "about", section: "about" },
  { id: "projects", label: "Open Projects", hint: "projects", section: "projects" },
  { id: "contact", label: "Open Contact", hint: "contact", section: "contact" },
  { id: "github", label: "Open GitHub", hint: "github", external: "https://github.com/solaerius" },
  { id: "resume", label: "Download Resume", hint: "resume", external: "/resume.pdf" },
];

export default function useCommandPalette(onRun?: (section: string) => void) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true); 
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.includes(q)
    );
  }, [query]);

  const run = (cmd: Command) => {
    setOpen(false);
    setQuery("");
    if (cmd.external) window.open(cmd.external, "_blank");
    else if (cmd.section) onRun?.(cmd.section);
  };

  return { open, setOpen, query, setQuery, inputRef, filtered, run };
}
