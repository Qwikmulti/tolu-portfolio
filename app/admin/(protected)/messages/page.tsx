"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Mail, Check, Trash2, Loader2 } from "lucide-react";

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
  const router = useRouter();
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
        <h1 className="font-cormorant text-3xl font-bold text-navy">Messages</h1>
        <p className="text-charcoal/50 text-sm mt-1">
          {unreadCount} unread / {messages.length} total
        </p>
      </div>

      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-100 text-center">
            <Mail className="w-12 h-12 text-charcoal/10 mx-auto mb-3" />
            <p className="text-charcoal/40">No messages yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl p-5 border transition-all hover:shadow-md ${
                msg.is_read ? "border-gray-100" : "border-gold/30 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-sm font-semibold text-navy flex-shrink-0">
                    {msg.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-navy">{msg.name}</h3>
                      <span className="text-xs text-charcoal/40">{msg.email}</span>
                      {msg.role && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-charcoal/50">
                          {msg.role}
                        </span>
                      )}
                      {!msg.is_read && (
                        <span className="w-2 h-2 rounded-full bg-gold" />
                      )}
                    </div>
                    <p className="text-xs text-charcoal/40 mt-0.5">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-charcoal/70 mt-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleToggleRead(msg)}
                    className="p-2 text-charcoal/30 hover:text-electric hover:bg-electric/5 rounded-lg transition-colors"
                    title={msg.is_read ? "Mark as unread" : "Mark as read"}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 text-charcoal/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
