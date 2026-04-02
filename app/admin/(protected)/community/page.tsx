"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Check, X, UserPlus, Loader2, Users } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { motion, AnimatePresence } from "framer-motion";

interface CommunityMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  challenge: string | null;
  is_approved: boolean;
  created_at: string;
}

export default function CommunityPage() {
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase
        .from("community_members")
        .select("*")
        .order("created_at", { ascending: false });
      if (mounted) {
        setMembers(data ?? []);
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [supabase]);

  async function handleApprove(id: string) {
    await supabase.from("community_members").update({ is_approved: true }).eq("id", id);
    const { data } = await supabase.from("community_members").select("*").order("created_at", { ascending: false });
    setMembers(data ?? []);
  }

  async function handleReject(id: string) {
    if (!confirm("Reject and delete this application?")) return;
    await supabase.from("community_members").delete().eq("id", id);
    const { data } = await supabase.from("community_members").select("*").order("created_at", { ascending: false });
    setMembers(data ?? []);
  }

  const pendingCount = members.filter((m) => !m.is_approved).length;
  const filtered = members.filter((m) => {
    if (filter === "pending") return !m.is_approved;
    if (filter === "approved") return m.is_approved;
    return true;
  });

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
        title="Community"
        subtitle={`${pendingCount} pending of ${members.length} applications`}
        badge={pendingCount > 0 ? `${pendingCount} awaiting review` : undefined}
      />

      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-stone-100 w-fit">
        {(["all", "pending", "approved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
              filter === f
                ? "bg-navy text-white shadow-sm"
                : "text-stone-400 hover:text-navy hover:bg-stone-50"
            }`}
          >
            {f}
            {f === "pending" && pendingCount > 0 ? ` (${pendingCount})` : f === "approved" ? ` (${members.length - pendingCount})` : ` (${members.length})`}
          </button>
        ))}
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.06 } },
        }}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-16 border border-stone-100 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-stone-300" />
              </div>
              <p className="text-stone-400 font-medium">No {filter !== "all" ? filter : ""} applications</p>
            </motion.div>
          ) : (
            filtered.map((member) => (
              <motion.div
                key={member.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm shrink-0">
                      {member.first_name[0]}{member.last_name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base font-bold text-navy">
                          {member.first_name} {member.last_name}
                        </h3>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          member.is_approved
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}>
                          {member.is_approved ? "Approved" : "Pending"}
                        </span>
                        <span className="text-xs bg-stone-100 px-2.5 py-0.5 rounded-full text-stone-500">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-sm text-stone-400 mb-3">{member.email}</p>
                      {member.challenge && (
                        <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
                          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1.5">Why they want to join</p>
                          <p className="text-sm text-stone-600 leading-relaxed">{member.challenge}</p>
                        </div>
                      )}
                      <p className="text-xs text-stone-300 mt-3">
                        Applied {new Date(member.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>

                  {!member.is_approved && (
                    <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleApprove(member.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(member.id)}
                        className="flex items-center gap-1.5 px-4 py-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 text-sm font-medium rounded-xl transition-colors border border-rose-100"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
