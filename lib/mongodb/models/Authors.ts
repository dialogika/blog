// Dari 23-02-2025 discontinued, kemungkinan tidak akan dipakai bersamaan dengan file api/admin/authors.route.ts
import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema({
  authorName: { type: String, required: [true, "Please enter author name at least 1"] },
  imgPath: { type: String, required: [true, "Please enter author picture "] },
  quotes: { type: String, default: "No quotes from me 🤪" },
});

// untuk authors adalah nama collection  didalam database BlogDatabase di mongoDB
const Authors = mongoose.models.authors || mongoose.model("authors", authorSchema);
export default Authors;
