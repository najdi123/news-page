import { NextResponse } from "next/server";
import { NewsArticle } from "../../../../../types";
type ArticlesObject = Record<string, NewsArticle>;
const filePath = path.join(process.cwd(), "data", "articles.json");
import fs from "fs";
import path from "path";
// DELETE route: Remove an article by its id.
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
        const articlesObj = readArticlesObject();
        const { id } = await params;

        if (!articlesObj[id]) {
            return NextResponse.json(
                { message: "Article not found" },
                { status: 404 }
            );
        }

        // Remove the article
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
    return JSON.parse(fileData) as ArticlesObject;
}

// Helper: Write the object of articles to the file.
function writeArticlesObject(obj: ArticlesObject): void {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), "utf8");
}