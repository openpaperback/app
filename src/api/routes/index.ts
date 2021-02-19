import type { Application } from "express";
import { bookRoutes } from "./books/books.routes";
import { middleware as cache } from "apicache";
import { authorRoutes } from "./author/author.routes";

export function router(app: Application) {
  app.get("/api/book", bookRoutes.list);
  app.get("/api/book/author/:authorId", bookRoutes.listByAuthor);
  app.get("/api/book/:bookId", bookRoutes.get);
  app.get("/api/book/:bookId/text", cache("5 minutes"), bookRoutes.getText);

  app.get("/api/author/top", authorRoutes.getMostDownloaded);
  app.get("/api/author/:authorId", authorRoutes.get);
}
