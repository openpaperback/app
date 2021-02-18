import type { Book } from "../api/routes/books/books.type";
import { api } from "./client";

type ListParams = {
  skip?: number;
  limit?: number;
  search?: string;
  sort?: "number_of_downloads" | "title";
  sortDir?: "asc" | "desc";
};

async function list(params: ListParams) {
  const { skip = 0, limit = 50, sort = "number_of_downloads", sortDir = "desc", search = "" } = params;

  const result = await api.get<Book[]>("/book", {
    params: { skip, limit, sort, sortDir, search },
  });
  return result.data;
}

async function listByAuthor(authorId: string) {
  const url = `/book/author/${authorId}`;
  const result = await api.get<Book[]>(url);
  return result.data;
}

async function get(id: string) {
  const result = await api.get<Book>(`/book/${id}`);
  return result.data;
}

async function getText(id: string) {
  const result = await api.get<string>(`/book/${id}/text`);
  return result.data;
}

export const booksClient = { get, list, listByAuthor, getText };
