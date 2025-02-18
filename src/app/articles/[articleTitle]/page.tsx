import ArticleItem from "@/app/_components/articleItem";
import { NewsArticle } from "../../../../types";

async function getSelectedArticles(): Promise<NewsArticle[]> {
  // Use an absolute URL for SSR. You can also use an environment variable to construct this URL.
  const res = await fetch("http://localhost:3000/api/selected-articles", {
    // Optionally disable caching if you need fresh data on each request.
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch selected articles");
  }
  // Our API returns an object keyed by the article id.
  const data = (await res.json()) as Record<string, NewsArticle>;
  // Simply return an array of articles.
  return Object.values(data);
}

export default async function SelectedArticles() {
  let articles: NewsArticle[] = [];
  try {
    articles = await getSelectedArticles();
  } catch (error: unknown) {
    console.error(error);
  }

  return (
    <div className="max-w-3xl h-lvh overflow-auto">
      <h4 className="my-4">Client Side Rendering (SEO OPTIMIZED)</h4>
      <h2 className="text-2xl font-bold mb-4">Selected Articles</h2>
      {articles.length === 0 ? (
        <p>No selected articles.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </ul>
      )}
    </div>
  );
}
