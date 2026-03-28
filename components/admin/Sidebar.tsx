"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Mail,
  UserPlus,
  FileText,
  LogOut,
  X,
  Menu,
  FileDown,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/community", label: "Community", icon: UserPlus },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/guides", label: "Guides", icon: FileDown },
];

interface SidebarProps {
  userEmail: string;
  onLogout?: () => void;
}

export function Sidebar({ userEmail, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createSupabaseBrowserClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h2 className="font-cormorant text-xl font-bold text-white">
          Tolu<span className="text-gold">.</span>
        </h2>
        <p className="text-white/40 text-xs mt-1">Admin Panel</p>
      </div>

      {/* User */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-semibold">
            {userEmail[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all relative ${
                active
                  ? "text-white bg-white/5"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gold rounded-r-full"
                />
              )}
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-white/50 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-60 bg-navy/95 backdrop-blur-xl border-r border-white/10 flex-col z-40">
        <NavContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-navy/95 backdrop-blur-xl border border-white/10 rounded-lg"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 h-full w-60 bg-navy/95 backdrop-blur-xl border-r border-white/10 flex-col z-50"
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
