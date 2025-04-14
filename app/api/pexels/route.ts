import { corsHeaders } from "@/utils/corsHeaderSettings";
import { NextResponse } from "next/server";

// Handle preflight OPTIONS requests
export function OPTIONS() {
  // An empty response with a 204 status code is fine.
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query, page = 1 } = body;

    console.log("Making request to Pexels API with query:", query, "and page:", page);
    const pexelsResponse = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&orientation=landscape&per_page=20&page=${page}`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY!,
        },
      }
    );

    if (!pexelsResponse.ok) {
      const errorData = await pexelsResponse.text();
      console.error("Error from Pexels API:", pexelsResponse.status, errorData);
      return NextResponse.json(
        { error: "Failed to fetch from Pexels" },
        { status: pexelsResponse.status, headers: corsHeaders }
      );
    }

    const data = await pexelsResponse.json();
    return NextResponse.json(data, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Exception in API route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}
