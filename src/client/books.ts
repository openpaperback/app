import axios from "axios";
import type { Book } from "../api/routes/books/books.type";

async function list(skip = 0, limit = 20, sort = "number_of_downloads", sortDir = "desc") {
  const result = await axios.get<Book[]>("/api/book", {
    params: { skip, limit, sort, sortDir },
  });
  return result.data;
}

export const booksClient = { list };
