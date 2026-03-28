"use client";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Adaeze M.",
    role: "Junior BA at Deloitte",
    text: "Tolu's community helped me land my first BA role. The templates and guidance are unlike anything else out there. I went from confused to confident in 3 months.",
    initials: "AM",
    rating: 5,
  },
  {
    name: "James K.",
    role: "Senior PM, Fintech",
    text: "I've been in project management for 8 years. Tolu's approach to requirements gathering completely changed how I work with my BA team. Absolute game-changer.",
    initials: "JK",
    rating: 5,
  },
  {
    name: "Priya S.",
    role: "Business Analyst, Insurance",
    text: "The free resources alone are worth more than expensive courses I've paid for. Joining the community was the best career decision I made this year.",
    initials: "PS",
    rating: 5,
  },
  {
    name: "Chidi O.",
    role: "Career Switcher → BA",
    text: "Switching from marketing to BA felt impossible until I found Practical BA with Tolu. The roadmap was clear, the support was real. I'm now a certified BA.",
    initials: "CO",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy via-electric to-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">Testimonials</span>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-bold text-navy mt-3">
            What People Are Saying
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-soft-white rounded-2xl p-6 h-full border border-charcoal/5 hover:border-gold/20 transition-all duration-300 hover:shadow-lg flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-charcoal/65 text-sm leading-relaxed mb-6 flex-1 italic">
                  &quot;{t.text}&quot;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-charcoal/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-navy flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xs">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-charcoal/40 text-xs">{t.role}</p>
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
