export interface NewsSource {
    id: string | null;
    name: string;
}

export interface NewsArticle {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string;
    content: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

export interface NewsResponse {
    status: "ok" | "error";
    totalResults: number;
    articles: NewsArticle[];
}

// Define the Redux state shape for cached queries
export interface RootState {
    api: {
        queries: {
            [key: string]: {
                data?: NewsResponse;
            };
        };
    };
}
