"use client";

import { motion } from "framer-motion";
import { Mail, UserPlus, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Message {
  id: number;
  name: string;
  message: string;
  is_read: boolean;
}

interface CommunityMember {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_approved: boolean;
}

interface ActivityFeedProps {
  recentMessages: Message[];
  recentCommunity: CommunityMember[];
}

export function ActivityFeed({ recentMessages, recentCommunity }: ActivityFeedProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Recent messages */}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold text-navy">Recent Messages</h2>
          <Link href="/admin/messages" className="flex items-center gap-1 text-xs font-medium text-stone-400 hover:text-amber-500 transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {recentMessages.length === 0 ? (
          <div className="py-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-5 h-5 text-stone-300" />
            </div>
            <p className="text-stone-400 text-sm">No messages yet.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {recentMessages.map((msg, i) => (
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
        {recentCommunity.length === 0 ? (
          <div className="py-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-3">
              <UserPlus className="w-5 h-5 text-stone-300" />
            </div>
            <p className="text-stone-400 text-sm">No applications yet.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {recentCommunity.map((member, i) => (
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
  );
}
