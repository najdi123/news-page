import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { NewsArticle } from "../../../../types";

// We'll store articles in an object keyed by the article id.
type ArticlesObject = Record<string, NewsArticle>;

const filePath = path.join(process.cwd(), "data", "articles.json");

// GET route: Retrieve all selected articles.
export async function GET(): Promise<NextResponse> {
    try {
        const articlesObj = readArticlesObject();
        console.log("🚀 ~ GET ~ articlesObj:", articlesObj)
        return NextResponse.json(articlesObj);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { message: "Error reading articles", error: message },
            { status: 500 }
        );
    }
}

// POST route: Record (add) a new article.
export async function POST(req: Request): Promise<NextResponse> {
    try {
        const newArticle = (await req.json()) as NewsArticle;
        const articlesObj = readArticlesObject();

        // Use the article's id as the key.
        if (articlesObj[newArticle.id]) {
            return NextResponse.json(
                { message: "Article already exists" },
                { status: 400 }
            );
        }

        articlesObj[newArticle.id] = newArticle;
        writeArticlesObject(articlesObj);

        return NextResponse.json({ message: "Article recorded successfully" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { message: "Error recording article", error: message },
            { status: 500 }
        );
    }
}

// DELETE route: Remove an article by its id sent in the body.
export async function DELETE(req: Request): Promise<NextResponse> {
    try {
        const { id } = await req.json(); // read id from body
        const articlesObj = readArticlesObject();

        if (!articlesObj[id]) {
            return NextResponse.json(
                { message: "Article not found" },
                { status: 404 }
            );
        }

        delete articlesObj[id];
        writeArticlesObject(articlesObj);

        return NextResponse.json({ message: "Article deleted successfully" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { message: "Error deleting article", error: message },
            { status: 500 }
        );
    }
}

// Helper: Read the file and return an object of articles.
function readArticlesObject(): ArticlesObject {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    const fileData = fs.readFileSync(filePath, "utf8");
    console.log("🚀 ~ readArticlesObject ~ fileData:", fileData)
    return JSON.parse(fileData) as ArticlesObject;
}

// Helper: Write the object of articles to the file.
function writeArticlesObject(obj: ArticlesObject): void {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf8");
}
