export function createSlug(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .trim();
}

export function extractId(slug: string): string {
  if (!slug) return '';
  // Fallback for old links that might still have --ID
  const parts = slug.split('--');
  return parts.length > 1 ? parts[parts.length - 1] : slug;
}
