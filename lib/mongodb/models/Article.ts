/* ==============================
22-03-2025
Property yang diharapkan mongoDB dalam artikel blog. Bila ingin menambahkan property baru 
maka masukkan ke BlogArticleProps yg terletak di folder types/index.ts
DAN di lib/mongodb/models/Article.ts ini
============================== */

import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({
  authorName: { type: String, required: true },
  imgPath: { type: String, required: true },
  quotes: { type: String },
});

const OutBoundLinkSchema = new Schema({
  title: { type: String, default: "Medium Dialogika" },
  link: { type: String, default: "https://medium.com/dialogika" },
});

// Skema article untuk database di mongoDB
const articleSchema = new Schema(
  {
    idArticle: {
      type: String,
      required: [true, "Please provide an id from title"],
      unique: true,
      maxlength: [150, "idArticle cannot exceed 150 characters"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title for this article"],
      maxlength: [150, "idArticle cannot exceed 150 characters"],
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
    cta: String,
    cardsDescription: String,
    content: {
      type: String,
      required: [true, "Please provide the content for this article"],
    },
    authors: [AuthorSchema],
    writerNote: {
      type: String,
      required: [true, "Please provide writer note"],
    },
    publishedAt: {
      type: String,
      required: [true, "Please provide publication date"],
    },
    tags: [String],
    outBoundLink: OutBoundLinkSchema,
  },
  {
    timestamps: true,
    collection: "articleCollections",
  }
);
// testingArticleCollections
// If id is not provided, generate a new one
// articleSchema.pre("save", function (next) {
//   if (!this.idArticle) {
//     this.idArticle = this._id.toString();
//   }
//   next();
// });

const Article = mongoose.models.Article || mongoose.model("Article", articleSchema);
export default Article;
