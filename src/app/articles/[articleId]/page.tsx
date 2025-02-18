"use client";
import { useParams } from "next/navigation";
import {
  useUpdateArticleMutation,
  useRecordArticleMutation,
  useGetSelectedArticleByIdQuery,
} from "../../../../store/slices/selectedArticlesApiSlice";
import { useGetLatestNewsQuery } from "../../../../store/slices/apiSlice";
import { useEffect, useState } from "react";
import { NewsArticle } from "../../../../types";
import Link from "next/link";

export default function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  const { data: selectedArticle } = useGetSelectedArticleByIdQuery(articleId, {
    skip: !articleId,
  });
  const { data: latestNews } = useGetLatestNewsQuery();

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [selected, setSelected] = useState(false);

  const [updateArticle] = useUpdateArticleMutation();
  const [recordArticle] = useRecordArticleMutation();

  useEffect(() => {
    if (!articleId) return;

    if (selectedArticle) {
      setArticle(selectedArticle);
      setSelected(true);
    } else if (latestNews?.news) {
      const newsArticle = latestNews.news.find((a) => a.id === articleId);
      setArticle(newsArticle || null);
    }
  }, [articleId, selectedArticle, latestNews]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticle((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : null
    );
  };

  const handleSave = async () => {
    if (!article) return;

    try {
      if (selected) {
        await updateArticle(article).unwrap();
        alert("Article updated successfully!");
      } else {
        await recordArticle(article).unwrap();
        alert("Article added to selected articles!");
        setSelected(true);
      }
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article.");
    }
  };

  if (!article)
    return <p className="text-center text-gray-500">Article not found.</p>;

  return (
    <div className="max-w-3xl my-14 mx-auto p-6 border border-gray-300 rounded shadow-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Edit Article</h2>
        <Link href={"/"}>
          <h2 className="text-2xl font-bold p-4 border rounded-sm bg-secondary">
            ⇦ Back
          </h2>
        </Link>
      </div>

      <label className="block mb-2">Title:</label>
      <input
        type="text"
        name="title"
        value={article.title}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">Author:</label>
      <input
        type="text"
        name="author"
        value={article.author || ""}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">Description:</label>
      <textarea
        name="description"
        value={article.description || ""}
        onChange={handleInputChange}
        className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2">Published Date:</label>
      <input
        type="text"
        name="published"
        value={article.published || ""}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSave}
      >
        {selected ? "Save Changes" : "Save & Add to Selected"}
      </button>
    </div>
  );
}
