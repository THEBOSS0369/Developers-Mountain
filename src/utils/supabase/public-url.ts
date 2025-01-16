export function getPublicImageURL(bucketName: string, filePath: string | null) {
  if (!filePath) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`;
}
