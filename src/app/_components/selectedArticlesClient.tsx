"use client";

import { useGetSelectedArticlesQuery } from "../../../store/slices/selectedArticlesApiSlice";
import { NewsArticle } from "../../../types";
import ArticleItem from "./articleItem";
type Props = {
  articles: NewsArticle[];
};
export default function SelectedArticlesClient({ articles }: Props) {
  console.log("🚀 ~ SelectedArticlesClient ~ SelectedArticlesClient:");
  const {
    data: rtkarticles,
    isLoading,
    isError,
    error,
  } = useGetSelectedArticlesQuery();

  let errorMessage: string | null | undefined = null;
  if (error) {
    if ("status" in error) {
      // If it's FetchBaseQueryError, extract from data if possible
      errorMessage =
        typeof error.data === "string"
          ? error.data
          : JSON.stringify(error.data);
    } else if ("message" in error) {
      // If it's SerializedError, use message directly
      errorMessage = error.message;
    }
  }

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p className="text-red-500">Error: {errorMessage}</p>;

  // if rtkarticles exist use it, else use ssr articles
  const finalArticles = rtkarticles || articles;
  return (
    <div className="max-w-3xl h-lvh overflow-auto">
      <h4 className="my-4">Client Side Rendering (SEO OPTIMIZED)</h4>
      <h2 className="text-2xl font-bold mb-4">Selected Articles</h2>
      <h2 className="text-2xl font-bold mb-4">Selected Articles</h2>
      {finalArticles && finalArticles.length === 0 ? (
        <p>No selected articles.</p>
      ) : (
        <ul className="space-y-4">
          {finalArticles?.map((article: NewsArticle) => (
            <ArticleItem
              key={article.id}
              article={article}
              fromSelected={true}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
