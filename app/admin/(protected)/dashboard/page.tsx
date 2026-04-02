/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, Mail, UserPlus, FileText, ArrowRight } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { motion } from "framer-motion";

async function getStats(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  try {
    const [subscribersCount, messagesCount, communityCount, blogCount] = await Promise.all([
      supabase.from("subscribers").select("*", { count: "exact", head: true }),
      supabase.from("messages").select("*", { count: "exact", head: true }),
      supabase.from("community_members").select("*", { count: "exact", head: true }),
      supabase.from("blog_articles").select("*", { count: "exact", head: true }),
    ]);

    const [recentMessages, recentCommunity] = await Promise.all([
      supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("community_members").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    return {
      totalSubscribers: subscribersCount.count ?? 0,
      totalMessages: messagesCount.count ?? 0,
      totalCommunity: communityCount.count ?? 0,
      totalBlog: blogCount.count ?? 0,
      recentMessages: recentMessages.data ?? [],
      recentCommunity: recentCommunity.data ?? [],
    };
  } catch {
    return {
      totalSubscribers: 0, totalMessages: 0, totalCommunity: 0, totalBlog: 0,
      recentMessages: [] as any[], recentCommunity: [] as any[],
    };
  }
}

export default async function DashboardPage() {
  let user: { email?: string } | null = null;
  const supabase = await createSupabaseServerClient();
  const stats = await getStats(supabase);

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // continue
  }

  if (!user) redirect("/admin/login");

  const statCards = [
    { label: "Subscribers", value: stats.totalSubscribers, icon: <Users className="w-5 h-5" />, href: "/admin/subscribers", accentColor: "electric" as const, delay: 0 },
    { label: "Messages", value: stats.totalMessages, icon: <Mail className="w-5 h-5" />, href: "/admin/messages", accentColor: "gold" as const, delay: 0.08 },
    { label: "Community", value: stats.totalCommunity, icon: <UserPlus className="w-5 h-5" />, href: "/admin/community", accentColor: "green" as const, delay: 0.16 },
    { label: "Blog Articles", value: stats.totalBlog, icon: <FileText className="w-5 h-5" />, href: "/admin/blog", accentColor: "rose" as const, delay: 0.24 },
  ];

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome back — here's what's happening with your community."
      />

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Activity feeds */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent messages */}
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-bold text-navy">Recent Messages</h2>
            <Link href="/admin/messages" className="flex items-center gap-1 text-xs font-medium text-stone-400 hover:text-amber-500 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {stats.recentMessages.length === 0 ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5 text-stone-300" />
              </div>
              <p className="text-stone-400 text-sm">No messages yet.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {stats.recentMessages.map((msg: any, i: number) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {msg.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-navy truncate">{msg.name}</p>
                      {!msg.is_read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-stone-400 truncate mt-0.5">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Recent community */}
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-bold text-navy">Community Applications</h2>
            <Link href="/admin/community" className="flex items-center gap-1 text-xs font-medium text-stone-400 hover:text-amber-500 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {stats.recentCommunity.length === 0 ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-5 h-5 text-stone-300" />
              </div>
              <p className="text-stone-400 text-sm">No applications yet.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {stats.recentCommunity.map((member: any, i: number) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 text-xs font-semibold shrink-0">
                    {member.first_name[0]}{member.last_name[0]}
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy truncate">{member.first_name} {member.last_name}</p>
                      <p className="text-xs text-stone-400 truncate">{member.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${
                      member.is_approved
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {member.is_approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
