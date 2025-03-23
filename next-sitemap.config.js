/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.dialogika.co", // The main domain
  basePath: "/blog",                   // Serve your site from /blog
  generateRobotsTxt: true,            // Generates a robots.txt
  sitemapSize: 7000,
  outDir: "./out",                    // Matches your Next.js export folder
};
