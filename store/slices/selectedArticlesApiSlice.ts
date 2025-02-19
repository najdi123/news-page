import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsArticle } from "../../types";

export const selectedArticlesApi = createApi({
    reducerPath: "selectedArticlesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["SelectedArticles", "SelectedArticle"], // Add a separate tag for individual articles

    endpoints: (builder) => ({
        getSelectedArticles: builder.query<NewsArticle[], void>({
            query: () => "/api/selected-articles",
            transformResponse: (response: Record<string, NewsArticle>) => Object.values(response),
            providesTags: ["SelectedArticles"],
        }),

        getSelectedArticleById: builder.query<NewsArticle, string>({
            query: (id) => `/api/selected-article/${id}`,
            providesTags: (result, error, id) => [{ type: "SelectedArticle", id }],
        }),

        recordArticle: builder.mutation<{ message: string }, NewsArticle>({
            query: (article) => ({
                url: `/api/selected-article/${article.id}`,
                method: "PUT",
                body: article,
            }),
            invalidatesTags: (result, error, article) => [
                { type: "SelectedArticles" },
                { type: "SelectedArticle", id: article.id } // Ensure specific article is invalidated
            ],
        }),

        updateArticle: builder.mutation<{ message: string }, NewsArticle>({
            query: (article) => ({
                url: `/api/selected-article/${article.id}`,
                method: "PATCH",
                body: article,
            }),
            invalidatesTags: (result, error, article) => [
                { type: "SelectedArticles" },
                { type: "SelectedArticle", id: article.id }
            ],
        }),

        deleteArticle: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/api/selected-article/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SelectedArticles"],
        }),
    }),
});

export const {
    useGetSelectedArticlesQuery,
    useGetSelectedArticleByIdQuery,
    useRecordArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
} = selectedArticlesApi;
