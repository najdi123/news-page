"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import { NewsArticle, RootState } from "../../../../types";

export default function ArticlePage() {
  // Get the article title from the URL
  const { articleTitle } = useParams<{ articleTitle: string }>();

  // Decode the title (URL-encoded in the search page)
  const decodedTitle = decodeURIComponent(articleTitle);

  // Retrieve articles from Redux cache
  const articlesData = useSelector((state: RootState) => {
    return (
      state.api.queries['getNewsByKeyword("Technology")']?.data ||
      state.api.queries['getNewsByKeyword("technology")']?.data
    );
  });

  // Find the article by its title
  const article: NewsArticle | undefined = articlesData?.articles.find(
    (a) => a.title === decodedTitle
  );

  if (!article) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Article not found</h1>
        <p>Please make sure you searched and clicked on a valid article.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      {article.author && (
        <p className="italic text-gray-600">By {article.author}</p>
      )}
      <p className="text-gray-500">Published at: {article.publishedAt}</p>

      {article.description && <p className="text-lg">{article.description}</p>}
      {article.content && <p className="text-base">{article.content}</p>}

      {article.urlToImage && (
        <Image
          className="w-full h-auto rounded shadow"
          src={article.urlToImage}
          alt={article.title}
          width={200}
          height={200}
        />
      )}

      {article.url && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Read Original Article
        </a>
      )}
    </div>
  );
}
