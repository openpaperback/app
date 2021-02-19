import axios from "axios";
import { LEGALESE_START_MARKERS, TEXT_END_MARKERS, TEXT_START_MARKERS } from "./books.const";
import { BookModel } from "./books.model";
import type { Book, GoogleResponse, GoogleVolume } from "./books.type";
import { parse } from "node-html-parser";

export function getSorting(querySort?: string, querySortDirection?: string): Record<string, 1 | -1> {
  const sortBy = ["number_of_downloads", "title"];
  const sortDirection = ["asc", "desc"];

  if (sortBy.includes(querySort) && sortDirection.includes(querySortDirection)) {
    return {
      [querySort]: querySortDirection === "asc" ? 1 : -1,
    };
  }

  return { title: 1 };
}

export async function enrichBooks(books: Book[]) {
  const promises: Promise<Book>[] = [];
  for (let book of books) {
    promises.push(enrichOneBook(book));
  }
  const result = await Promise.all(promises);
  return result;
}

export async function enrichOneBook(book: Book) {
  if (book.isEnriched) {
    return book;
  }

  const enrichWith = await findGoogleBookMatches(book.title);

  if (enrichWith) {
    book.enriched = {
      title: getFirstMatch(enrichWith, "title") as string,
      authors: getFirstMatch(enrichWith, "authors") as string[],
      description: getFirstMatch(enrichWith, "description") as string,
      pageCount: getFirstMatch(enrichWith, "pageCount") as number,
      printType: getFirstMatch(enrichWith, "printType") as string,
      categories: getFirstMatch(enrichWith, "categories") as string[],
      maturityRating: getFirstMatch(enrichWith, "maturityRating") as string,
      thumbnail: enrichWith[0].imageLinks?.thumbnail || "",
    };
    book.isEnriched = true;

    await BookModel.updateOne({ _id: book._id }, book);
  }

  return book;
}

function getFirstMatch(volumes: GoogleVolume[], attr: keyof GoogleVolume) {
  const match = volumes.find((d) => !!d[attr]);

  if (match) return match[attr];
}

async function findGoogleBookMatches(title: string): Promise<GoogleVolume[] | undefined> {
  try {
    const fields = "items/volumeInfo";
    const url = `https://www.googleapis.com/books/v1/volumes`;
    const result = await axios.get<GoogleResponse>(url, { params: { q: title, fields } });

    if (result.data.items && result.data.items.length > 0 && result.data.items[0].volumeInfo) {
      return result.data.items.map((b) => b.volumeInfo);
    }
  } catch (error) {
    console.error("Error downloading enriched data from google");
  }

  return undefined;
}

export async function getGutenbergText(url: string, bookId: string) {
  const result = await axios.get(url);
  const text = stripHeaders(result.data);

  const doc = parse(text);
  doc.querySelectorAll("img").forEach((el) => el.remove());
  doc.querySelectorAll(".figcenter").forEach((el) => el.remove());
  doc.querySelectorAll("meta").forEach((el) => el.remove());
  doc.querySelectorAll("style").forEach((el) => el.remove());
  doc.querySelectorAll("link").forEach((el) => el.remove());
  // doc.querySelectorAll("table[summary]").forEach((el) => el.remove());

  doc
    .querySelectorAll(`a`)
    .filter((el) => "href" in el.attributes && el.attributes["href"].startsWith("#"))
    .forEach((el) => el.setAttribute("href", `/book/${bookId}/read${el.getAttribute("href")}`));

  return doc.toString();
}

function stripHeaders(text: string) {
  const lines = text.split("\n");

  let out: string[] = [];
  let i = 0;
  let footer_found = false;
  let ignore_section = false;

  for (let line of lines) {
    let reset = false;

    if (i <= 600) {
      // Check if the header ends here
      for (let token of TEXT_START_MARKERS) {
        if (line.includes(token)) {
          reset = true;
        }
      }

      if (reset) {
        out = [];
        continue;
      }
    }

    if (i >= 100) {
      for (let token of TEXT_END_MARKERS) {
        if (line.includes(token)) {
          footer_found = true;
        }
      }

      if (footer_found) {
        break;
      }
    }

    for (let token of LEGALESE_START_MARKERS) {
      if (line.includes(token)) {
        ignore_section = true;
        continue;
      }
    }

    for (let token of LEGALESE_START_MARKERS) {
      if (line.includes(token)) {
        ignore_section = false;
        continue;
      }
    }

    if (!ignore_section) {
      out.push(line);
      i += 1;
    }
  }

  return out.join("\n");
}

export function getSearch(text?: string) {
  const baseQuery = { language: "en", doc_type: "Text" };

  if (!text) {
    return baseQuery;
  }

  const escaped = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  const regex = new RegExp(escaped, "gi");
  return {
    ...baseQuery,
    $or: [{ title: regex }, { author: regex }],
  };
}
