"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";
import { ThemeToggle } from "@/app/components/ThemeToggle";

interface BlogNavbarProps {
  onOpenDownloadModal: () => void;
  onOpenWebinarModal: () => void;
}

export function BlogNavbar({ onOpenDownloadModal, onOpenWebinarModal }: BlogNavbarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 shadow-2xl backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Back + Logo */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                aria-label="Back to homepage"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 group-hover:border-white/40 group-hover:bg-white/5 transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </span>
                <span className="hidden sm:inline text-sm font-medium">Back to Home</span>
              </motion.button>

              <div className="w-px h-6 bg-white/10 hidden sm:block" />

              <motion.span
                className="font-cormorant text-xl sm:text-2xl font-bold text-white tracking-wide"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {BRAND.name}
              </motion.span>
            </div>

            {/* Desktop Right: Theme + CTAs */}
            <motion.div
              className="hidden md:flex items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <ThemeToggle />
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white text-sm rounded-full px-5 gap-2"
                onClick={onOpenWebinarModal}
              >
                <Users className="w-4 h-4" />
                Join Community
              </Button>
              <Button
                className="bg-gold hover:bg-gold/90 text-navy font-semibold text-sm rounded-full px-5 gap-2 shadow-lg shadow-gold/20"
                onClick={onOpenDownloadModal}
              >
                <Download className="w-4 h-4" />
                Free Guide
              </Button>
            </motion.div>

            {/* Mobile: Logo + Hamburger */}
            <div className="flex items-center gap-3 md:hidden">
              <span className="font-cormorant text-lg font-bold text-white tracking-wide">
                Blog
              </span>
              <button
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy flex flex-col items-center justify-center"
          >
            <motion.button
              className="absolute top-6 right-6 text-white/60 hover:text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <div className="flex flex-col items-center gap-8">
              <motion.button
                onClick={() => { setMobileOpen(false); router.push("/"); }}
                className="flex items-center gap-3 text-3xl font-cormorant text-white/80 hover:text-gold transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ArrowLeft className="w-6 h-6" />
                Back to Home
              </motion.button>

              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-base rounded-full px-8 gap-2"
                  onClick={() => { setMobileOpen(false); onOpenWebinarModal(); }}
                >
                  <Users className="w-4 h-4" />
                  Join Community
                </Button>
                <Button
                  className="bg-gold hover:bg-gold/90 text-navy font-semibold text-base rounded-full px-8 gap-2 shadow-lg shadow-gold/20"
                  onClick={() => { setMobileOpen(false); onOpenDownloadModal(); }}
                >
                  <Download className="w-4 h-4" />
                  Free Guide
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
