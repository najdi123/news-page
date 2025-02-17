// selectedArticlesApiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsArticle } from "../../types";

export const selectedArticlesApi = createApi({
    reducerPath: "selectedArticlesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/selected-articles" }),
    endpoints: (builder) => ({
        // GET: Retrieve all selected articles.
        getSelectedArticles: builder.query<Record<string, NewsArticle>, void>({
            query: () => "",
        }),
        // POST: Record a new article.
        recordArticle: builder.mutation<{ message: string }, NewsArticle>({
            query: (article) => ({
                url: "",
                method: "POST",
                body: article,
            }),
        }),
    }),
});

export const {
    useGetSelectedArticlesQuery,
    useRecordArticleMutation,
} = selectedArticlesApi;
