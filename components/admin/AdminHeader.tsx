"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  badge?: string;
}

export function AdminHeader({ title, subtitle, action, badge }: AdminHeaderProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-display text-3xl font-bold text-navy tracking-tight">
            {title}
          </h1>
          {badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-500 text-xs font-medium">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-stone-400 text-sm">{subtitle}</p>
        )}
      </div>
      {action && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
