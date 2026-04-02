"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { blogSchema, type BlogData } from "@/lib/validations";

interface BlogFormProps {
  initialData?: Partial<BlogData>;
  articleId?: string;
}

export function BlogForm({ initialData, articleId }: BlogFormProps) {
  const router = useRouter();
  const isEditing = !!articleId;
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogData>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: BlogData) => {
    setError(null);
    try {
      const url = isEditing ? `/api/admin/blog/${articleId}` : "/api/admin/blog";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to save article");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-rose-50 border border-rose-200 text-rose-600 text-sm px-5 py-3.5 rounded-xl"
        >
          {error}
        </motion.div>
      )}

      {/* Title + Slug */}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm space-y-5">
        <h2 className="font-display text-lg font-bold text-navy">Article Details</h2>
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Title</label>
          <input
            {...register("title")}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
            placeholder="How to Write a Winning BRD"
          />
          {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
            Slug <span className="text-stone-300 font-normal">(URL-friendly)</span>
          </label>
          <input
            {...register("slug")}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-navy text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
            placeholder="how-to-write-a-winning-brd"
          />
          {errors.slug && <p className="text-rose-500 text-xs mt-1">{errors.slug.message}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Category</label>
            <input
              {...register("category")}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
              placeholder="Skills"
            />
            {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Date</label>
            <input
              {...register("date")}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
              placeholder="March 2026"
            />
            {errors.date && <p className="text-rose-500 text-xs mt-1">{errors.date.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Read Time</label>
            <input
              {...register("read_time")}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
              placeholder="8 min read"
            />
            {errors.read_time && <p className="text-rose-500 text-xs mt-1">{errors.read_time.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Excerpt <span className="text-stone-300 font-normal">(optional)</span></label>
          <textarea
            {...register("excerpt")}
            rows={2}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all resize-none"
            placeholder="A brief description shown on the blog listing..."
          />
          {errors.excerpt && <p className="text-rose-500 text-xs mt-1">{errors.excerpt.message}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-navy">Content</h2>
          <span className="text-xs text-stone-400 font-mono">HTML format</span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Body <span className="text-stone-300 font-normal">(HTML)</span></label>
          <textarea
            {...register("content")}
            rows={16}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-navy text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all resize-y"
            placeholder="<p>Your article content here...</p>"
          />
          {errors.content && <p className="text-rose-500 text-xs mt-1">{errors.content.message}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50 shadow-sm"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {isSubmitting ? "Saving..." : isEditing ? "Update Article" : "Publish Article"}
        </button>
        <Link
          href="/admin/blog"
          className="flex items-center gap-2 px-6 py-3 border border-stone-200 text-stone-500 hover:text-navy hover:bg-stone-50 rounded-xl transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>
    </motion.form>
  );
}
