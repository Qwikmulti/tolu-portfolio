"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactData, contactSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { SOCIAL_LINKS, BRAND } from "@/lib/constants";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: BRAND.email },
  { icon: Phone, label: "Phone", value: BRAND.phone },
  { icon: MapPin, label: "Location", value: BRAND.location },
];

const SUBJECTS = [
  "Collaboration",
  "Mentorship Request",
  "Community Question",
  "Toolkits Enquiry",
  "Other",
];

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
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
    <section id="contact" className="py-28 bg-soft-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-electric to-gold" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-electric/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-electric text-sm font-semibold tracking-[0.2em] uppercase">Get in Touch</span>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-bold text-navy mt-3">
            Let&apos;s Connect
          </h2>
          <p className="text-charcoal/50 mt-4 max-w-xl mx-auto">
            Have a question, collaboration idea, or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
          {CONTACT_INFO.map((info, i) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-6 text-center border border-charcoal/5 hover:border-electric/20 transition-all duration-300 hover:shadow-lg group">
                <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <info.icon className="w-5 h-5 text-electric" />
                </div>
                <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-1">{info.label}</p>
                <p className="text-navy font-medium text-sm">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-charcoal/5 relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-br from-electric/5 to-transparent" />

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-navy mb-2">Message Sent!</h3>
                <p className="text-charcoal/50 text-sm">I&apos;ll get back to you within 48 hours.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-cormorant text-2xl font-bold text-navy mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">Full Name</label>
                      <input
                        {...register("fullName")}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all text-charcoal text-sm"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">Email</label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all text-charcoal text-sm"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">Subject</label>
                    <select
                      {...register("subject")}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all text-charcoal text-sm bg-white"
                    >
                      <option value="">Select a subject...</option>
                      {SUBJECTS.map((s) => <option key={s} value={s.toLowerCase().replace(" ", "-")}>{s}</option>)}
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">Message</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Your message..."
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all text-charcoal text-sm resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    isLoading={loading}
                    loadingText="Sending..."
                    className="w-full bg-navy hover:bg-navy/90 text-white font-semibold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </>
            )}

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-charcoal/5">
              {[
                { label: "YouTube", href: SOCIAL_LINKS.youtube },
                { label: "Instagram", href: SOCIAL_LINKS.instagram },
                { label: "Facebook", href: SOCIAL_LINKS.facebook },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/30 hover:text-electric text-sm font-medium transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}