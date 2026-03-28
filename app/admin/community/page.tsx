"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Check, X, UserPlus, Loader2 } from "lucide-react";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal/30" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl font-bold text-navy">Community Applications</h1>
        <p className="text-charcoal/50 text-sm mt-1">{pendingCount} pending approval</p>
      </div>

      <div className="space-y-4">
        {members.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-100 text-center">
            <UserPlus className="w-12 h-12 text-charcoal/10 mx-auto mb-3" />
            <p className="text-charcoal/40">No community applications yet.</p>
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold flex-shrink-0">
                    {member.first_name[0]}{member.last_name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-navy">
                        {member.first_name} {member.last_name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          member.is_approved
                            ? "bg-green-500/10 text-green-600"
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}
                      >
                        {member.is_approved ? "Approved" : "Pending"}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-charcoal/50">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal/50 mt-0.5">{member.email}</p>
                    {member.challenge && (
                      <p className="text-sm text-charcoal/70 mt-3 leading-relaxed bg-gray-50 rounded-lg p-3">
                        {member.challenge}
                      </p>
                    )}
                    <p className="text-xs text-charcoal/30 mt-2">
                      Applied {new Date(member.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {!member.is_approved && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleApprove(member.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(member.id)}
                      className="flex items-center gap-1.5 px-4 py-2 text-red-400 hover:text-red-600 hover:bg-red-50 text-sm rounded-lg transition-colors border border-red-200"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}