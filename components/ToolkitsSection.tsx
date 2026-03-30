"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const TOOLKITS = [
  {
    title: "Business Analysis Requirements Toolkit",
    description:
      "Learn how to gather, document, and structure requirements like a real Business Analyst. Includes practical examples of BRDs, stakeholder analysis, and real projectscenarios.",
    gradient: "from-electric",
    secondary: "to-blue-600",
    accent: "#2563EB",
    tag: "BESTSELLER",
  },
  {
    title: "Practical Requirements Toolkit",
    description:
      "Step-by-step templates, checklists, and real-world examples you can use immediately — so you’re not just learning, but actually doing Business Analysis work.",
    gradient: "from-gold",
    secondary: "to-amber-500",
    accent: "#F59E0B",
    tag: "NEW RELEASE",
  },
];

export function ToolkitsSection() {
  return (
    <section className="py-28 bg-navy relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
            Published Works
          </span>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-bold text-white mt-3">
            Master Business Analysis with Real-World Toolkits
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Practical templates, real examples, and proven frameworks to help
            you understand how Business Analysis actually works — and apply it
            with confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {TOOLKITS.map((tk, i) => (
            <motion.div
              key={tk.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-charcoal rounded-3xl overflow-hidden border border-white/5 relative">
                {/* Gradient cover */}
                <div
                  className={`h-56 bg-gradient-to-br ${tk.gradient} ${tk.secondary} relative overflow-hidden`}
                >
                  {/* Abstract pattern */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />

                  {/* Large watermark text */}
                  <div className="absolute bottom-4 left-6 font-cormorant text-white/15 text-8xl font-bold">
                    BA
                  </div>

                  {/* Tag */}
                  <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {tk.tag}
                  </span>
                </div>

                <div className="p-8">
                  <h3 className="font-cormorant text-2xl font-bold text-white mb-4 leading-tight">
                    {tk.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {tk.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white/30 text-xs">Price</span>
                      <p className="text-white font-semibold">
                        {tk.tag === "BESTSELLER"
                          ? "Available inside my training & community"
                          : "Available inside my training & community"}
                      </p>
                    </div>
                    <button
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all duration-300`}
                      style={{ backgroundColor: tk.accent }}
                    >
                      Get Free Access
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
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
