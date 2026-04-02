/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { BlogForm } from "@/components/admin/BlogForm";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("id", id)
        .single();
      setArticle(data);
      setLoading(false);
    }
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal/30" />
      </div>
    );
  }

  if (!article) {
    router.push("/admin/blog");
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl font-bold text-navy">Edit Article</h1>
        <p className="text-charcoal/50 text-sm mt-1">Update an existing blog article.</p>
      </div>
      <BlogForm
        initialData={{
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt ?? "",
          content: article.content,
          date: article.date ?? "",
          read_time: article.read_time ?? "",
          category: article.category ?? "",
        }}
        articleId={id}
      />
    </div>
  );
}