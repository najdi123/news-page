"use client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
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

  const [selected, setSelected] = useState(false);
  const [updateArticle] = useUpdateArticleMutation();
  const [recordArticle] = useRecordArticleMutation();

  const { register, handleSubmit, setValue } = useForm<NewsArticle>();

  useEffect(() => {
    if (!articleId) return;

    const articleData =
      selectedArticle || latestNews?.news.find((a) => a.id === articleId);

    if (articleData) {
      setSelected(!!selectedArticle);
      Object.keys(articleData).forEach((key) => {
        setValue(
          key as keyof NewsArticle,
          articleData[key as keyof NewsArticle]
        );
      });
    }
  }, [articleId, selectedArticle, latestNews, setValue]);

  const onSubmit = async (data: NewsArticle) => {
    try {
      if (selected) {
        await updateArticle(data).unwrap();
        alert("Article updated successfully!");
      } else {
        await recordArticle(data).unwrap();
        alert("Article added to selected articles!");
        setSelected(true);
      }
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article.");
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2">Title:</label>
        <input
          {...register("title")}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Author:</label>
        <input
          {...register("author")}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Description:</label>
        <textarea
          {...register("description")}
          className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Published Date:</label>
        <input
          {...register("published")}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {selected ? "Save Changes" : "Save & Add to Selected"}
        </button>
      </form>
    </div>
  );
}
