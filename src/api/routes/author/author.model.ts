import mongoose, { Schema } from "mongoose";
import type { Author } from "./author.type";

const AuthorSchema = new Schema({
  gutenberg_id: Number,
  aliases: [String],
});

AuthorSchema.index({ title: "text", author: "text" });

export const AuthorModel = mongoose.model<Author>("Author", AuthorSchema);
