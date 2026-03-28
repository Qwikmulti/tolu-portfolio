"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EVENTS = [
  { year: "2018", text: "Started career as a Junior Business Analyst in Finance" },
  { year: "2020", text: "Promoted to Senior BA — Insurance sector" },
  { year: "2021", text: "Led government transformation programme" },
  { year: "2022", text: "Launched the Practical BA Community" },
  { year: "2023", text: "Published first BA Requirements Toolkit" },
  { year: "2024", text: "Reached 1,000+ community members" },
  { year: "2025", text: "Published second toolkit — Practical Requirements" },
  { year: "2026", text: "Expanding training programmes globally" },
];

export function CareerTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative pl-10">
      {/* Animated vertical line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-charcoal/10">
        <motion.div
          className="w-full bg-gradient-to-b from-electric to-gold origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      {EVENTS.map((event, i) => (
        <motion.div
          key={event.year}
          className="relative mb-10 last:mb-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Timeline dot */}
          <div className="absolute -left-[42px] top-1.5 w-5 h-5 rounded-full bg-electric border-4 border-soft-white shadow-lg shadow-electric/20" />

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-charcoal/5 hover:border-electric/20 transition-colors">
            <span className="text-electric font-bold text-sm">{event.year}</span>
            <p className="text-charcoal/80 mt-1 text-sm leading-relaxed">{event.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
