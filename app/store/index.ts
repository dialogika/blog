// Menggabungkan slice store seperti author dan blog slice kedalam satu store
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authorReducer from "./authorsSlice";
import blogListReducer from "./blogListSlice";
import blogPreviewReducer from "./blogPreviewSlice";

const rootReducer = combineReducers({
  authors: authorReducer,
  blogList: blogListReducer,
  blogPreview: blogPreviewReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
