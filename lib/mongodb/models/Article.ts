import mongoose, { Schema, Document, Model } from "mongoose";
import { BlogArticleProps } from "@/types";

// Omit the _id property from BlogArticleProps because Document already defines it.
export interface IArticle extends Omit<BlogArticleProps, "_id">, Document {}

// Define the sub-schema for authors
const AuthorSchema = new Schema({
  authorName: { type: String, required: true },
  imgPath: { type: String, required: true },
  quotes: { type: String, default: "No quotes from me 🤪" },
});


// Define the sub-schema for outbound links
const OutBoundLinkSchema = new Schema({
  title: { type: String, default: "Medium Dialogika" },
  link: { type: String, default: "https://medium.com/dialogika" },
});

// Define the main Article schema using the IArticle interface
const articleSchema = new Schema<IArticle>(
  {
    idArticle: {
      type: String,
      required: [true, "Please provide an id from title"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a title for this article"],
    },
    thumbnail: {
      type: String,
      required: [true, "Please provide a thumbnail URL"],
    },
    metaData: {
      type: String,
      required: [true, "Please provide meta data"],
    },
    keywords: {
      type: String,
      required: [true, "Please provide keywords"],
    },
    cta: { type: String, default: undefined },
    cardsDescription: { type: String, default: undefined },
    canonical: { type: String, default: undefined },
    content: {
      type: String,
      required: [true, "Please provide the content for this article"],
    },
    authors: { type: [AuthorSchema], required: true },
    writerNote: {
      type: String,
      required: [true, "Please provide writer note"],
    },
    publishedAt: {
      type: String,
      required: [true, "Please provide publication date"],
    },
    keyTakeaway: { type: [String], default: undefined },
    tags: { type: [String], default: undefined },
    outBoundLink: { type: OutBoundLinkSchema, default: undefined },
  },
  {
    timestamps: true,
    collection: "articleCollections",
  }
);

// Use the model if it exists, or create a new one.
const Article: Model<IArticle> =
  (mongoose.models.Article as Model<IArticle>) ||
  mongoose.model<IArticle>("Article", articleSchema);

export default Article;
