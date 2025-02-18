"use client";
import React, { useState } from "react";
import ArticleItem from "./articleItem";
import {
  useGetLatestNewsQuery,
  useLazySearchNewsQuery,
} from "../../../store/slices/apiSlice";
import { NewsArticle } from "../../../types";

export default function News() {
  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch latest news
  const {
    data: latestData,
    error: latestError,
    isLoading: latestIsLoading,
  } = useGetLatestNewsQuery();

  // Lazy query for searching news
  const [
    triggerSearch,
    { data: searchData, error: searchError, isLoading: searchIsLoading },
  ] = useLazySearchNewsQuery();

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(inputValue.trim());
    triggerSearch(inputValue.trim());
  };

  // Determine data & loading state
  const dataToDisplay = searchKeyword ? searchData : latestData;
  const errorToDisplay = searchKeyword ? searchError : latestError;
  const isLoading = searchKeyword ? searchIsLoading : latestIsLoading;

  return (
    <div className="max-w-3xl md:h-lvh overflow-auto relative">
      {/* Toggle Button for Mobile */}
      <input
        type="checkbox"
        id="news-toggle"
        className="peer hidden"
        defaultChecked={window.innerWidth >= 768} // Open by default on larger screens
      />
      <label
        htmlFor="news-toggle"
        className="block md:hidden bg-blue-600 text-white px-4 py-2 text-center rounded cursor-pointer"
      >
        Toggle News
      </label>

      {/* Search Panel - Hidden on Mobile, Open on Larger Screens */}
      <div className="hidden peer-checked:block md:block bg-white sticky top-1 p-4 rounded shadow-md">
        <h4 className="pt-4">Client Side Rendering</h4>
        <form onSubmit={handleSearch} className="flex gap-2 pb-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter keyword..."
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Display Articles when open */}
      <div className="hidden peer-checked:block md:block">
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {errorToDisplay && (
          <p className="text-red-500">Error fetching news. Please try again.</p>
        )}
        {dataToDisplay && dataToDisplay.news && (
          <ul className="grid grid-cols-1 gap-4 pt-4">
            {dataToDisplay.news.map((article: NewsArticle) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
