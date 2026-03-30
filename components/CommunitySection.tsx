"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JoinCommunityData, joinCommunitySchema } from "@/lib/validations";
import {
  Users,
  MessageCircle,
  TrendingUp,
  BookOpen,
  Heart,
  Zap,
  Send,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

const BENEFITS = [
  {
    icon: Users,
    title: "Network",
    desc: "Connect with aspiring and experienced BAs who are on the same journey — no more figuring it out alone.",
  },
  {
    icon: MessageCircle,
    title: "Support",
    desc: "Get clear answers to your questions and real guidance from people who understand the role.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    desc: "Build the confidence and skills you need to move from learning to actually applying for BA roles.",
  },
  {
    icon: BookOpen,
    title: "Resources",
    desc: "Access practical templates, examples, and materials used in real BA projects.",
  },
  {
    icon: Heart,
    title: "Belonging",
    desc: "Be part of a community that supports your growth and keeps you accountable.",
  },
  {
    icon: Zap,
    title: "Opportunities",
    desc: "Discover roles, collaborations, and opportunities to gain real-world experience.",
  },
];

const ROLES = [
  "Beginner (no experience)",
  "Trying to transition",
  "Already in a BA role",
  "Just exploring",
  "Other",
];

export function CommunitySection() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<JoinCommunityData>({
    resolver: zodResolver(joinCommunitySchema),
  });

  const onSubmit = async (data: JoinCommunityData) => {
    // Honeypot check - bot detected if field is filled
    const honeypotField = document.querySelector(
      "input[name='website']",
    ) as HTMLInputElement;
    if (honeypotField?.value) {
      // Bot detected - fake success
      setSuccess(true);
      reset();
      return;
    }

    try {
      const res = await fetch("/api/join-community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();

      setSuccess(true);

      // Confetti burst
      if (typeof window !== "undefined") {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#F59E0B", "#2563EB", "#0F1F3D"],
        });
      }

      reset();
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="community"
      className="py-28 bg-soft-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-electric text-sm font-semibold tracking-[0.2em] uppercase">
            Join Us
          </span>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-bold text-navy mt-3 mb-5">
            Break Into Business Analysis With Real Support
          </h2>
          <p className="text-charcoal/50 max-w-2xl mx-auto">
            Get the guidance, practical knowledge, and support you need to
            confidently transition into Business Analysis — even if you’re
            starting from scratch.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-6 border border-charcoal/5 hover:border-electric/20 transition-all duration-300 hover:shadow-md flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-electric/10 to-electric/5 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <b.icon className="w-6 h-6 text-electric" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy">{b.title}</h4>
                  <p className="text-charcoal/50 text-sm mt-1">{b.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Form */}
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-charcoal/5 relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-full" />

            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="font-cormorant text-3xl font-bold text-navy mb-3">
                  You&apos;re In!
                </h3>
                
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h3 className="font-cormorant text-3xl font-bold text-navy mb-2">
                    Start Your Journey Into Business Analysis Today
                  </h3>
                  <p className="text-charcoal/50">
                  Get practical skills, real-world guidance, and the support you
                  need to confidently transition into Business Analysis.
                </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Honeypot - hidden from users, bots will fill it */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-9999px]"
                    onChange={() => {}}
                  />
                  {/* <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">
                        First Name
                      </label>
                      <input
                        {...register("firstName")}
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">
                        Last Name
                      </label>
                      <input
                        {...register("lastName")}
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div> */}
                  <div>
                    <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">
                      Where are you in your BA journey?
                    </label>
                    <select
                      onChange={(e) => setValue("currentRole", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all bg-white text-charcoal"
                    >
                      <option value="">Where are you in your BA journey?</option>
                      {ROLES.map((r) => (
                        <option
                          key={r}
                          value={r.toLowerCase().replace(" ", "-")}
                        >
                          {r}
                        </option>
                      ))}
                    </select>
                    {errors.currentRole && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.currentRole.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">
                      Biggest BA Challenge
                    </label>
                    <textarea
                      {...register("challenge")}
                      rows={4}
                      placeholder="Tell us what you're struggling with..."
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all resize-none"
                    />
                    {errors.challenge && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.challenge.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    data-track="join_community_click"
                    className="w-full bg-electric hover:bg-electric/90 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Join Now & Get Started
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>

        {/* Social links */}
        <div className="flex justify-center gap-8 mt-12">
          {[
            {
              label: "YouTube",
              href: SOCIAL_LINKS.youtube,
              icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
            },
            { label: "Instagram", href: SOCIAL_LINKS.instagram },
            { label: "Facebook", href: SOCIAL_LINKS.facebook },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/30 hover:text-electric text-sm font-medium transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
