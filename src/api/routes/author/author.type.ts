import type { Request } from "express";
import type { Document } from "mongoose";

export interface Author extends Document {
  gutenberg_id: number;
  aliases: string[];
  name?: string;
  wiki?: WikiResult;
}

export type WikiSearchResponse = {
  batchcomplete: true;
  query: {
    searchinfo: {
      totalhits: number;
    };
    search: WikiSearchList[];
  };
};

export type WikiSearchList = {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
};

export type WikiSummary = {
  title: string;
  displaytitle: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  originalimage: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: {
    desktop: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
    mobile: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
  };
  extract: string;
  extract_html: string;
};

export type WikiResult = {
  title: string;
  thumbnail: string;
  url: string;
  extract: string;
};

export type GetRequest = Request<
  {
    authorId: string;
  },
  unknown,
  unknown,
  unknown
>;
