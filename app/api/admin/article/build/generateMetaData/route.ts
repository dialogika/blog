import Article from "@/lib/mongodb/models/Article";
import dbConnect from "@/lib/mongodb/mongodb";
import { corsHeaders } from "@/utils/corsHeaderSettings";
import { NextResponse } from "next/server";

// Function ini digunakan server/vercel untuk GET artikel blog di mongoDB yand idArticlenya sesuai
// dan kemudian di folder [idArticle]/page.tsx datanya akan diambil dan dijadikan metadata saat proses build di github pages
export const GET = async (request: Request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const idArticle = searchParams.get("idArticle");

    if (!idArticle) {
      return NextResponse.json({ status: 404, message: "idArticle not found" }, { status: 404, headers: corsHeaders });
    }
    const response = await Article.findOne({ idArticle }).lean();

    if (!response) {
      return NextResponse.json(
        {
          status: 404,
          message:
            "idArticle not found in mongoDB database collection, Please make sure document with said idArticle exist in mongoDB",
        },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json({ status: 200, data: response }, { status: 200, headers: corsHeaders });
  } catch (error: any) {
    console.error("Error in GET API route:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500, headers: corsHeaders });
  }
};
