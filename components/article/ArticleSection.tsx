"use client";
import React from "react";
import Breadcrumbs from "../layout/Breadcrumbs";
import { ProgramOffer, Social, Widget } from "../sidebars";
import Image from "next/image";
import Link from "next/link";
import ArticleDetails from "./ArticleDetails";
import { formatDate } from "../utils/date";
import star from "@/public/assets/img/next.png";
import { BlogArticleProps } from "@/types";

const ArticleSection = ({ article }: { article: BlogArticleProps }) => {
  const categoriesList = ["Confidence", "Interview", "Productivity", "Introvert", "Communication", "Presentation"];
  return (
    <>
      <Breadcrumbs
        title={article.title}
        breadcrumbs={[
          { title: "Home", link: "https://www.dialogika.co" },
          { title: "Blog", link: "../" },
          { title: article.keywords, link: "../blog" },
        ]}
      />
      <section
        id="blog-details"
        className="blog-details my-5">
        <div
          className="container"
          data-aos="fade-up"
          data-aos-delay="100">
          <div className="row">
            {/* Section Sidebar Social Media */}
            <aside className="col-lg-1 mt-3">
              <Social />
            </aside>

            {/* Section Konten Blog */}
            <div className="col-lg-7 mt-3">
              <article className="article p-0">
                <div
                  className="post-img position-relative m-0"
                  style={{ borderRadius: 10 }}>
                  <Image
                    src={article.thumbnail.trimEnd()}
                    alt="Kesalahan Komunikasi"
                    className="img-fluid"
                    width={800}
                    height={490}
                  />
                </div>

                <h1 className="title mt-0 px-4 mt-4">{article.title}</h1>
                <div className="meta-top px-4 py-1">
                  <ul>
                    {/* List author yang menulis article */}
                    {article.authors.map((author, index) => (
                      <li
                        className="d-flex align-items-center"
                        key={index}>
                        <i className="bi bi-person"></i>
                        <Link
                          href={`${article.idArticle}`}
                          target="_blank">
                          {author.authorName.toString()}
                        </Link>
                      </li>
                    ))}
                    <li className="d-flex align-items-center">
                      <i className="bi bi-clock"></i>
                      <Link href={`${article.idArticle}`}>
                        <time dateTime={`${article.publishedAt.toString()}`}>
                          {formatDate(article.publishedAt.toString())}
                        </time>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Isi konten dari artikel blog */}
                <div
                  className="content p-4"
                  dangerouslySetInnerHTML={{ __html: article.content }}></div>
                <div className="meta-bottom d-flex gap-2 align-items-center px-4 py-3">
                  <i className="bi bi-folder"></i>
                  <ul className="cats">
                    <li>
                      <a
                        target="_blank"
                        href={`${article.outBoundLink?.link}`}>
                        {article.outBoundLink?.title}
                      </a>
                    </li>
                  </ul>
                </div>
              </article>

              <ArticleDetails {...article} />
            </div>

            {/* Section Blog Authors */}
            <aside className="col-lg-4 mt-3 gap-4 flex-column d-flex">
              {article.authors.map((item, index) => (
                <Widget
                  key={index}
                  author={item.authorName}
                  pageType={"article"}
                  imgPath={item.imgPath}
                />
              ))}

              {/* Section Categories dan Tags */}
              <section className="sidebar mt-2 order-2 order-md-2">
                <div className="sidebar-item categories mt-4">
                  <h3 className="sidebar-title">Categories</h3>
                  <ul className="mt-3">
                    {categoriesList.map((category, index) => (
                      <li key={index}>
                        <a>{category}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar-item tags mt-4">
                  <h3 className="sidebar-title">Tags</h3>
                  <ul className="mt-3">
                    {article.tags?.map((item, index) => (
                      <li key={index}>
                        <a>{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <ProgramOffer />
            </aside>
          </div>
        </div>

        <a
          href="#tagging-up"
          className="back-to-top d-flex align-items-center justify-content-center active">
          <Image
            src={`${star}`}
            width={10}
            height={10}
            alt=""
          />
        </a>
      </section>
    </>
  );
};

export default ArticleSection;
