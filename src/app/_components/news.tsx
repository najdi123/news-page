"use client";
import React, { useState, useEffect } from "react";
import ArticleItem from "./articleItem";
import {
  useGetLatestNewsQuery,
  useLazySearchNewsQuery,
} from "../../../store/slices/apiSlice";
import { NewsArticle } from "../../../types";

export default function News() {
  const [inputValue, setInputValue] = useState("");
  // If searchKeyword is empty, we'll show the latest news.
  const [searchKeyword, setSearchKeyword] = useState("");

  // Always fetch latest news.
  const {
    data: latestData,
    error: latestError,
    isLoading: latestIsLoading,
  } = useGetLatestNewsQuery();

  // Lazy query for searching news.
  const [
    triggerSearch,
    { data: searchData, error: searchError, isLoading: searchIsLoading },
  ] = useLazySearchNewsQuery();

  // When a search keyword is submitted, trigger the search query.
  useEffect(() => {
    if (searchKeyword) {
      triggerSearch(searchKeyword);
    }
  }, [searchKeyword, triggerSearch]);

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(inputValue.trim());
  };

  // Determine which data, error, and loading state to show:
  const dataToDisplay = searchKeyword ? searchData : latestData;
  const errorToDisplay = searchKeyword ? searchError : latestError;
  const isLoading = searchKeyword ? searchIsLoading : latestIsLoading;

  return (
    <div className="max-w-3xl h-lvh overflow-auto relative">
      <h4 className="my-4">Client Side Rendering</h4>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6 sticky top-3">
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

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {errorToDisplay && (
        <p className="text-red-500">
          Error fetching news. Please try again later.
        </p>
      )}

      {/* Render articles if we have data */}
      {dataToDisplay && dataToDisplay.news && (
        <ul className="grid grid-cols-1 gap-4">
          {dataToDisplay.news.map((article: NewsArticle) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </ul>
      )}
    </div>
  );
}
