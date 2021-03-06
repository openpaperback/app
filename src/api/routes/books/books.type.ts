import type { Request } from "express";
import type { Document } from "mongoose";

export interface Book extends Document {
  gutenberg_id: number;
  gutenberg_author_id: number;
  date_issued: string;
  number_of_downloads: number;
  title: string;
  doc_type: string;
  language: string[];
  author: string[];
  formats: [
    {
      fileType: string;
      fileLink: string;
    }
  ];
  publisher: string;
  rights: string;
  subjects: string[];
  bookshelves: string[];
  isEnriched: boolean;
  enriched?: EnrichedBook;
}

export type GoogleResponse = {
  items: { volumeInfo: GoogleVolume }[];
};

export type GoogleVolume = {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  readingModes: {
    text: boolean;
    image: boolean;
  };
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
};

export interface EnrichedBook {
  title: string;
  authors: string[];
  description: string;
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  thumbnail: string;
}

/**
 * Requests
 */

export type ListRequest = Request<
  unknown,
  unknown,
  unknown,
  {
    skip: string;
    limit: string;
    sort: string;
    sortDir: string;
    search: string;
  }
>;

export type ListByAuthorRequest = Request<
  {
    authorId: string;
  },
  unknown,
  unknown,
  unknown
>;

export type GetRequest = Request<{ bookId: string }, unknown, unknown, unknown>;

export type ReadRequest = Request<{ bookId: string }, unknown, unknown, unknown>;
