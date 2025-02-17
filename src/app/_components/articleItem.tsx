"use client";
import React from "react";
import Link from "next/link";
import { NewsArticle } from "../../../types";
import { useRecordArticleMutation } from "../../../store/slices/selectedArticlesApiSlice"; // adjust the import path as needed

interface ArticleItemProps {
  article: NewsArticle;
}

export default function ArticleItem({ article }: ArticleItemProps) {
  const [recordArticle, { isLoading, error }] = useRecordArticleMutation();

  const handleRecord = async () => {
    try {
      await recordArticle(article).unwrap();
      alert("Article recorded successfully!");
    } catch (err) {
      console.error("Error recording article:", err);
      alert("Failed to record article.");
    }
  };

  return (
    <li className="p-4 border border-gray-200 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
      {article.author && (
        <p className="text-sm text-gray-600 mb-2">
          By {article.author} - {article.publishedAt}
        </p>
      )}
      <p className="text-sm text-gray-800 mb-2">
        {article.description?.slice(0, 100)}...
      </p>
      <div className="flex gap-2 mt-2">
        <Link
          href={`/articles/${encodeURIComponent(article.title)}`}
          className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Read More
        </Link>
        <button
          onClick={handleRecord}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? "Recording..." : "Record Article"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">Error recording article.</p>}
    </li>
  );
}
