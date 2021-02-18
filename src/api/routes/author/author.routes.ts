import type { Response } from "express";
import { AuthorModel } from "./author.model";
import { getAuthorWiki } from "./author.service";
import type { GetRequest } from "./author.type";

async function get(req: GetRequest, res: Response) {
  try {
    const authorId = parseInt(req.params.authorId);

    const author = await AuthorModel.findOne({ gutenberg_id: authorId });
    const name = author.aliases[0];

    const wiki = await getAuthorWiki(name);

    res.send({
      _id: author._id,
      gutenberg_id: author.gutenberg_id,
      name,
      wiki,
    });
  } catch (error) {
    res.sendStatus(400);
  }
}

export const authorRoutes = { get };
