"use client";
import { motion } from "framer-motion";

const ITEMS = [
  "Senior BA", "6+ Years", "Finance", "Insurance", "Pensions",
  "Government", "Author", "YouTube Educator", "Community Builder",
  "Published Toolkit Author",
];

export function MarqueeBanner() {
  const items = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="bg-navy py-5 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy to-transparent z-10" />

      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 shrink-0">
            <span className="text-gold font-semibold text-sm tracking-wide">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold/40 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
