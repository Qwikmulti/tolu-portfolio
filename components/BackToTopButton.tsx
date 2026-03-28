"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
          className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-navy/90 hover:bg-navy backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/10 transition-all duration-300 hover:scale-110 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
          <span className="absolute left-full ml-3 bg-charcoal text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
