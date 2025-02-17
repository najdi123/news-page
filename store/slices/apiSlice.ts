import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface NewsSource {
    id: string | null;
    name: string;
}

interface NewsArticle {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

interface NewsResponse {
    status: "ok" | "error";
    totalResults: number;
    articles: NewsArticle[];
}

// Create API slice
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
    endpoints: (builder) => ({
        // Get news filtered by keyword
        getNewsByKeyword: builder.query<NewsResponse, string>({
            query: (keyword) => `everything?q=${encodeURIComponent(keyword)}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`,
        }),
    }),
});

export const { useGetNewsByKeywordQuery, useLazyGetNewsByKeywordQuery } = apiSlice;
