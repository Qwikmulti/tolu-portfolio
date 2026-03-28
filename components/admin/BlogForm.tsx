"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Title</label>
        <input
          {...register("title")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy focus:outline-none focus:border-gold transition-colors"
          placeholder="How to Write a BRD"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1">Slug</label>
        <input
          {...register("slug")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy focus:outline-none focus:border-gold transition-colors"
          placeholder="how-to-write-a-brd"
        />
        {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Category</label>
          <input
            {...register("category")}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy focus:outline-none focus:border-gold transition-colors"
            placeholder="Skills"
          />
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Date</label>
          <input
            {...register("date")}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy focus:outline-none focus:border-gold transition-colors"
            placeholder="March 2026"
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Read Time</label>
          <input
            {...register("read_time")}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy focus:outline-none focus:border-gold transition-colors"
            placeholder="8 min read"
          />
          {errors.read_time && <p className="text-red-500 text-xs mt-1">{errors.read_time.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1">Excerpt</label>
        <textarea
          {...register("excerpt")}
          rows={2}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy focus:outline-none focus:border-gold transition-colors resize-none"
          placeholder="A brief description of the article..."
        />
        {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1">Content (HTML)</label>
        <textarea
          {...register("content")}
          rows={12}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy focus:outline-none focus:border-gold transition-colors font-mono text-sm resize-none"
          placeholder="<p>Your article content here...</p>"
        />
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update Article" : "Publish Article"}
        </button>
        <Link
          href="/admin/blog"
          className="px-6 py-2.5 border border-gray-200 text-charcoal/50 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}