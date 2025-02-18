import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsArticle } from "../../types";



export const selectedArticlesApi = createApi({
    reducerPath: "selectedArticlesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["SelectedArticles"], // Define tag type
    endpoints: (builder) => ({
        // GET: Retrieve all selected articles.
        getSelectedArticles: builder.query<NewsArticle[], void>({
            query: () => "/api/selected-articles",
            transformResponse: (response: Record<string, NewsArticle>) => {
                console.log("🚀 ~ Transforming API Response:", response);
                return Object.values(response); // Convert object to array
            },
            providesTags: ["SelectedArticles"],
        }),

        // POST: Record a new article.
        recordArticle: builder.mutation<{ message: string }, NewsArticle>({
            query: (article) => ({
                url: "/api/selected-articles",
                method: "POST",
                body: article,
            }),
            invalidatesTags: ["SelectedArticles"],
        }),
        // DELETE: Remove an article by its id.
        deleteArticle: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: "/api/selected-articles",
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: ["SelectedArticles"],
        }),
    }),
});

export const {
    useGetSelectedArticlesQuery,
    useRecordArticleMutation,
    useDeleteArticleMutation,
} = selectedArticlesApi;
