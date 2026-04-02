"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Download, Trash2, Loader2, Users, Search } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { motion } from "framer-motion";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  source: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data, count: c } = await supabase
        .from("subscribers")
        .select("*", { count: "exact" })
        .order("subscribed_at", { ascending: false });
      if (mounted) {
        setSubscribers(data ?? []);
        setCount(c ?? 0);
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [supabase]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this subscriber?")) return;
    setDeleting(id);
    await supabase.from("subscribers").delete().eq("id", id);
    const { data, count: c } = await supabase.from("subscribers").select("*", { count: "exact" }).order("subscribed_at", { ascending: false });
    setSubscribers(data ?? []);
    setCount(c ?? 0);
    setDeleting(null);
  }

  function exportCSV() {
    const rows = [["Email", "Subscribed At", "Source"]];
    subscribers.forEach((s) => {
      rows.push([s.email, new Date(s.subscribed_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), s.source]);
    });
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-stone-300" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Subscribers"
        subtitle={`${count} total subscribers across all lists`}
        badge={count > 0 ? `${count} email${count !== 1 ? "s" : ""}` : undefined}
        action={
          <button
            onClick={exportCSV}
            disabled={subscribers.length === 0}
            className="flex items-center gap-2 bg-navy hover:bg-navy/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors disabled:opacity-40"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        }
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-stone-100 rounded-xl text-sm text-navy placeholder:text-stone-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-50 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-stone-300" />
            </div>
            <p className="text-stone-400 font-medium">
              {search ? "No subscribers match your search" : "No subscribers yet"}
            </p>
            {!search && (
              <p className="text-stone-300 text-sm mt-1">Share your newsletter to get started!</p>
            )}
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3.5 border-b border-stone-100 bg-stone-50/50">
              <div className="col-span-5 text-xs font-semibold text-stone-400 uppercase tracking-wider">Email</div>
              <div className="col-span-3 text-xs font-semibold text-stone-400 uppercase tracking-wider">Subscribed</div>
              <div className="col-span-3 text-xs font-semibold text-stone-400 uppercase tracking-wider">Source</div>
              <div className="col-span-1" />
            </div>
            {/* Rows */}
            <div className="divide-y divide-stone-50">
              {filtered.map((sub, i) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-stone-50/60 transition-colors group"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold shrink-0">
                      {sub.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-navy truncate">{sub.email}</span>
                  </div>
                  <div className="col-span-3 text-sm text-stone-500">
                    {new Date(sub.subscribed_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                  <div className="col-span-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 text-xs font-medium">
                      {sub.source}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => handleDelete(sub.id)}
                      disabled={deleting === sub.id}
                      className="p-1.5 text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Footer */}
            {search && (
              <div className="px-6 py-3 border-t border-stone-100 bg-stone-50/50 text-xs text-stone-400">
                {filtered.length} of {count} subscribers shown
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
