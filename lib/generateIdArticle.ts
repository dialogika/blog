// Function dibawah ini akan remove simbol dan ubah whitespace jadi '-'

export const generateIdArticle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove disallowed symbols
    .replace(/\s+/g, "-")        // Replace spaces with hyphens
    .replace(/-+/g, "-");       // Replace multiple hyphens with one
};