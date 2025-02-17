"use client";
import React, { useState, useEffect } from "react";
import { useLazyGetNewsByKeywordQuery } from "../../../store/slices/apiSlice";
import ArticleItem from "./articleItem";

export default function SearchNews() {
  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("Technology");

  // Lazy query function
  const [triggerSearch, { data, error, isLoading }] =
    useLazyGetNewsByKeywordQuery();

  // Trigger fetch when searchKeyword changes
  useEffect(() => {
    if (searchKeyword) {
      triggerSearch(searchKeyword);
    }
  }, [searchKeyword, triggerSearch]);

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setSearchKeyword(inputValue.trim());
    }
  };

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
      {error && (
        <p className="text-red-500">
          Error fetching news. Please try again later.
        </p>
      )}

      {/* Render articles if we have data */}
      {data?.articles && (
        <ul className="grid grid-cols-1 gap-4">
          {data.articles.map((article) => (
            <ArticleItem key={article.url || article.title} article={article} />
          ))}
        </ul>
      )}
    </div>
  );
}
