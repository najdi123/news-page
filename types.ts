export interface NewsArticle {
    id: string;
    title: string;
    description: string;
    url: string;
    author: string;
    image: string;      // field provided by Currents
    language: string;
    category: string[];
    published: string;
}

export interface NewsResponse {
    status: "ok" | "error";
    news: NewsArticle[];
}

export interface RootState {
    api: {
        queries: {
            [key: string]: {
                data?: NewsResponse;
            };
        };
    };
}
