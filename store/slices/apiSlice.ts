import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsArticle } from "../../types";



// The overall response from the Currents API.
export interface NewsResponse {
    status: "ok" | "error";
    news: NewsArticle[];
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.currentsapi.services/v1/",
    }),
    endpoints: (builder) => ({
        // Fetch the latest news (filtering by English).
        getLatestNews: builder.query<NewsResponse, void>({
            query: () =>
                `latest-news?language=en&apiKey=${process.env.CURRENTS_API_KEY}`,
        }),
        // Search news by a keyword (filtering by English).
        searchNews: builder.query<NewsResponse, string>({
            query: (keyword) =>
                `search?language=en&keywords=${encodeURIComponent(
                    keyword
                )}&apiKey=${process.env.CURRENTS_API_KEY}`,
        }),
    }),
});

export const { useGetLatestNewsQuery, useSearchNewsQuery, useLazySearchNewsQuery } = apiSlice;