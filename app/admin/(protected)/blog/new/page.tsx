import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl font-bold text-navy">New Article</h1>
        <p className="text-charcoal/50 text-sm mt-1">Write and publish a new blog article.</p>
      </div>
      <BlogForm />
    </div>
  );
}