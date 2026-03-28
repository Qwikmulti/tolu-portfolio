"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubscribeData, subscribeSchema } from "@/lib/validations";
import { Send, CheckCircle } from "lucide-react";

export function MailingListSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubscribeData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: SubscribeData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      reset();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-28 bg-navy relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "32px 32px"
      }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">Newsletter</span>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-bold text-white mt-4 mb-5">
            Stay in the Loop
          </h2>
          <p className="text-white/50 mb-12 max-w-lg mx-auto leading-relaxed">
            Join aspiring BAs getting weekly tips, resources, and career insights. No spam, unsubscribe anytime.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex-1 text-left">
              <input
                {...register("firstName")}
                placeholder="First name"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all"
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-2 text-left">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex-1 text-left">
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/10 outline-none transition-all"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-2 text-left">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gold hover:bg-gold/90 text-navy font-semibold px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
            >
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <>
                  Subscribe
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <CheckCircle className="w-12 h-12 text-gold" />
            <p className="text-white text-lg font-medium">You&#39;re subscribed! Check your inbox.</p>
          </motion.div>
        )}

        <motion.p
          className="text-white/30 text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Join 2,500+ BAs already subscribed
        </motion.p>
      </div>
    </section>
  );
}
