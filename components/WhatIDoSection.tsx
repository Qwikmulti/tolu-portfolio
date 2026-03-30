"use client";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users } from "lucide-react";

const SERVICES = [
  {
    icon: GraduationCap,
    title: "BA Training",
    description:
      "Learn how Business Analysis works in real projects — not just theory. Build the skills, confidence, and understanding needed to transition into a BA role.",
    tag: "Join Free Webinar",
    link: "https://payhip.com/b/REf5s",
  },
  {
    icon: BookOpen,
    title: "Downloadable guides, templates...",
    description:
      "Access real BA templates, examples, and frameworks used in the industry — so you can understand how the role works in practice.",
    tag: "Get Free Toolkit",
    link: "https://payhip.com/b/Y3J97",
  },
  {
    icon: Users,
    title: "“A vibrant space to learn...”",
    description:
      "Get support, guidance, and clarity from others on the same journey — and learn directly from real-world Business Analysis experience",
    tag: "Join Community",
    link: "https://www.skool.com/practical-ba-community-9272",
  },
];

export function WhatIDoSection() {
  return (
    <section className="py-28 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-electric text-sm font-semibold tracking-[0.2em] ">
            Choose your starting point — whether you want to learn the basics,
            access practical tools, or get full support in your BA journey.
          </span>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-bold text-navy mt-3">
            How You Can Become a Business Analyst
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-charcoal/5 relative overflow-hidden">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-electric/10 to-electric/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-electric" />
                  </div>

                  <span className="text-xs font-semibold text-electric/60 tracking-widest uppercase mb-3 block">
                    {service.tag}
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-navy mb-4">
                    {service.title}
                  </h3>
                  <p className="text-charcoal/60 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-charcoal/5">
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric text-sm font-medium group-hover:translate-x-2 inline-flex items-center gap-2 transition-transform duration-300"
                    >
                      Learn more 
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
