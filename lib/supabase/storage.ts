import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function uploadGuide(file: File) {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const path = `guides/${fileName}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { data, error } = await supabase.storage
    .from("guides")
    .upload(path, buffer, { contentType: file.type });

  if (error) throw error;
  return path;
}

export async function getPublicUrl(path: string) {
  const { data } = supabase.storage.from("guides").getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteGuide(path: string) {
  await supabase.storage.from("guides").remove([path]);
}
