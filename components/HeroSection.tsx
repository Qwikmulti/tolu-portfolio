"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/constants";

interface HeroSectionProps {
  onOpenDownloadModal: () => void;
}

const WORDS = ["Your", "BA", "Career", "Starts", "Here."];

export function HeroSection({ onOpenDownloadModal }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-navy">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 15% 50%, rgba(37,99,235,0.4) 0%, transparent 55%)",
              "radial-gradient(ellipse at 85% 30%, rgba(37,99,235,0.3) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 80%, rgba(245,158,11,0.25) 0%, transparent 45%)",
              "radial-gradient(ellipse at 15% 50%, rgba(37,99,235,0.4) 0%, transparent 55%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-10">
            {/* Eyebrow */}
            {/* <motion.div
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-sm font-medium tracking-[0.2em] uppercase">Senior Business Analyst · 6+ Years</span>
            </motion.div> */}

            {/* Animated headline */}
            <div>
              <motion.h1
                className="font-cormorant text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
                }}
              >
                {WORDS.map((word) => (
                  <motion.span
                    key={word}
                    className="inline-block mr-6"
                    variants={{
                      hidden: { opacity: 0, y: 60, rotate: -3 },
                      visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <motion.p
              className="text-lg text-white/60 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7 }}
            >
              I help aspiring Business Analysts build real skills, land their first role, and grow with confidence.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Button
                className="bg-gold hover:bg-gold/90 text-navy font-semibold text-base rounded-full px-8 h-12 shadow-xl shadow-gold/25"
                onClick={onOpenDownloadModal}
              >
                Get Free BA Guide
              </Button>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
                  <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </span>
                <span className="text-sm font-medium">Watch on YouTube</span>
              </a>
            </motion.div>

            {/* Floating credential badge */}
            <motion.div
              className="inline-flex items-center gap-3 bg-white/[0.06] backdrop-blur-xl rounded-full px-5 py-3 border border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <span className="relative flex w-2.5 h-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-green-400"></span>
              </span>
              <span className="text-sm text-white/70 font-medium">
                Finance · Insurance · Government · Author
              </span>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-br from-electric/30 to-gold/20 rounded-full blur-2xl" />
              {/* Main image container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric to-gold opacity-20 blur-3xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                  <Image
                    src="/tolu1.jpg"
                    alt="Tolulope - Practical BA"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-2 rounded-full border border-white/10" />
              </div>
              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-charcoal/80 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/10 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <p className="text-gold text-2xl font-bold font-cormorant">1,000+</p>
                <p className="text-white/50 text-xs">Community Members</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-soft-white to-transparent" />
    </section>
  );
}
