/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, Mail, UserPlus, FileText, ArrowRight } from "lucide-react";

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
      recentMessages: [], recentCommunity: [],
    };
  }
}

export default async function DashboardPage() {
  let user: { email?: string } | null = null;
  let stats: Awaited<ReturnType<typeof getStats>> = { totalSubscribers: 0, totalMessages: 0, totalCommunity: 0, totalBlog: 0, recentMessages: [] as any[], recentCommunity: [] as any[] };

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
    if (user) {
      stats = await getStats(supabase);
    }
  } catch (err) {
    console.error("Dashboard error:", err);
  }

  if (!user) redirect("/admin/login");

  const statCards = [
    { label: "Subscribers", value: stats.totalSubscribers, icon: Users, href: "/admin/subscribers", color: "electric" },
    { label: "Messages", value: stats.totalMessages, icon: Mail, href: "/admin/messages", color: "gold" },
    { label: "Community", value: stats.totalCommunity, icon: UserPlus, href: "/admin/community", color: "green" },
    { label: "Blog Articles", value: stats.totalBlog, icon: FileText, href: "/admin/blog", color: "purple" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-cormorant text-3xl font-bold text-navy">Dashboard</h1>
        <p className="text-charcoal/50 mt-1">Welcome back — here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-charcoal/50 text-sm">{label}</p>
                <p className="font-cormorant text-3xl font-bold text-navy mt-1">{value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                color === "electric" ? "bg-electric/10 text-electric" :
                color === "gold" ? "bg-gold/10 text-gold" :
                color === "green" ? "bg-green-500/10 text-green-500" :
                "bg-purple-500/10 text-purple-500"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-charcoal/40 group-hover:text-electric transition-colors">
              View <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent messages */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-cormorant text-xl font-bold text-navy">Recent Messages</h2>
            <Link href="/admin/messages" className="text-sm text-electric hover:underline">View all</Link>
          </div>
          {stats.recentMessages.length === 0 ? (
            <p className="text-charcoal/40 text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentMessages.map((msg: any) => (
                <div key={msg.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-xs font-semibold text-navy flex-shrink-0">
                    {msg.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy truncate">{msg.name}</p>
                    <p className="text-xs text-charcoal/40 truncate">{msg.message}</p>
                  </div>
                  {!msg.is_read && (
                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent community */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-cormorant text-xl font-bold text-navy">Community Applications</h2>
            <Link href="/admin/community" className="text-sm text-electric hover:underline">View all</Link>
          </div>
          {stats.recentCommunity.length === 0 ? (
            <p className="text-charcoal/40 text-sm">No applications yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentCommunity.map((member: any) => (
                <div key={member.id} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-xs font-semibold text-gold flex-shrink-0">
                    {member.first_name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy">{member.first_name} {member.last_name}</p>
                    <p className="text-xs text-charcoal/40">{member.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    member.is_approved
                      ? "bg-green-500/10 text-green-600"
                      : "bg-yellow-500/10 text-yellow-600"
                  }`}>
                    {member.is_approved ? "Approved" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
