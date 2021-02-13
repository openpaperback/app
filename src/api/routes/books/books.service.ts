import axios from "axios";
import { BookModel } from "./books.model";
import type { Book, GoogleResponse, GoogleVolume } from "./books.type";

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
    promises.push(enrichOne(book));
  }
  const result = await Promise.all(promises);
  return result;
}

export async function enrichOne(book: Book) {
  if (book.enriched && book.enriched.title) {
    return book;
  }

  const enrichWith = await findGoogleBook(book.title);

  if (enrichWith) {
    book.enriched = {
      title: enrichWith.title,
      authors: enrichWith.authors,
      description: enrichWith.description,
      pageCount: enrichWith.pageCount,
      printType: enrichWith.printType,
      categories: enrichWith.categories,
      maturityRating: enrichWith.maturityRating,
      thumbnail: enrichWith.imageLinks?.thumbnail || "",
    };

    await BookModel.updateOne({ _id: book._id }, book);
  }

  return book;
}

async function findGoogleBook(title: string): Promise<GoogleVolume | undefined> {
  try {
    const fields = "items/volumeInfo";
    const url = `https://www.googleapis.com/books/v1/volumes`;
    const result = await axios.get<GoogleResponse>(url, { params: { q: title, fields } });

    if (result.data.items && result.data.items.length > 0 && result.data.items[0].volumeInfo) {
      return result.data.items[0].volumeInfo;
    }
  } catch (error) {
    console.error("Error downloading enriched data from google");
  }

  return undefined;
}
