import type { NewsArticle } from "../../../types";
import SelectedArticlesClient from "./selectedArticlesClient";

async function getSelectedArticles(): Promise<NewsArticle[]> {
  console.log("🚀 ~ getSelectedArticles ~ getSelectedArticles:");
  const res = await fetch("http://localhost:3000/api/selected-articles", {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch selected articles");
  }
  // Our API returns an object keyed by the article id.
  const data = (await res.json()) as Record<string, NewsArticle>;
  // Simply return an array of articles.
  return Object.values(data);
}

export default async function SelectedArticles() {
  let articles: NewsArticle[] = [];
  try {
    articles = await getSelectedArticles();
  } catch (error: unknown) {
    console.error(error);
  }

  return <SelectedArticlesClient articles={articles} />;
}
