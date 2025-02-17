import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { NewsArticle } from "../../../../types";

// We'll store articles in a Map keyed by the article URL.
type ArticlesMap = Map<string, NewsArticle>;

const filePath = path.join(process.cwd(), "data", "articles.json");

// GET route: Retrieve all selected articles.
export async function GET(): Promise<NextResponse> {
    try {
        const articlesMap = readArticlesMap();
        // Convert the Map to a plain object.
        const articlesObj = Object.fromEntries(articlesMap);
        return NextResponse.json(articlesObj);
    } catch (error: any) {
        return NextResponse.json(
            { message: "Error reading articles", error: error.message },
            { status: 500 }
        );
    }
}

// POST route: Record (add) a new article.
export async function POST(req: Request): Promise<NextResponse> {
    try {
        const newArticle = (await req.json()) as NewsArticle;
        const articlesMap = readArticlesMap();

        // Use the article's URL as the key.
        if (articlesMap.has(newArticle.url)) {
            return NextResponse.json(
                { message: "Article already exists" },
                { status: 400 }
            );
        }

        articlesMap.set(newArticle.url, newArticle);
        writeArticlesMap(articlesMap);

        return NextResponse.json({ message: "Article recorded successfully" });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { message: "Error reading articles", error: message },
            { status: 500 }
        );
    }
}

// Helper: Read the file and convert it to a Map.
function readArticlesMap(): ArticlesMap {
    if (!fs.existsSync(filePath)) {
        return new Map();
    }
    const fileData = fs.readFileSync(filePath, "utf8");
    const plainObj = JSON.parse(fileData) as Record<string, NewsArticle>;
    return new Map(Object.entries(plainObj));
}

// Helper: Convert the Map to a plain object and write it to the file.
function writeArticlesMap(map: ArticlesMap): void {
    const plainObj = Object.fromEntries(map);
    fs.writeFileSync(filePath, JSON.stringify(plainObj, null, 2), "utf8");
}
