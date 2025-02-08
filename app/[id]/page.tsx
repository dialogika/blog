import React from "react";
import AllProducts from "@/public/data/product";
import { isMerchandise, ProductProps } from "@/public/data/product/productProps";
import "./style.css";
import { generatePaths } from "@/lib/generateStaticPaths";
import { Metadata } from "next";
import ProductImages from "@/components/article-page-component/ProductImages";

export const metadata: Metadata = {
  title: "Product Details",
};

export default async function Page({ params }: any) {
  const { id } = await params;
  // Find the product based on the ID from params
  const product = AllProducts.find((item: ProductProps) => item.id.toString() === id);

  // Show an error page if the product is not found
  if (!product) {
    return (
      <main className="section min-vh-100 pt-5">
        <h1 className="text-black mt-5">Error: Product Not Found!</h1>
      </main>
    );
  }

  return (
    <>
      <main className="section min-vh-100">
        <section
          className="section"
          style={{ marginTop: 200 }}>
          <article className="container">
            <div className="row">
              <div className="col-12 col-md-3">
                <div>
                   {/* Start of Gambar Product */}

                  <ProductImages imgArray={product.gambar} />
                  
                </div>
              </div>
              <div className="col-12 col-md-6">
                {/* Product Description */}
                <div>
                  <h1><b>{product.title}</b></h1>
                  <h2>Rp{product.price}</h2>
                  <div>
                      {/* Tampilkan harga sebelum diskon bila ada */}
                      {product.discountValue && product.discountValue > 1 && (
                        <p
                        className="text-secondary fw-bold mb-0 w-auto"
                        >
                        <del>Rp. {(product.price + product.discountValue).toLocaleString()}</del>
                        <span className="text-danger mx-1 fw-bold">{product.discountPercentage?.toLocaleString()}%</span>
                      </p>
                      )

                      }
                  </div>
                    
                
                  {isMerchandise(product) && <div>{product.stock}</div>}
                  <div dangerouslySetInnerHTML={{ __html: product.deskripsi }} />
                  <div>
                 
                  </div>
                 
                </div>
                {/* End of Gambar Product */}
              </div>
              <div className="col-12 col-md-3">
                <div className="roundedBorder">
                  <h4><b>Atur jumlah dan catatan</b></h4>
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <div className="button-group">

                    <button className="border-1 border-primary  rounded me-2 px-4  text-black ">Buy</button>
                    
                  </div>
                </div>
  
              </div>
            </div>
          </article>
          
        </section>
      </main>
    </>
  );
}

// Dynamic page generation during build
export async function generateStaticParams() {
  const paths = generatePaths(AllProducts, "id");
  console.log("Generated paths: ", paths);
  return paths;
}
