"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedListProps {
  children: ReactNode;
  empty?: ReactNode;
  itemClassName?: string;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2 } },
};

export function AnimatedList({ children, empty, itemClassName = "" }: AnimatedListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-3"
    >
      <AnPresenceCheck>
        {children}
      </AnPresenceCheck>
    </motion.div>
  );
}

// Internal component to handle AnimatePresence for exit animations
function AnPresenceCheck({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ListItem({
  children,
  className = "",
  isRead = false,
}: {
  children: ReactNode;
  className?: string;
  isRead?: boolean;
}) {
  return (
    <motion.div
      variants={item}
      className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-md hover:-translate-y-px ${isRead ? "border-stone-100" : "border-amber-200/60 shadow-sm"} ${className}`}
    >
      {children}
    </motion.div>
  );
}
