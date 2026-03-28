"use client";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

const VIDEOS = [
  {
    title: "What Does a Business Analyst Actually Do?",
    views: "12K views",
    time: "3 days ago",
    duration: "10:24",
  },
  {
    title: "How to Write Your First BRD (Step-by-Step)",
    views: "8.5K views",
    time: "1 week ago",
    duration: "15:32",
  },
  {
    title: "Top 5 BA Tools You Should Be Using in 2025",
    views: "15K views",
    time: "2 weeks ago",
    duration: "12:18",
  },
];

export function YouTubeSection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric via-gold to-electric" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-electric text-sm font-semibold tracking-[0.2em] uppercase">YouTube Channel</span>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-bold text-navy mt-3">
            Watch & Learn for Free
          </h2>
          <p className="text-charcoal/50 mt-4 max-w-xl mx-auto">
            Free tutorials, career advice, and BA skills content on my YouTube channel.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {VIDEOS.map((video, i) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-charcoal/5 hover:border-electric/20 transition-all duration-300 shadow-sm hover:shadow-xl">
                {/* Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-navy to-charcoal overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                    {video.duration}
                  </span>
                  {/* YouTube icon watermark */}
                  <div className="absolute top-3 right-3 w-6 h-6 text-white/20">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-semibold text-navy text-sm mb-2 line-clamp-2 group-hover:text-electric transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-charcoal/40">
                    <span>{video.views}</span>
                    <span className="w-1 h-1 rounded-full bg-charcoal/20" />
                    <span>{video.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-navy hover:bg-navy/90 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg shadow-navy/20"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Visit My Channel
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
