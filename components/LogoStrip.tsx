"use client";
import { motion } from "framer-motion";

const COMPANIES = [
  { name: "Deloitte", width: 100 },
  { name: "EY", width: 60 },
  { name: "HSBC", width: 80 },
  { name: "Barclays", width: 90 },
  { name: "Nationwide", width: 110 },
  { name: "Government UK", width: 120 },
];

export function LogoStrip() {
  return (
    <section className="py-12 bg-soft-white border-y border-charcoal/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-charcoal/30 text-xs uppercase tracking-[0.2em] mb-8">
          Trusted by professionals at leading organisations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {COMPANIES.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-charcoal/20 font-cormorant font-bold text-xl sm:text-2xl hover:text-charcoal/40 transition-colors cursor-default select-none"
              style={{ letterSpacing: "0.05em" }}
            >
              {company.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
