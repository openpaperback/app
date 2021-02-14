import type { Application } from "express";
import { bookRoutes } from "./books/books.routes";
import { middleware as cache } from "apicache";

export function router(app: Application) {
  app.get("/api/book", bookRoutes.list);
  app.get("/api/book/:bookId", bookRoutes.get);
  app.get("/api/book/:bookId/text", cache("5 minutes"), bookRoutes.getText);
}
