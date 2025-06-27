import { BlogArticleProps } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk("blogList/fetchArticles", async () => {
  const response = await fetch("https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article/");
  if (!response.ok) throw new Error("Failed to fetch articles");

  const data = await response.json();
  return data.articles as BlogArticleProps[];
});

export const searchArticlesByTitle = createAsyncThunk(
  'blogList/searchArticlesByTitle',
  async (title: string) => {
    // We call the same endpoint but with a 'title' query parameter
    const response = await fetch(`/https://blog-admin-dialogikas-projects.vercel.app/blog/api/admin/article?title=${title}`);
    if (!response.ok) throw new Error('Failed to search articles');
    const data = await response.json();
    return data.articles as BlogArticleProps[];
  }
);


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
