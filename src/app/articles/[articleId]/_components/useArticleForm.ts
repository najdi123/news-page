import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetSelectedArticleByIdQuery, useRecordArticleMutation, useUpdateArticleMutation } from "../../../../../store/slices/selectedArticlesApiSlice";
import { useGetLatestNewsQuery } from "../../../../../store/slices/apiSlice";
import { NewsArticle } from "../../../../../types";

export function useArticleForm(articleId: string | undefined) {
    const { data: selectedArticle } = useGetSelectedArticleByIdQuery(articleId!, {
        skip: !articleId,
    });
    const { data: latestNews } = useGetLatestNewsQuery();

    const [selected, setSelected] = useState(false);
    const [updateArticle] = useUpdateArticleMutation();
    const [recordArticle] = useRecordArticleMutation();

    const { register, handleSubmit, setValue, control } = useForm<NewsArticle>();

    useEffect(() => {
        if (!articleId) return;

        const articleData =
            selectedArticle || latestNews?.news.find((a) => a.id === articleId);

        if (articleData) {
            setSelected(!!selectedArticle);
            Object.keys(articleData).forEach((key) => {
                setValue(key as keyof NewsArticle, articleData[key as keyof NewsArticle]);
            });
        }
    }, [articleId, selectedArticle, latestNews, setValue]);

    const onSubmit = async (data: NewsArticle) => {
        try {
            if (selected) {
                await updateArticle(data).unwrap();
                toast.success("Article updated successfully!");
            } else {
                await recordArticle(data).unwrap();
                toast.success("Article added to selected articles!");
                setSelected(true);
            }
        } catch (error) {
            console.error("Error saving article:", error);
            toast.error("Failed to save article.");
        }
    };

    return {
        register,
        handleSubmit,
        control,
        onSubmit,
        selected,
    };
}