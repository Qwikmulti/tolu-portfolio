/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, FileText, Loader2 } from "lucide-react";

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
    if (!confirm("Delete this article?")) return;
    await supabase.from("blog_articles").delete().eq("id", id);
    const { data } = await supabase.from("blog_articles").select("*").order("created_at", { ascending: false });
    setArticles(data ?? []);
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
          <h1 className="font-cormorant text-3xl font-bold text-navy">Blog Articles</h1>
          <p className="text-charcoal/50 text-sm mt-1">{articles.length} articles</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-6 py-3">Title</th>
              <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-6 py-3">Category</th>
              <th className="text-left text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-6 py-3">Date</th>
              <th className="text-right text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {articles.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-charcoal/40 text-sm">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-charcoal/10" />
                  No articles yet — create your first one!
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-navy">{article.title}</p>
                    <p className="text-xs text-charcoal/40 truncate max-w-xs">{article.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-charcoal/50">{article.category}</td>
                  <td className="px-6 py-4 text-sm text-charcoal/50">{article.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/blog/${article.id}/edit`}
                        className="p-2 text-charcoal/30 hover:text-electric hover:bg-electric/5 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-charcoal/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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