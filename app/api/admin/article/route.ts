import Article from "@/lib/mongodb/models/Article";
import dbConnect from "@/lib/mongodb/mongodb";
import { BlogArticleProps } from "@/types";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  // Handle preflight request
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

// Function untuk mengirim artikel blog baru ke database
export const POST = async (request: Request) => {
  try {
    await dbConnect();

    const payload: Partial<BlogArticleProps> = await request.json();

    // Update artikel blog bila artikel dengan idArticle sudah ada, bila tidak ada maka buat baru
    const result = await Article.updateOne({ idArticle: payload.idArticle }, { $set: payload }, { upsert: true });

    return NextResponse.json({ status: "success", result }, { status: 200, headers: corsHeaders });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500, headers: corsHeaders });
  }
};

// Function untuk mengambil artikel blog dari database
export const GET = async (request: Request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const idArticle = searchParams.get("idArticle"); // Cari custom search params idArticle

    if (idArticle) {
      // Bila idArticle ada, return article dengan idArticle tersebut
      const article = await Article.findOne({ idArticle: idArticle }).lean();
      if (!article) {
        return NextResponse.json(
          { status: "error", message: "Article not found" },
          { status: 404, headers: corsHeaders }
        );
      }
      return NextResponse.json({ status: "success", data: article }, { status: 200, headers: corsHeaders });
    } else {
      // No idArticle provided: return 3 latest articles
      const limitParams = searchParams.get("limit");
      const limit = limitParams ? Number(limitParams) : 3;

      // Kirim GET request ke mongoDB, ambil data artikel yang sesuai dengan limit
      const articles = await Article.find().sort({ createdAt: -1 }).limit(limit);
      return NextResponse.json({ status: "success", data: articles }, { status: 200, headers: corsHeaders });
    }
  } catch (error: any) {
    console.error("Error in GET API route:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500, headers: corsHeaders });
  }
};

export const DELETE = async (request: Request) => {
  try {
    await dbConnect();
    console.log("backend trying to DELETE 1");

    // Parse the JSON body from the request
    const body = await request.json();
    const { idArticle } = body;

    console.log("backend trying to DELETE 2");

    if (!idArticle) {
      console.log("backend trying to DELETE 3");
      throw new Error("Missing idArticle parameter");
    }

    const res = await Article.deleteOne({ idArticle });
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error("Error deleting article:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
