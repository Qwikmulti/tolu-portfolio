/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Users, Mail, UserPlus, FileText } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { ActivityFeed } from "@/components/admin/ActivityFeed";

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
      <ActivityFeed
        recentMessages={stats.recentMessages}
        recentCommunity={stats.recentCommunity}
      />
    </div>
  );
}
