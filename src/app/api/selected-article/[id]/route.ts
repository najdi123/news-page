import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { NewsArticle } from "../../../../../types";

const filePath = path.join(process.cwd(), "data", "articles.json");

// Helper: Read the file and return an object of articles.
function readArticlesObject(): Record<string, NewsArticle> {
    if (!fs.existsSync(filePath)) return {};
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData) as Record<string, NewsArticle>;
}

// Helper: Write the object of articles to the file.
function writeArticlesObject(obj: Record<string, NewsArticle>): void {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf8");
}

//  **PUT: Create Article (no repeats)**
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const newArticle = (await req.json()) as NewsArticle;
        const articlesObj = readArticlesObject();

        if (articlesObj[params.id]) {
            return NextResponse.json(
                { message: "Article already added." },
                { status: 409 }
            );
        }

        articlesObj[params.id] = newArticle;
        writeArticlesObject(articlesObj);

        return NextResponse.json({ message: "Article created successfully." });
    } catch (error) {
        console.error("Error adding article:", error);
        return NextResponse.json(
            { message: "Error adding article", error },
            { status: 500 }
        );
    }
}

// **Patch: update current article
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const newArticleData = (await req.json()) as NewsArticle; // Expect full replacement data
        const articlesObj = readArticlesObject();

        if (!articlesObj[params.id]) {
            return NextResponse.json(
                { message: "Article not found." },
                { status: 404 }
            );
        }

        // Replace the existing article with the new data
        articlesObj[params.id] = newArticleData;

        writeArticlesObject(articlesObj);

        return NextResponse.json({ message: "Article replaced successfully." });
    } catch (error) {
        console.error("Error replacing article:", error);
        return NextResponse.json(
            { message: "Error replacing article", error },
            { status: 500 }
        );
    }
}



//  **GET: Fetch Single Article**
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const articlesObj = readArticlesObject();
        const article = articlesObj[params.id];

        if (!article) {
            return NextResponse.json({ message: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error("Error fetching article:", error);
        return NextResponse.json({ message: "Error fetching article", error }, { status: 500 });
    }
}

//  **DELETE: Remove Single Article**
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const articlesObj = readArticlesObject();

        if (!articlesObj[params.id]) {
            return NextResponse.json({ message: "Article not found" }, { status: 404 });
        }

        delete articlesObj[params.id];
        writeArticlesObject(articlesObj);

        return NextResponse.json({ message: "Article deleted successfully" });
    } catch (error) {
        console.error("Error deleting article:", error);
        return NextResponse.json({ message: "Error deleting article", error }, { status: 500 });
    }
}
