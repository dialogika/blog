"use client";
import React, { useEffect, useState } from "react";
import "./../../../read/[idArticle]/style.css";
import { useSelector } from "react-redux";
import ArticleSection from "@/components/article/ArticleSection";
import { BlogArticleProps } from "@/types";
import { RootState } from "@/app/store";

const Page = () => {
  const [article, setArticle] = useState<BlogArticleProps>();
  const blogPreviewValue = useSelector((state: RootState) => state.blogPreview.blogPreviewProps);

  useEffect(() => {
    setArticle(blogPreviewValue);
  }, [blogPreviewValue]);

  return <>{article ? <ArticleSection article={article} /> : "Blog Article data not found"}</>;
};

export default Page;
