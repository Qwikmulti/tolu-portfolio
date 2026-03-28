/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { FileText, Clock, Calendar } from "lucide-react";

export default async function BlogPage() {
  const supabase = await createSupabaseServerClient();
  const client = await supabase;
  const { data: articles } = await client
    .from("blog_articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-soft-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-electric/10 text-electric text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <FileText className="w-4 h-4" />
            Practical Insights
          </span>
          <h1 className="font-cormorant text-5xl sm:text-6xl font-bold text-navy mb-4">
            BA Insights Blog
          </h1>
          <p className="text-charcoal/50 max-w-xl mx-auto">
            Practical tips, frameworks, and real-world advice for aspiring and established Business Analysts.
          </p>
        </div>

        <div className="space-y-6">
          {(!articles || articles.length === 0) ? (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-charcoal/10 mx-auto mb-3" />
              <p className="text-charcoal/40">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            articles.map((article: any) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-electric bg-electric/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-charcoal/40 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.read_time}
                  </span>
                  <span className="text-xs text-charcoal/40 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                </div>
                <h2 className="font-cormorant text-2xl font-bold text-navy mb-2 group-hover:text-electric transition-colors">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="text-charcoal/50 text-sm leading-relaxed">{article.excerpt}</p>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}