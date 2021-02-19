import type { Response } from "express";
import { getAuthor, getTopAuthors } from "./author.service";
import type { GetRequest } from "./author.type";

async function get(req: GetRequest, res: Response) {
  try {
    const authorId = parseInt(req.params.authorId);
    const author = await getAuthor(authorId);
    res.send(author);
  } catch (error) {
    res.sendStatus(400);
  }
}

async function getMostDownloaded(req: GetRequest, res: Response) {
  const authors = await getTopAuthors();
  return res.send(authors);
}

export const authorRoutes = { get, getMostDownloaded };
