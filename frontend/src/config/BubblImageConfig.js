import BubblConfig from './BubblConfig';

// Supabase paths for image storage (used with parent stories and articles)
export const SUPABASE_PUBLIC_URL = `${BubblConfig.SUPABASE_URL}/storage/v1/object/public`;
export const ARTICLE_IMAGE_URL = `${SUPABASE_PUBLIC_URL}/article-images`;
