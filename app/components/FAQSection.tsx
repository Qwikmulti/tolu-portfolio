"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Who is this community for?",
    a: "The Practical BA Community is for aspiring Business Analysts, career switchers, and even experienced BAs looking to sharpen their skills. Whether you're starting from zero or want to level up, you're welcome here.",
  },
  {
    q: "Is the community really free?",
    a: "Yes! The core community membership is completely free. We also offer premium toolkits and training programmes for those who want to go deeper.",
  },
  {
    q: "How can I land my first BA role with no experience?",
    a: "Start with our free BA Starter Guide, build real-world skills through our templates, and network within the community. Many of our members have transitioned from admin, project support, or completely different fields into BA roles.",
  },
  {
    q: "What sectors does Tolu have experience in?",
    a: "Tolulope has worked across Finance, Insurance, Pensions, and Government sectors — all highly regulated environments where strong business analysis is critical.",
  },
  {
    q: "How do I join the community?",
    a: "Simply fill out the join form on this page! You'll receive a welcome email with next steps and access to our free resources immediately.",
  },
  {
    q: "Do you offer mentorship?",
    a: "We are working on a formal mentorship programme. Join the community to be the first to know when it launches!",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-charcoal/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-navy group-hover:text-electric transition-colors pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-charcoal/30 group-hover:text-electric transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-charcoal/60 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="py-24 bg-soft-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-electric text-sm font-semibold tracking-[0.2em] uppercase">FAQ</span>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-navy mt-3">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-charcoal/5"
        >
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
