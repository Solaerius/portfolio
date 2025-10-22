"use client";

import { motion } from "framer-motion";

export default function Availability({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <motion.span
        className="relative inline-flex"
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: [0.95, 1, 0.95], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(16,185,129,0.6)]" />
      </motion.span>
      <span className="text-zinc-200">{text}</span>
    </div>
  );
}
