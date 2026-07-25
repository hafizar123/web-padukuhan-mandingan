import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload file ke Supabase Storage
 * @param file - File yang akan diupload
 * @param bucket - Nama bucket (misal: "trash-reports", "foto-desa")
 * @param path - Path file di dalam bucket
 * @returns URL publik file atau null jika gagal
 */
export async function uploadFile(
  file: File,
  bucket: string,
  path: string
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
}
