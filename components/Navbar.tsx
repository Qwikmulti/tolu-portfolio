"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { ThemeToggle } from "@/app/components/ThemeToggle";

interface NavbarProps {
  onOpenDownloadModal: () => void;
  onOpenWebinarModal: () => void;
}

export function Navbar({ onOpenDownloadModal, onOpenWebinarModal }: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "resources", "community", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Handle internal routes like /blog
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    // Handle section anchors like #about
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 shadow-2xl backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.span
              className="font-cormorant text-2xl font-bold text-white tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {BRAND.name}
            </motion.span>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors relative py-2 group ${
                    activeSection === link.href.replace("#", "")
                      ? "text-gold"
                      : "text-white/70 hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gold rounded-full transition-all duration-300 ${
                    activeSection === link.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <ThemeToggle />
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white text-sm rounded-full px-5"
                  onClick={onOpenWebinarModal}
                >
                  Join Community
                </Button>
                <Button
                  className="bg-gold hover:bg-gold/90 text-navy font-semibold text-sm rounded-full px-6 shadow-lg shadow-gold/20"
                  onClick={onOpenDownloadModal}
                >
                  Free Guide
                </Button>
              </motion.div>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
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
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-3xl font-cormorant text-white/80 hover:text-gold transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Button
                  className="bg-gold hover:bg-gold/90 text-navy font-semibold rounded-full px-8 mt-4"
                  onClick={() => { setMobileOpen(false); onOpenDownloadModal(); }}
                >
                  Download Free Guide
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
