import type { Response } from "express";
import { getIntInRangeFromString } from "../../utils/number";
import { BookModel } from "./books.model";
import { enrichBooks, enrichOneBook, getGutenbergText, getSearch, getSorting } from "./books.service";
import type { GetRequest, ListByAuthorRequest, ListRequest, ReadRequest } from "./books.type";

async function list(req: ListRequest, res: Response) {
  const skip = getIntInRangeFromString(req.query.skip, 0);
  const limit = getIntInRangeFromString(req.query.limit, 50);
  const sort = getSorting(req.query.sort, req.query.sortDir);
  const search = getSearch(req.query.search);

  const result = await BookModel.find(search).skip(skip).limit(limit).sort(sort);
  const books = await enrichBooks(result);

  res.send(books);
}

async function listByAuthor(req: ListByAuthorRequest, res: Response) {
  const authorId = parseInt(req.params.authorId);
  const sort = getSorting("number_of_downloads", "desc");

  const result = await BookModel.find({
    gutenberg_author_id: authorId,
    language: "en",
  }).sort(sort);

  const books = await enrichBooks(result);

  res.send(books);
}

async function get(req: GetRequest, res: Response) {
  const { bookId } = req.params;

  const result = await BookModel.findById(bookId);
  const book = await enrichOneBook(result);

  res.send(book);
}

async function getText(req: ReadRequest, res: Response) {
  const { bookId } = req.params;

  const book = await BookModel.findById(bookId);

  const bookLink = book.formats.find((b) => {
    return b.fileLink.endsWith(".htm");
  });

  if (!bookLink) {
    return res.sendStatus(404);
  }

  const text = await getGutenbergText(bookLink.fileLink, bookId);

  res.send(text);
}

export const bookRoutes = { list, listByAuthor, get, getText };
