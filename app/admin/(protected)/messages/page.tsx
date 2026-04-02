"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Mail, Check, Trash2, Loader2, Inbox } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  name: string;
  email: string;
  role: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (mounted) {
        setMessages(data ?? []);
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [supabase]);

  async function handleToggleRead(msg: Message) {
    await supabase.from("messages").update({ is_read: !msg.is_read }).eq("id", msg.id);
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    setMessages(data ?? []);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await supabase.from("messages").delete().eq("id", id);
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    setMessages(data ?? []);
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.is_read;
    if (filter === "read") return m.is_read;
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
        title="Messages"
        subtitle={`${unreadCount} unread of ${messages.length} total`}
        badge={unreadCount > 0 ? `${unreadCount} new` : undefined}
      />

      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-stone-100 w-fit">
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
              filter === f
                ? "bg-navy text-white shadow-sm"
                : "text-stone-400 hover:text-navy hover:bg-stone-50"
            }`}
          >
            {f} {f === "all" ? "" : f === "unread" ? `(${unreadCount})` : `(${messages.length - unreadCount})`}
          </button>
        ))}
      </div>

      {/* Messages */}
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
                <Inbox className="w-6 h-6 text-stone-300" />
              </div>
              <p className="text-stone-400 font-medium">No {filter !== "all" ? filter : ""} messages</p>
            </motion.div>
          ) : (
            filtered.map((msg) => (
              <motion.div
                key={msg.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-md group ${
                  msg.is_read ? "border-stone-100" : "border-amber-200/70 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      msg.is_read ? "bg-stone-100 text-stone-500" : "bg-navy text-white"
                    }`}>
                      {msg.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm font-bold text-navy">{msg.name}</h3>
                        <span className="text-xs text-stone-400">{msg.email}</span>
                        {msg.role && (
                          <span className="text-xs bg-stone-100 px-2 py-0.5 rounded text-stone-500">
                            {msg.role}
                          </span>
                        )}
                        {!msg.is_read && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 mb-2.5">
                        {new Date(msg.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleToggleRead(msg)}
                      className="p-2 text-stone-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors"
                      title={msg.is_read ? "Mark as unread" : "Mark as read"}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
