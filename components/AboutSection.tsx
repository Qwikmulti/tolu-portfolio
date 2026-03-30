/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// import { CareerTimeline } from "./CareerTimeline";

const VALUES = [
  { title: "6+ Years Experience" },
  { title: "Cross-sector expertise (Finance, Government, etc.)" },
  { title: "Practical, real-world BA training" },
];

// const FUN_FACTS = [
//   { emoji: "🎹", label: "Piano" },
//   { emoji: "🥁", label: "Drums" },
//   { emoji: "📊", label: "6yrs BA" },
//   { emoji: "✍️", label: "Author" },
//   { emoji: "🎓", label: "Educator" },
// ];

const profileBlurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQMEAQUAAAAAAAAAAAAAAQIDBAAFESEGEhMxQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAABAAIR/9oADAMBAAIRAxEAPwC3xPj1ZcLTNlT7hIZlNyVNIaacShKEJACQQQe5J9YxgBjOUZfk7bU1X//2Q==";

export function AboutSection() {
  return (
    <section id="about" className="py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-electric/20 to-gold/10 rounded-3xl blur-2xl opacity-50" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/tolu.jpg"
                  alt="Tolulope"
                  className="object-cover"
                  width={320}
                  height={320}
                  placeholder="blur"
                  blurDataURL={profileBlurDataURL}
                />
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -right-4 lg:right-6 bg-navy/90 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-gold text-3xl font-bold font-cormorant">6+</p>
              <p className="text-white/60 text-xs">Years of BA Experience</p>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-electric text-sm font-semibold tracking-[0.2em] uppercase">
              About Me
            </span>
            <h2 className="font-cormorant text-5xl sm:text-6xl font-bold text-navy mt-3 mb-8">
              From Confusion to Clarity: Meet Your BA Guide
            </h2>

            <div className="space-y-5 text-charcoal/70 leading-relaxed">
              <p>
                I’m a Senior Business Analyst with over{" "}
                <strong className="text-navy">6 years of experience</strong>
                across Finance, Insurance, Pensions, and Government — and I help
                aspiring Business Analysts understand how the role actually
                works in real life, not just theory.
              </p>
              <p>
                I created the Practical BA Community because I know how
                confusing it can feel trying to break into Business Analysis
                without a clear roadmap. Most people are learning theory, but
                still don’t feel confident enough to apply — and that’s exactly
                what I aim to fix.
              </p>
              <p>
                Outside of BA work, I enjoy playing the piano and drums,
                creating content, and sharing practical insights to help others
                grow in their careers
              </p>
              <motion.div
                className="flex flex-wrap items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <Button className="bg-gold hover:bg-gold/90 text-navy font-semibold text-base rounded-full px-8 h-12 shadow-xl shadow-gold/25">
                  Start Your BA Journey
                </Button>
              </motion.div>
            </div>

            {/* Fun facts */}
            {/* <div className="flex flex-wrap gap-3 mt-8">
              {FUN_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="inline-flex items-center gap-2 bg-soft-white rounded-full px-4 py-2 border border-charcoal/5"
                >
                  <span>{fact.emoji}</span>
                  <span className="text-xs font-medium text-charcoal/70">{fact.label}</span>
                </div>
              ))}
            </div> */}

            {/* Value cards */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {VALUES.map((v, i) => (
                <div key={v.title} className="bg-gradient-to-br from-navy/5 to-transparent rounded-xl p-4 border border-charcoal/5">
                  <h4 className="font-cormorant text-lg font-bold text-navy">{v.title}</h4>
                </div>
              ))}
            </div>

            {/* Timeline */}
            {/* <div className="mt-12"> */}
            {/* <h3 className="font-cormorant text-2xl font-bold text-navy mb-6">Career Journey</h3> */}
            {/* <CareerTimeline /> */}
            {/* </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
