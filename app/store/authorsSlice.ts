import { createSlice } from "@reduxjs/toolkit";

// Slice untuk menyimpan data author
const authorsDetailSlice = createSlice({
  name: "authorsDetail", // Nama slice
  // Initial state untuk authorsDetail
  initialState: {
    authorsDetail: [
      {
        authorName: "Author Placeholder",
        imgPath: "https://www.poultryworld.net/app/uploads/2021/03/John-Doe-10-1536x1536.jpg",
        quotes: "Please choose another author OR refresh page",
      },
    ],
  },
  reducers: {
    // Reducer untuk meng-update data author
    updateAuthorsState: (state, action) => {
      state.authorsDetail = action.payload;
    },
  },
});

// Ekspor action atau reducer-nya
export const { updateAuthorsState } = authorsDetailSlice.actions; // set updateAuthorsState as action
export default authorsDetailSlice.reducer;
