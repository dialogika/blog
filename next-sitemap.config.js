/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dialogika.co/blog", // The blog home page. 23-03-2025 Saat ini di tambahkan /blog diakhir siteUrlnya secara manual
  basePath: "/blog", // Serve your site from /blog
  generateRobotsTxt: true, // Generates a robots.txt
  sitemapSize: 7000,
  changefreq: "monthly",
  trailingSlash: true,
  outDir: "./out",
};
