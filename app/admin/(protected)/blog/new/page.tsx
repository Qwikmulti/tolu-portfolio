import { BlogForm } from "@/components/admin/BlogForm";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function NewBlogPage() {
  return (
    <div className="space-y-8">
      <AdminHeader
        title="New Article"
        subtitle="Write and publish a new blog article for your readers."
      />
      <BlogForm />
    </div>
  );
}
