"use client";
import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import type { NewsArticle } from "../../../types";
import {
  useRecordArticleMutation,
  useDeleteArticleMutation,
} from "../../../store/slices/selectedArticlesApiSlice";

interface ArticleItemProps {
  article: NewsArticle;
  fromSelected?: boolean;
}

export default function ArticleItem({
  article,
  fromSelected = false,
}: ArticleItemProps) {
  // Mutation hook for adding an article.
  const [recordArticle, { isLoading: isAdding, error: addError }] =
    useRecordArticleMutation();
  // Mutation hook for deleting an article.
  const [deleteArticle, { isLoading: isDeleting, error: deleteError }] =
    useDeleteArticleMutation();

  const handleAddToSelected = async () => {
    try {
      await recordArticle(article).unwrap();
      toast.success("Article added to selected list!");
    } catch (err: unknown) {
      console.error("Error adding article:", err);

      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        "Failed to add article.";
      toast.error(errorMessage);
    }
  };

  const handleDeleteFromSelected = async () => {
    try {
      await deleteArticle(article.id).unwrap();
      toast.success("Article removed from selected list!");
    } catch (err) {
      console.error("Error deleting article:", err);
      toast.error("Failed to delete article.");
    }
  };

  return (
    <li className="p-4 border border-gray-200 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
      {article.author && (
        <p className="text-sm text-gray-600 mb-2">
          By {article.author} - {article.published}
        </p>
      )}
      <p className="text-sm text-gray-800 mb-2">
        {article.description?.slice(0, 100)}...
      </p>
      <div className="flex gap-2 mt-2">
        <Link
          href={`/articles/${article.id}`}
          className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Read More
        </Link>
        {!fromSelected ? (
          <button
            onClick={handleAddToSelected}
            disabled={isAdding}
            className="inline-block px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isAdding ? "Adding..." : "Add to Selected"}
          </button>
        ) : (
          <button
            onClick={handleDeleteFromSelected}
            disabled={isDeleting}
            className="inline-block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
      {fromSelected && deleteError && (
        <p className="text-red-500 mt-2">
          Error deleting article. Please try again.
        </p>
      )}
      {!fromSelected && addError && (
        <p className="text-red-500 mt-2">
          Error adding article. Please try again.
        </p>
      )}
    </li>
  );
}
