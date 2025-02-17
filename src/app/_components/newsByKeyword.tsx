"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLazyGetNewsByKeywordQuery } from "../../../store/slices/apiSlice";

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
    <div className="p-4 max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
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
            <li
              key={article.url || article.title}
              className="p-4 border border-gray-200 rounded shadow"
            >
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              {article.author && (
                <p className="text-sm text-gray-600 mb-2">
                  By {article.author} - {article.publishedAt}
                </p>
              )}

              <p className="text-sm text-gray-800 mb-2">
                {article.description?.slice(0, 100)}...
              </p>

              {/* Use article title in the URL, encoding it properly */}
              <Link
                href={`/articles/${encodeURIComponent(article.title)}`}
                className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Read More
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
