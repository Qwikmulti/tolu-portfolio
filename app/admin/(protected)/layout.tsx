import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/admin/Sidebar";
import { Providers } from "@/components/admin/Providers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: { email?: string } | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (err) {
    console.error("Admin auth error:", err);
  }

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <Providers>
      <div className="md:pl-60 min-h-screen bg-soft-white">
        <Sidebar userEmail={user.email ?? ""} />
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </Providers>
  );
}
