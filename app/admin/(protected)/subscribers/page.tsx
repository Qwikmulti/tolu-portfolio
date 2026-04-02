"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Download, Trash2, Loader2 } from "lucide-react";

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
  const router = useRouter();
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
      rows.push([s.email, new Date(s.subscribed_at).toLocaleDateString(), s.source]);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal/30" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-cormorant text-3xl font-bold text-navy">Subscribers</h1>
          <p className="text-charcoal/50 text-sm mt-1">{count} total subscribers</p>
        </div>
        <button
          onClick={exportCSV}
          disabled={subscribers.length === 0}
          className="flex items-center gap-2 bg-navy hover:bg-navy/90 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-6 py-3">Email</th>
              <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-6 py-3">Subscribed</th>
              <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-6 py-3">Source</th>
              <th className="text-right text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-charcoal/40 text-sm">
                  No subscribers yet — share your newsletter to get started!
                </td>
              </tr>
            ) : (
              subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-navy font-medium">{sub.email}</td>
                  <td className="px-6 py-4 text-sm text-charcoal/50">
                    {new Date(sub.subscribed_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/50">{sub.source}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(sub.id)}
                      disabled={deleting === sub.id}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}