/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, FileText, Loader2, Clock } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { motion } from "framer-motion";

export default function BlogAdminPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase
        .from("blog_articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (mounted) {
        setArticles(data ?? []);
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [supabase]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    await supabase.from("blog_articles").delete().eq("id", id);
    const { data } = await supabase.from("blog_articles").select("*").order("created_at", { ascending: false });
    setArticles(data ?? []);
  }

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
        title="Blog Articles"
        subtitle={`${articles.length} article${articles.length !== 1 ? "s" : ""} published`}
        action={
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Article
          </Link>
        }
      />

      {/* Articles */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
        initial="hidden"
        animate="show"
        className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm"
      >
        {articles.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-stone-300" />
            </div>
            <p className="text-stone-400 font-medium">No articles yet</p>
            <p className="text-stone-300 text-sm mt-1">Create your first article to get started.</p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-amber-500 hover:text-amber-600"
            >
              <Plus className="w-4 h-4" /> Write an article
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/50">
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-widest px-6 py-3.5">Article</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-widest px-6 py-3.5">Category</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-widest px-6 py-3.5 hidden sm:table-cell">Date</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-widest px-6 py-3.5 hidden sm:table-cell">Read Time</th>
                <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-widest px-6 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-stone-50/60 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-navy">{article.title}</p>
                    <p className="text-xs text-stone-400 truncate max-w-xs mt-0.5">{article.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-sm text-stone-500">{article.date}</span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1 text-xs text-stone-400">
                      <Clock className="w-3 h-3" />
                      {article.read_time}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/blog/${article.id}/edit`}
                        className="p-2 text-stone-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}
