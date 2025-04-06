"use client";
import React, { useEffect, useState } from "react";
import "./../../read/[idArticle]/style.css";
import ArticleSection from "@/components/article/ArticleSection";
import { BlogArticleProps } from "@/types";
import { getLocalStorageItem, StorageKeys } from "@/app/utils/localStorageUtils";

const Page = () => {
  const [article, setArticle] = useState<BlogArticleProps>();
  const blogPreviewValue = getLocalStorageItem<BlogArticleProps>(StorageKeys.NEW_ARTICLE_DRAFT);

  useEffect(() => {
    if (blogPreviewValue) setArticle(blogPreviewValue);
    console.log("🚀 ~ Page ~ blogPreviewValue:", blogPreviewValue);
  }, [blogPreviewValue]);

  return (
    <>
      {article ? (
        <>
          <ArticleSection article={article} />{" "}
          <button
            type="button"
            onClick={() => console.log("🚀 ~ Page ~ blogPreviewValue:", blogPreviewValue)}>
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
