// ArticlesWithLoadMore.tsx
"use client";

import { useState } from "react";
import ArticleLists from "@/components/article/ArticleLists";
import { BlogArticleProps } from "@/types";

export default function ArticlesWithLoadMore({
  articles,
}: {
  articles: BlogArticleProps[];
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < articles.length;
  console.log("Artikel yang diterima di client:", articles.length);

  return (
    <>
      <ArticleLists articles={visibleArticles} />

      {hasMoreArticles && (
        <div className="text-center mt-4">
          <button onClick={loadMore} className="btn btn-primary">
            Load More
          </button>
        </div>
      )}
    </>
  );
}
