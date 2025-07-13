import { generateIdArticle } from "@/lib/generateIdArticle";
import { BlogArticleProps } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk("blogList/fetchArticles", async () => {
  const response = await fetch("https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/");
  if (!response.ok) throw new Error("Failed to fetch articles");

  const data = await response.json();
  return data.articles as BlogArticleProps[];
});

export const searchArticlesByTitle = createAsyncThunk("blogList/searchArticlesByTitle", async (title: string) => {
  const idArticleQuery = generateIdArticle(title);
  const response = await fetch(
    `https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/?title=${idArticleQuery}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to search articles");
  return data.articles as BlogArticleProps[];
});

export const fetchArticleById = createAsyncThunk("blogList/fetchArticleById", async (idArticle: string) => {
  try {
    const response = await fetch(
      `https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/?idArticle=${idArticle}`,
      { method: "GET", headers: { "Content-type": "application/json" } }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch the article");

    return data.data as BlogArticleProps;
  } catch (error) {
    console.log("Error saat coba fetch article By ID :", error);
  }
});

interface BlogListState {
  articles: BlogArticleProps[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: BlogListState = {
  articles: [],
  status: "idle",
  error: null,
};

const blogListSlice = createSlice({
  name: "blogList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<BlogArticleProps[]>) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchArticlesByTitle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Redux setting untuk blogList
// const blogListSlice = createSlice({
//   name: "blogList",
//   initialState: {
//     articles: [] as BlogArticleProps[],
//   },
//   reducers: {
//     updateBlogList: (state, action) => {
//       state.articles = action.payload;
//     },
//   },
// });

// export const { updateBlogList } = blogListSlice.actions;
export default blogListSlice.reducer;
