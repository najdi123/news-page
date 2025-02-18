"use client";

import { useGetSelectedArticlesQuery } from "../../../store/slices/selectedArticlesApiSlice";
import { NewsArticle } from "../../../types";
import ArticleItem from "./articleItem";
type Props = {
  articles: NewsArticle[];
};
export default function SelectedArticlesClient({ articles }: Props) {
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
    <div className="max-w-3xl md:h-lvh overflow-auto relative">
      {/* Toggle Button for Mobile */}
      <input
        type="checkbox"
        id="selected-toggle"
        className="peer hidden"
        defaultChecked={window.innerWidth >= 768} // Open by default on larger screens
      />
      <label
        htmlFor="selected-toggle"
        className="block md:hidden bg-blue-600 text-white px-4 py-2 text-center rounded cursor-pointer"
      >
        Toggle Selected Articles
      </label>

      <div className="hidden peer-checked:block md:block bg-white sticky top-1 p-4 rounded shadow-md">
        <h4 className="">Server Side Rendering (SEO OPTIMIZED)</h4>
        <h2 className="text-2xl font-bold">Selected Articles</h2>
      </div>
      {/* Display Articles when open */}
      <div className="hidden peer-checked:block md:block">
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
        \
      </div>
    </div>
  );
}
