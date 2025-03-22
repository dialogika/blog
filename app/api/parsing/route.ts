import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import dbConnect from "@/lib/mongodb/mongodb";
import Article from "@/lib/mongodb/models/Article";
import { BlogArticleProps } from "@/types";
import { authorData } from "@/public/data/authorData";

// CORS Headers for API responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Default values
const DEFAULT_THUMBNAIL =
  "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const DEFAULT_META_DESCRIPTION =
  "Dialogika Blog: Learn tips and best practices from our Dialogika mentor and team on topics from Mental Health & Social Science and Mindset to Public Speaking.";
const DEFAULT_KEYWORDS = "Blog Dialogika, Public Speaking";

// Generate idArticle dari titlenya
const generateArticleId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

// Cleaned code to extracts authors from the page using common logic for both old and new content
const getAuthors = ($: cheerio.Root): BlogArticleProps["authors"] => {
  const authors: BlogArticleProps["authors"] = [];
  $(".blog-author").each((_, elem) => {
    const authorName = $(elem).find("h4").text().trim();
    const quotes = $(elem).find("p").text().trim();
    const oldImgPath = $(elem).find("img").attr("src") || "";
    const isOldImgPath = oldImgPath.startsWith("asset/img");
    const matchedAuthor = authorData.find((author) => author.authorName.toLowerCase() === authorName.toLowerCase());
    const updatedImgPath = matchedAuthor && isOldImgPath ? matchedAuthor.imgPath : oldImgPath;
    authors.push({ authorName, imgPath: updatedImgPath, quotes });
  });
  return authors;
};

// Parses konten dari artikel blog lama
const parseOldArticle = ($: cheerio.Root): BlogArticleProps | null => {
  const oldContentContainer = $(".blog article").html();
  if (!oldContentContainer) return null;

  const title = $("article .entry-title a").text().trim();
  if (!title) return null;

  const idArticle = generateArticleId(title);
  const publishedAt = $("article .meta-top time").attr("datetime") || new Date().toISOString();
  const thumbnail = $("article .entry-img img").attr("src") || DEFAULT_THUMBNAIL;
  const metaData = $("meta[name='description']").attr("content") || DEFAULT_META_DESCRIPTION;
  const keywords = $("meta[name='keywords']").attr("content") || DEFAULT_KEYWORDS;

  // Clone dan remove div dengan class "entry-footer.clearfix"
  const cleanContent = $("article .entry-content").clone();
  cleanContent.find(".entry-footer.clearfix").remove();
  const cleanedContent = cleanContent.html() || "";

  const authors = getAuthors($);
  const writerNote = $(".comments .comment p").text().trim() || "Semoga artikel blog ini bermanfaat 🙏🙏🙏";

  // Tambahkan tags berikut karna blog sebelumnya tidak ada
  const tags = ["#Dialogika", "#PublicSpeaking"];
  const externalTitle = $(".tags li a").text().trim() || "Medium";
  const externalLink = $(".tags li a").attr("href") || "";
  const replaceExternalLink = externalLink && externalLink.length >= 15 ? externalLink : "https://medium.com/dialogika";

  const outBoundLink = { title: externalTitle, link: replaceExternalLink };

  return {
    idArticle,
    title,
    thumbnail,
    metaData,
    keywords,
    content: cleanedContent,
    authors,
    writerNote,
    publishedAt,
    tags,
    outBoundLink,
  };
};

