import type { Author } from "../api/routes/author/author.type";
import { api } from "./client";

async function get(id: string) {
  const result = await api.get<Author>(`/author/${id}`);
  return result.data;
}

async function getMostDownloaded() {
  const result = await api.get<Author[]>(`/author/top`);
  return result.data;
}

export const authorsClient = { get, getMostDownloaded };
