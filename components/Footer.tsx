import { BRAND, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-cormorant text-2xl font-bold text-white mb-2">{BRAND.name}</p>
            <p className="text-white/40 text-sm mb-4 max-w-xs">{BRAND.tagline}</p>
            <div className="flex gap-5">
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
                  className="text-white/30 hover:text-white text-xs font-medium transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</p>
            <div className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/40 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                {BRAND.email}
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                {BRAND.phone}
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                {BRAND.location}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © 2026 Practical BA Community. All rights reserved.
          </p>
          <a
            href="#hero"
            className="flex items-center gap-1.5 text-white/20 hover:text-white text-xs transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}