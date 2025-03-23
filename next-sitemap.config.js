/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dialogika.co",
  generateRobotsTxt: true, // (optional)
  // Change the following as needed, for example if your blog is in /blog
  sitemapSize: 7000,
  outDir: "./out", // match your Next.js export folder (or build folder)
};
