import React from "react";
import "./style.css";
import { generatePaths } from "@/lib/generateStaticPaths";
import { blogArticleDummy, BlogArticleProps } from "@/public/data/dummyData";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SidebarSocial from "@/components/shared/SidebarSocial";
import SidebarWidget from "@/components/shared/SidebarWidgetUser";
import SidebarProgramOffer from "@/components/shared/SidebarProgramOffer";
import ArticleDetails from "@/components/article-page-component/ArticleDetails";

export default async function Page({ params }: any) {
  const { id } = await params;
  const blogArticle = blogArticleDummy.find((item: BlogArticleProps) => item.id.toString() === id);
  console.log("🚀 ~ Page ~ blogArticle:", blogArticle);

  // Tampilkan error jika blogArticle tidak ada
  if (!blogArticle) {
    return (
      <>
        <Breadcrumbs
          title="Artikel"
          breadcrumbs={[
            { title: "Home", link: "https://www.dialogika.co" },
            { title: "Blog", link: "../blog" },
          ]}
        />
        <section className="section min-vh-100 pt-5">
          <h1 className="text-black mt-5">Error: blogArticle Not Found!</h1>
        </section>
      </>
    );
  }

  // Tampilkan bagian dibawah ini jika blogArticle ada
  return (
    <>
      <Breadcrumbs
        title={blogArticle.title}
        breadcrumbs={[
          { title: "Home", link: "https://www.dialogika.co" },
          { title: "Blog", link: "../" },
          { title: blogArticle.keywords, link: "../blog" },
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
            <aside className="col-lg-1 mt-2">
              <SidebarSocial />
            </aside>

            {/* Section Konten Blog */}
            <div className="col-lg-7 mt-4">
              <article>{blogArticle.content}</article>
              <div className="meta-bottom">
                <i className="bi bi-folder"></i>
                <ul className="cats">
                  <li>
                    <a
                      target="_blank"
                      href="https://www.asuransireceh.co.id/blog/anxiety-bukan-kecemasan-biasa">
                      Anxiety, Bukan Kecemasan Biasa
                    </a>
                  </li>
                </ul>
              </div>

              <ArticleDetails />
            </div>

            {/* Section Blog Authors */}
            <aside className="col-lg-4 mt-4 gap-4 flex-column d-flex">
              {blogArticle.authors.map((item, index) => (
                <SidebarWidget
                  key={index}
                  author={item.authorName}
                  pageType={"article"}
                  imgPath={item.imgPath}
                />
              ))}

              <section className="sidebar mt-2 order-2 order-md-2">
                <div className="sidebar-item categories mt-4">
                  <h3 className="sidebar-title">Categories</h3>
                  <ul className="mt-3">
                    <li>
                      <a>Confidence </a>
                    </li>
                    <li>
                      <a>Interview </a>
                    </li>
                    <li>
                      <a>Productivity </a>
                    </li>
                    <li>
                      <a>Introvert </a>
                    </li>
                    <li>
                      <a>Communication </a>
                    </li>
                    <li>
                      <a>Presentation </a>
                    </li>
                  </ul>
                </div>
                <div className="sidebar-item tags mt-4">
                  <h3 className="sidebar-title">Tags</h3>
                  <ul className="mt-3">
                    {blogArticle.tags?.map((item, index) => (
                      <li key={index}>
                        <a>{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <SidebarProgramOffer />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

// Dynamic page generation during build
export async function generateStaticParams() {
  const paths = generatePaths(blogArticleDummy, "id");
  console.log("Generated paths: ", paths);
  return paths.filter((path) => !path.id.endsWith(".js.map"));
}
