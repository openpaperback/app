import axios from "axios";
import { BookModel } from "../books/books.model";
import { AuthorModel } from "./author.model";
import type { Author, BookAggregate, WikiResult, WikiSearchResponse, WikiSummary } from "./author.type";

export async function getAuthorWiki(name: string): Promise<WikiResult | undefined> {
  try {
    const baseUrl = "https://en.wikipedia.org/w/api.php";
    const params = {
      srsearch: name,
      srlimit: 1,
      action: "query",
      list: "search",
      utf8: "",
      format: "json",
      formatversion: 2,
      rvsection: 0,
    };

    const searchResult = await axios.get<WikiSearchResponse>(baseUrl, { params });
    const firstMatch = searchResult.data.query.search[0];

    const summaryUrl = encodeURI(`https://en.wikipedia.org/api/rest_v1/page/summary/${firstMatch.title}`);
    const { data: summaryResult } = await axios.get<WikiSummary>(summaryUrl);

    return {
      thumbnail: summaryResult.thumbnail.source,
      title: summaryResult.title,
      url: summaryResult.content_urls.desktop.page,
      extract: summaryResult.extract,
    };
  } catch (error) {
    console.error(`Could not resolve wiki for: ${name}`);
    return undefined;
  }
}

export async function getTopAuthors(): Promise<Author[]> {
  const ignoreAuthors = [null, 37, 116, 216];
  const groups = await BookModel.aggregate<BookAggregate>([
    {
      $group: {
        _id: "$gutenberg_author_id",
        totalDownloads: { $sum: "$number_of_downloads" },
        count: { $sum: 1 },
      },
    },
    { $match: { _id: { $nin: ignoreAuthors } } },
    { $sort: { totalDownloads: -1 } },
  ]).limit(15);

  const authorIds = groups.map((g) => g._id);
  const authors = await AuthorModel.find({ gutenberg_id: { $in: authorIds } });
  const result = await Promise.all(authors.map((a) => resolveWikiIfMissing(a)));
  return result;
}

export async function getAuthor(gutenberg_id: number) {
  const author = await AuthorModel.findOne({ gutenberg_id });
  const result = await resolveWikiIfMissing(author);
  return result;
}

async function resolveWikiIfMissing(author: Author) {
  const shouldSkip = !author.$isEmpty("wiki");
  if (shouldSkip) {
    return author;
  }
  const wiki = await getAuthorWiki(author.aliases[0]);
  await AuthorModel.updateOne({ _id: author._id }, { $set: { wiki } });
  author.wiki = wiki;
  return author;
}