// Parse konten artikel blog yang "terbaru"
const parseNewArticle = async ($: cheerio.Root): Promise<BlogArticleProps | null> => {
  const latestContentContainer = $("article .content").html();
  if (!latestContentContainer) return null;

  const title = $("article .title").text().trim();
  if (!title) return null;

  const idArticle = generateArticleId(title);
  const publishedAt = $("article .meta-top time").attr("datetime") || new Date().toISOString();
  const thumbnail = $("article .post-img img").attr("src") || DEFAULT_THUMBNAIL;
  const metaData = $("meta[name='description']").attr("content") || DEFAULT_META_DESCRIPTION;
  const keywords = $("meta[name='keywords']").attr("content") || DEFAULT_KEYWORDS;

  const authors = getAuthors($);
  const writerNote = $(".comments .comment p").text().trim();

  // Extract tags
  const tags: BlogArticleProps["tags"] = [];
  $(".sidebar ul li").each((_, elem) => {
    const tagText = $(elem).find("a").text().trim();
    if (tagText) tags.push(tagText);
  });

  const externalTitle = $(".meta-bottom .cats a").text().trim() || "Medium";
  const externalLink = $(".meta-bottom .cats a").attr("href") || "https://medium.com/dialogika";
  const outBoundLink = { title: externalTitle, link: externalLink };

  const articleData: BlogArticleProps = {
    idArticle,
    title,
    thumbnail,
    metaData,
    keywords,
    content: latestContentContainer,
    authors,
    writerNote,
    publishedAt,
    tags,
    outBoundLink,
  };

  // Optional: Uncomment the following lines to send data to your backend
  /*
  const response = await fetch("http://localhost:3000/blog/api/admin/article/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(articleData),
  });
  await response.json();
  */

  return articleData;
};

// Determines which parser to use based on the content structure
const parseBlogFromURL = async (url: string): Promise<BlogArticleProps | null> => {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;

    const html = await res.text();
    const $ = cheerio.load(html);

    // If the old container exists, parse as old content; otherwise check for new content.
    if ($(".blog article").length > 0) {
      console.log("Parsing old content structure.");
      return parseOldArticle($);
    } else if ($("article .content").length > 0) {
      console.log("Parsing new content structure.");
      return await parseNewArticle($);
    } else {
      console.log("No valid article content found.");
      return null;
    }
  } catch (error) {
    console.error(`Error parsing URL ${url}:`, error);
    return null;
  }
};

export async function POST(request: Request) {
  try {
    // Uncomment when database connection is needed.
    await dbConnect();

    // Expect a JSON body with an array of URLs.
    const { urls } = await request.json();
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided." }, { status: 400, headers: corsHeaders });
    }

    // Parse all URLs in parallel
    const parsedArticles = await Promise.all(urls.map((url) => parseBlogFromURL(url)));
    const validArticles = parsedArticles.filter((article) => article !== null) as BlogArticleProps[];

    if (validArticles.length === 0) {
      return NextResponse.json({ error: "No valid articles were found." }, { status: 400, headers: corsHeaders });
    }

    // Optional: Prepare bulk operations for DB upsert.

    const bulkOps = validArticles.map((article) => ({
      updateOne: {
        filter: { idArticle: article.idArticle },
        update: { $set: article },
        upsert: true,
      },
    }));
    const bulkResult = await Article.bulkWrite(bulkOps);
    console.log("Berhasil kirim bulk data ke mongoDB");
    return NextResponse.json(
      { status: "success", count: validArticles.length, bulkResult },
      { status: 200, headers: corsHeaders }
    );
    // return NextResponse.json({ status: 200, message: "success", data: validArticles }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error importing articles:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500, headers: corsHeaders });
  }
}

// export async function GET(request: Request) {
//   try {
//     // Ganti targetUrl dengan URL yang diinginkan, misal repository GitHub
//     const targetUrl = "https://github.com/dialogika/blog";
//     const res = await fetch(targetUrl);
//     const html = await res.text();

//     // Muat HTML ke Cheerio untuk parsing
//     const $ = cheerio.load(html);

//     // Contoh: Ambil nama file dari elemen yang memiliki class "js-navigation-open"
//     const fileNames: string[] = [];
//     $("table .react-directory-row .react-directory-row-name-cell-large-screen .react-directory-truncate a").each(
//       (index, element) => {
//         const name = $(element).text().trim();
//         if (name && name !== "..") {
//           fileNames.push(name);
//         }
//       }
//     );

//     // Kembalikan hasil parsing sebagai JSON dengan header CORS
//     return new Response(JSON.stringify({ data: fileNames }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         ...corsHeaders,
//       },
//     });
//   } catch (error) {
//     console.error("Error parsing HTML:", error);
//     return new Response(JSON.stringify({ error: "Terjadi kesalahan saat parsing HTML" }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//         ...corsHeaders,
//       },
//     });
//   }
// }
