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

const handleError = (error: unknown, context: string): NextResponse => {
  // Log the full error for better server-side debugging
  console.error(`[API_ERROR] Context: ${context}`, {
    timestamp: new Date().toISOString(),
    error: error,
  });

  const message = error instanceof Error ? error.message : "An unknown internal server error occurred.";

  return NextResponse.json(
    {
      status: "error",
      message: `Failed during ${context} operation.`,
      errorDetail: message,
    },
    { status: 500, headers: corsHeaders }
  );
};
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
    return handleError(error, "POST");
  }
};

export const GET = async (request: Request) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const idArticle = searchParams.get("idArticle");
    const titleQuery = searchParams.get("title");

    if (idArticle) {
      const article = await Article.findOne({ idArticle }).lean();
      if (!article)
        return NextResponse.json(
          { status: "error", message: `Article dengan id: ${idArticle} tidak ditemukan` },
          { status: 404, headers: corsHeaders }
        );

      return NextResponse.json({ status: "success", data: article }, { status: 200, headers: corsHeaders });
    } else if (titleQuery) {
      const articles = await Article.find({ idArticle: { $regex: titleQuery, $options: "i" } })
        .select({ title: 1, idArticle: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();

      return NextResponse.json({ status: "success", articles: articles }, { status: 200, headers: corsHeaders });
    } else {
      const limitParams = searchParams.get("limit");
      const limit = limitParams ? Number(limitParams) : 3;

      const articles = limit
        ? await Article.find().sort({ createdAt: -1 }).limit(limit)
        : await Article.find().sort({ createdAt: -1 });

      return NextResponse.json({ status: "success", data: articles }, { status: 200, headers: corsHeaders });
    }
  } catch (error: any) {
    return handleError(error, "GET");
  }
};

export const DELETE = async (request: Request) => {
  try {
    await dbConnect();

    // Parse the JSON body from the request
    const body = await request.json();
    const { idArticle } = body;

    if (!idArticle) throw new Error("Missing idArticle parameter");

    const res = await Article.deleteOne({ idArticle });
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error("Error deleting article:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
