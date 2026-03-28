"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadGuideData, downloadGuideSchema } from "@/lib/validations";
import { Download, CheckCircle, ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    title: "How to Write a BRD",
    excerpt: "A Business Requirements Document is the BA's most important deliverable. Here's how to write one that stakeholders actually use.",
    readTime: "8 min read",
  },
  {
    title: "5 Core Skills Every BA Must Have",
    excerpt: "Beyond the textbooks — the soft skills and hard skills that separate good BAs from great ones in the real world.",
    readTime: "6 min read",
  },
  {
    title: "Breaking Into BA With No Experience",
    excerpt: "You don't need a PM background or a CS degree. Here's the roadmap I wish I had when starting out.",
    readTime: "10 min read",
  },
  {
    title: "Stakeholder Management: The BA's Secret Weapon",
    excerpt: "The most technical BA loses without stakeholder buy-in. Learn the frameworks that make people listen.",
    readTime: "7 min read",
  },
];

export function ResourcesSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<DownloadGuideData>({
    resolver: zodResolver(downloadGuideSchema),
  });

  const onSubmit = async (data: DownloadGuideData) => {
    // Honeypot check - bot detected if field is filled
    const honeypotField = document.querySelector("input[name='website']") as HTMLInputElement;
    if (honeypotField?.value) {
      // Bot detected - fake success
      setSubmitted(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/download-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const { downloadUrl } = await res.json();
      setSubmitted(true);
      window.open(downloadUrl, "_blank");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="resources" className="py-28 bg-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-electric text-sm font-semibold tracking-[0.2em] uppercase">Free Resources</span>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-bold text-navy mt-3">
            Start Your BA Journey Free
          </h2>
        </motion.div>

        {/* FREE GUIDE CTA Card */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-gradient-to-r from-gold/90 to-amber-500 rounded-3xl overflow-hidden shadow-2xl shadow-gold/20 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="grid lg:grid-cols-2 gap-12 items-center p-10 sm:p-14 relative">
              {/* Left content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-navy/20 rounded-full px-4 py-1.5 mb-6">
                  <span className="text-xl">🎁</span>
                  <span className="text-navy text-sm font-semibold">Free Download</span>
                </div>

                <h3 className="font-cormorant text-4xl font-bold text-navy mb-4">
                  Free BA Starter Guide
                </h3>
                <p className="text-navy/70 mb-8 leading-relaxed">
                  Everything you need to launch your BA career. Instant access to our most popular guide.
                </p>

                <ul className="space-y-3">
                  {[
                    "The 5 core skills every BA needs",
                    "How to write a winning BRD",
                    "Template for stakeholder interviews",
                    "Top 10 BA tools & how to use them",
                    "Career path roadmap for new BAs",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-navy/80 text-sm">
                      <CheckCircle className="w-5 h-5 text-navy shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right form */}
              {!submitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-xl">
                  {/* Honeypot - hidden from users, bots will fill it */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-9999px]"
                    onChange={() => {}}
                  />
                  <h4 className="font-cormorant text-xl font-bold text-navy mb-6">Get Instant Access</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">Your Name</label>
                      <input
                        {...register("name")}
                        placeholder="Tolulope"
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all text-charcoal"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">Email Address</label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all text-charcoal"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      data-track="download_guide_click"
                      className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Send Me The Guide
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h4 className="font-cormorant text-2xl font-bold text-navy mb-2">You&apos;re All Set!</h4>
                  <p className="text-charcoal/60 text-sm">Check your inbox for the download link.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Article Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl p-6 h-full border border-charcoal/5 hover:border-electric/20 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-electric/60 uppercase tracking-wide">Article</span>
                  <span className="text-xs text-charcoal/40">{article.readTime}</span>
                </div>
                <h4 className="font-cormorant text-xl font-bold text-navy mb-3 group-hover:text-electric transition-colors">
                  {article.title}
                </h4>
                <p className="text-charcoal/55 text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-electric text-sm font-medium group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}