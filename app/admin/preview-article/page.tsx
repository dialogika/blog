"use client";
import React, { useEffect, useState } from "react";
import "./../../read/[idArticle]/style.css";
import ArticleSection from "@/components/article/ArticleSection";
import { BlogArticleProps } from "@/types";
import {
  getLocalStorageItem,
  StorageKeys,
} from "@/app/utils/localStorageUtils";

const Page = () => {
  const [article, setArticle] = useState<BlogArticleProps>();

  useEffect(() => {
    const saved = getLocalStorageItem<BlogArticleProps>(
      StorageKeys.NEW_ARTICLE_DRAFT
    );
    if (saved) {
      setArticle(saved);
      console.log("🚀 ~ Page ~ blogPreviewValue:", saved);
    }
  }, []);

  return (
    <>
      {article ? (
        <>
          <ArticleSection article={article} />
          <button
            type="button"
            onClick={() => console.log("🚀 ~ Current Article ~", article)}
          >
            Test
          </button>
        </>
      ) : (
        "Blog Article data not found"
      )}
    </>
  );
};

export default Page;
