import mongoose, { Schema } from "mongoose";
import type { Book } from "./books.type";

const BookSchema = new Schema({
  gutenberg_id: Number,
  date_issued: String,
  number_of_downloads: Number,
  title: String,
  doc_type: String,
  language: [String],
  author: String,
  formats: [{ fileType: String, fileLink: String }],
  publisher: String,
  rights: String,
  subjects: [String],
  bookshelves: [String],
  enriched: {
    title: String,
    authors: [{ type: String, minimize: true }],
    description: String,
    pageCount: Number,
    printType: String,
    categories: [{ type: String, minimize: true }],
    maturityRating: String,
    thumbnail: String,
  },
});

export const BookModel = mongoose.model<Book>("Book", BookSchema);
