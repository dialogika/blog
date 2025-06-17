"use client";
import { BlogArticleProps } from "@/types";
import { formatDate } from "@/components/utils/date";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export interface articlesProps {
  articles: BlogArticleProps[];
}

const ArticleLists = ({ articles: initialArticles }: articlesProps) => {
  const [articles, setArticles] = useState<BlogArticleProps[]>(initialArticles);
  const [visibleArticles, setVisibleArticles] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleShowMore = async () => {
    setLoading(true);
    try {
      // Calculate how many more articles we need
      const currentCount = articles.length;
      const nextVisibleCount = visibleArticles + 3;

      // If we need more articles than we currently have, fetch more
      if (nextVisibleCount > currentCount && hasMore) {
        const response = await fetch(
          `https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/?limit=${nextVisibleCount}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.data.length <= currentCount) {
            // If we didn't get any new articles, there are no more to load
            setHasMore(false);
          }
          setArticles(data.data);
        } else {
          console.error("Failed to fetch more articles");
        }
      }

      // Update the number of visible articles
      setVisibleArticles(nextVisibleCount);
    } catch (error) {
      console.error("Error fetching more articles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {articles.slice(0, visibleArticles).map((article, index) => (
        <article className="article" key={index}>
          <div className="post-img">
            <Image
              src={article.thumbnail.trim()}
              alt={article.keywords}
              width={745}
              height={400}
              className="img-fluid w-100 object-fit-cover"
            />
          </div>

          <h1 className="title">
            <Link href={`read/${article.idArticle}`} target="_blank">
              {article.title}
            </Link>
          </h1>

          <div className="meta-top my-4">
            <ul>
              {article.authors.map((author, index) => (
                <li className="d-flex align-items-center" key={index}>
                  <i className="bi bi-person"></i>
                  <Link href={`read/${article.idArticle}`} target="_blank">
                    {author.authorName}
                  </Link>
                </li>
              ))}
              <li className="d-flex align-items-center">
                <i className="bi bi-clock"></i>
                <Link href={`read/${article.idArticle}`}>
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>
                </Link>
              </li>
            </ul>
          </div>

          <div className="content">
            <p>{article.cardsDescription}</p>
            <div className="d-flex justify-content-end">
              <Link
                href={`read/${article.idArticle}`}
                target="_blank"
                className="btn appointment-btn"
              >
                Read More
              </Link>
            </div>
          </div>

          <br />

          <div className="meta-bottom">
            <i className="bi bi-folder"></i>
            <ul className="cats">
              <li>
                <Link href={`read/${article.idArticle}`}>Tips</Link>
              </li>
            </ul>
          </div>
        </article>
      ))}

      <div className="text-center mt-4">
        <button
          className="appointment-btn"
          id="show-more-btn"
          style={{ border: "none" }}
          onClick={handleShowMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "More Article"}
        </button>
      </div>
    </>
  );
};

export default ArticleLists;
