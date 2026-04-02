"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  href?: string;
  accentColor: "gold" | "electric" | "green" | "rose";
  delay?: number;
}

const colorMap = {
  gold: {
    bg: "bg-amber-50",
    border: "hover:border-amber-200",
    icon: "text-amber-500",
    glow: "group-hover:shadow-amber-100",
  },
  electric: {
    bg: "bg-blue-50",
    border: "hover:border-blue-200",
    icon: "text-blue-500",
    glow: "group-hover:shadow-blue-100",
  },
  green: {
    bg: "bg-emerald-50",
    border: "hover:border-emerald-200",
    icon: "text-emerald-500",
    glow: "group-hover:shadow-emerald-100",
  },
  rose: {
    bg: "bg-rose-50",
    border: "hover:border-rose-200",
    icon: "text-rose-500",
    glow: "group-hover:shadow-rose-100",
  },
};

export function StatCard({ label, value, icon, href, accentColor, delay = 0 }: StatCardProps) {
  const colors = colorMap[accentColor];

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="group bg-white rounded-2xl p-6 border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-stone-400 text-xs font-medium uppercase tracking-widest mb-3">
            {label}
          </p>
          <p className="font-display text-4xl font-bold text-navy tracking-tight">
            {value.toLocaleString()}
          </p>
        </div>
        <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${colors.icon}`}>
          {icon}
        </div>
      </div>

      {href && (
        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-stone-400 group-hover:text-stone-600 transition-colors">
          <span>View details</span>
          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
