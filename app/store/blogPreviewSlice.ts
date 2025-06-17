import { createSlice } from "@reduxjs/toolkit";

const blogPreviewSlice = createSlice({
  name: "blogPreview",
  initialState: {
    blogPreviewProps: {
      idArticle: "",
      title: "",
      thumbnail: "",
      metaData: "",
      keywords: "",
      cta: "",
      cardsDescription: "",
      content: "",
      authors: [],
      writerNote: "",
      publishedAt: "",
      tags: [],
      outBoundLink: {
        title: "Medium Dialogika",
        link: "https://medium.com/dialogika",
      },
    },
  },
  reducers: {
    updateBlogPreviewState: (state, action) => {
      state.blogPreviewProps = { ...state.blogPreviewProps, ...action.payload };
    },
  },
});

export const { updateBlogPreviewState } = blogPreviewSlice.actions;
export default blogPreviewSlice.reducer;
