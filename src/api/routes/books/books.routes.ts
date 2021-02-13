import type { Response } from "express";
import { getIntInRangeFromString } from "../../utils/number";
import { BookModel } from "./books.model";
import { enrichBooks, getSorting } from "./books.service";
import type { ListRequest } from "./books.type";

async function list(req: ListRequest, res: Response) {
  const skip = getIntInRangeFromString(req.query.skip, 0);
  const limit = getIntInRangeFromString(req.query.limit, 50);
  const sort = getSorting(req.query.sort, req.query.sortDir);

  const result = await BookModel.find().skip(skip).limit(limit).sort(sort);
  const books = await enrichBooks(result);

  res.send(books);
}

export const bookRoutes = { list };
