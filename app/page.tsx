/* eslint-disable @next/next/no-img-element */
import ArticleLists from "@/components/article/ArticleLists";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {
  BottomRightBtn,
  ProgramOffer,
  Social,
  Widget,
} from "@/components/sidebars";
import logoDialogika from "@/public/assets/img/logo-square.png";
import { BlogArticleProps } from "@/types";

export const dynamic = 'force-dynamic';
export default async function Home() {
  try {
    console.log("Fetching Article ...");
    // Ganti jadi http://localhost:3000/blog/... untuk development di local
    const getArticle = await fetch(
      `https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!getArticle.ok) {
      console.error(
        `Error fetching articles: ${getArticle.status} ${getArticle.statusText}`
      );
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
            <div className="container">
              <h1 className="text-black mt-5">
                Error: Cannot connect to database!
              </h1>
              <h2 className="text-black mt-5">Please try again later</h2>
              <p>Status: {getArticle.status}</p>
            </div>
          </section>
          <Footer />
        </>
      );
    }

    const response = await getArticle.json();
    const articles: BlogArticleProps[] = response.data;

    // Check if we actually got articles data
    if (!articles || articles.length === 0) {
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
            <div className="container">
              <h1 className="text-black mt-5">No articles found</h1>
              <h2 className="text-black mt-5">Please check back later</h2>
            </div>
          </section>
          <Footer />
        </>
      );
    }

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

        <section id="blog-details" className="blog-details section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row">
              <aside className="col-lg-1 mt-4">
                <Social />
              </aside>

              <div className="col-lg-7 my-4 d-flex flex-column gap-4">
                <ArticleLists articles={articles} />
              </div>

              <aside className="col-lg-4 mt-4">
                <Widget
                  imgPath={logoDialogika}
                  author="Dialogika"
                  pageType="index"
                />
                <ProgramOffer />
              </aside>
            </div>
          </div>
          <BottomRightBtn />
        </section>
        <Footer />
      </>
    );
  } catch (error: any) {
    console.error("Error in Home component:", error);
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
          <div className="container">
            <h1 className="text-black mt-5">Error: Something went wrong</h1>
            <h2 className="text-black mt-5">Please try again later</h2>
            <p>Error details: {error.message}</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}
