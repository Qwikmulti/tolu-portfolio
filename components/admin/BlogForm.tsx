"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowLeft, Eye, Send } from "lucide-react";
import { motion } from "framer-motion";

const blogSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  date: z.string().min(1, "Date is required"),
  read_time: z.string().min(1, "Read time is required"),
  category: z.string().min(1, "Category is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  articleId?: string;
}

export function BlogForm({ initialData, articleId }: BlogFormProps) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const isEditing = !!articleId;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: BlogFormData) => {
    const payload = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    if (isEditing) {
      await supabase.from("blog_articles").update(payload).eq("id", articleId);
    } else {
      await supabase.from("blog_articles").insert([{ ...payload, created_at: new Date().toISOString() }]);
    }

    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Title */}
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
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 shadow-sm"
        >
          <Send className="w-4 h-4" />
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
