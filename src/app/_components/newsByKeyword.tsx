"use client";
import React, { useState, useEffect } from "react";
import { useLazyGetNewsByKeywordQuery } from "../../../store/slices/apiSlice";

const SearchNews = () => {
  const [inputValue, setInputValue] = useState(""); // User input
  const [searchKeyword, setSearchKeyword] = useState("Technology"); // Triggers search

  // Lazy query function that only runs when explicitly triggered
  const [triggerSearch, { data, error, isLoading }] =
    useLazyGetNewsByKeywordQuery();

  useEffect(() => {
    if (searchKeyword) {
      console.log("🚀 Fetching news for:", searchKeyword);
      triggerSearch(searchKeyword); // Manually trigger fetch
    }
  }, [searchKeyword, triggerSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔍 Search button clicked!");
    console.log("Current input value:", inputValue);

    if (inputValue.trim() !== "") {
      setSearchKeyword(inputValue); // Updating state triggers `useEffect`
      console.log("✅ Search triggered with keyword:", inputValue);
    } else {
      console.warn("⚠️ No keyword entered!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter keyword..."
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching news</p>}

      <ul>
        {data?.articles.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchNews;
