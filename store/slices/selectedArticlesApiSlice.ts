import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsArticle } from "../../types";

export const selectedArticlesApi = createApi({
    reducerPath: "selectedArticlesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["SelectedArticles"],
    endpoints: (builder) => ({
        getSelectedArticles: builder.query<NewsArticle[], void>({
            query: () => "/api/selected-articles",
            transformResponse: (response: Record<string, NewsArticle>) => Object.values(response),
            providesTags: ["SelectedArticles"],
        }),

        getSelectedArticleById: builder.query<NewsArticle, string>({
            query: (id) => `/api/selected-article/${id}`,
        }),

        recordArticle: builder.mutation<{ message: string }, NewsArticle>({
            query: (article) => ({
                url: `/api/selected-article/${article.id}`,
                method: "PUT",
                body: article,
            }),
            invalidatesTags: ["SelectedArticles"],
        }),


        updateArticle: builder.mutation<{ message: string }, NewsArticle>({
            query: (article) => ({
                url: `/api/selected-article/${article.id}`,
                method: "PUT",
                body: article,
            }),
            invalidatesTags: ["SelectedArticles"],
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
