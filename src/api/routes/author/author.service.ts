import axios from "axios";
import type { WikiResult, WikiSearchResponse, WikiSummary } from "./author.type";

export async function getAuthorWiki(name: string): Promise<WikiResult> {
  const baseUrl = "https://en.wikipedia.org/w/api.php";
  const params = {
    srsearch: name,
    action: "query",
    list: "search",
    utf8: "",
    format: "json",
    formatversion: 2,
    rvsection: 0,
  };

  const searchResult = await axios.get<WikiSearchResponse>(baseUrl, { params });
  const firstMatch = searchResult.data.query.search[0];

  const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${firstMatch.title}`;
  const { data: summaryResult } = await axios.get<WikiSummary>(summaryUrl);

  return {
    thumbnail: summaryResult.thumbnail.source,
    title: summaryResult.title,
    url: summaryResult.content_urls.desktop.page,
    extract: summaryResult.extract,
  };
}
