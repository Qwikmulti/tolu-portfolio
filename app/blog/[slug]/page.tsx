import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import React from "react";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  let article: any = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("blog_articles")
      .select("*")
      .eq("slug", slug)
      .single();
    article = data;
  } catch (err) {
    console.error("Article page error:", err);
  }

  if (!article) notFound();

  return (
    <div className="min-h-screen bg-soft-white py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-charcoal/50 hover:text-electric text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-electric bg-electric/10 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-charcoal/40 text-xs">{article.read_time}</span>
          <span className="text-charcoal/40 text-xs">{article.date}</span>
        </div>

        <h1 className="font-cormorant text-4xl sm:text-5xl font-bold text-navy mb-8">
          {article.title}
        </h1>

        <div
          className="prose prose-lg max-w-none text-charcoal leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
          style={{ color: "#475569", lineHeight: "1.8" }}
        />
      </div>
    </div>
  );
}