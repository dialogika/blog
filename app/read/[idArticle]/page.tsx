import React from "react";
import "./style.css";
import { BlogArticleProps } from "@/types";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Metadata } from "next";
import Script from "next/script";
import ArticleSection from "@/components/article/ArticleSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

type PageParams = Promise<{ idArticle: string[] }>;
export default async function Page(props: { params: PageParams }) {
  const { idArticle } = await props.params;

  try {
    const res = await fetch(
      `https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/?idArticle=${idArticle}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    // Tampilkan error jika blogArticle tidak ada
    if (!res.ok) {
      return (
        <>
          <Header />
          <Breadcrumbs
            title="Article"
            breadcrumbs={[
              { title: "Home", link: "https://www.dialogika.co" },
              { title: "Blog", link: "../blog" },
            ]}
          />
          <section className="section min-vh-100 pt-5">
            <h1 className="text-black mt-5">Error: blogArticle Not Found!</h1>
          </section>
          <Footer />
        </>
      );
    }
    // Respon dari server ke mongoDB adalah artikel blog/document yang tinggal digunakan
    const response = await res.json();
    const article: BlogArticleProps = response.data;

    // Set metadata untuk JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaData || "Read our latest article on Dialogika Blog.",
      author: {
        "@type": "Person",
        name: article.authors?.[0]?.authorName || "Dialogika Team",
      },
      datePublished: article.publishedAt,
      image: article.thumbnail || "https://www.dialogika.co/assets/img/logo.webp",
      publisher: {
        "@type": "Organization",
        name: "Dialogika",
        logo: {
          "@type": "ImageObject",
          url: "https://www.dialogika.co/assets/img/logo.webp",
        },
      },
    };

    // Tampilkan bagian dibawah ini jika blogArticle ada
    return (
      <>
        <Script
          id="json-ld-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ArticleSection article={article} />
      </>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
  }
}

// Automatically generate halaman html sesuai dengan jumlah artikel yang ada di database saat proses build di github pages
export async function generateStaticParams() {
  try {
    const res = await fetch(
      "https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/build/generateStaticParams/"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch article IDs for static generation");
    }
    const articles = await res.json();
    if (!articles || articles.length === 0) {
      throw new Error("No article IDs found for static generation");
    }
    return articles.map((article: any) => ({
      idArticle: article.idArticle.toString(),
    }));
  } catch (error) {
    console.error("Error fetching article IDs:", error);

    return [
      { idArticle: "default-article-id" }, // Replace with a known fallback ID if appropriate
    ];
  }
}

// Generate dynamic metadata for each article page.
export async function generateMetadata(props: { params: PageParams }): Promise<Metadata> {
  const { idArticle } = await props.params;
  try {
    const response = await fetch(
      `https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/build/generateMetaData/?idArticle=${idArticle}`,
      { method: "GET" }
    );
    if (!response.ok) {
      return {
        title: "Article Not Found",
        description: `No article found with id: ${idArticle}`,
      };
    }
    const result = await response.json();
    const article: BlogArticleProps = result.data;
    if (!article) {
      return {
        title: "Article Not Found",
        description: `No article found with id: ${idArticle}`,
      };
    }
    return {
      title: article.title,
      description: article.metaData || "Read our latest article on Dialogika Blog.",
      keywords: article.keywords || "Public Speaking, Dialogika, Berbicara Didepan Umum",
      authors: [{ name: article.authors?.[0]?.authorName || "Dialogika Team" }],
      openGraph: {
        title: article.title,
        description: article.metaData || "Read our latest article on Dialogika Blog.",
        url: `https://www.dialogika.co/blog/read/${article.idArticle}`,
        siteName: "Dialogika | Kelas Public Speaking",
        images: [
          {
            url: article.thumbnail || "https://www.dialogika.co/assets/img/logo.webp",
            alt: article.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        site: "@dialogika_co",
        title: article.title,
        description: article.metaData || "Read our latest article on Dialogika Blog.",
        images: [article.thumbnail || "https://www.dialogika.co/assets/img/logo.webp"],
      },
      icons: {
        icon: `https://www.dialogika.co/assets/img/favicon.webp`,
        apple: `https://www.dialogika.co/assets/img/apple-touch-icon.webp`,
      },
    };
  } catch (error: any) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "Error fetching article metadata.",
    };
  }
}
