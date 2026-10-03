import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";


interface ImageBlock {
    type: "image";
    url: string;
    width: number;
    height: number;
    caption?: string;
    altText?: string;
    copyrightHolder?: string;
}

interface TextBlock {
    type: "text";
    text: string;
}

type BodyBlock = ImageBlock | TextBlock;

interface Topic {
    id: string;
    name: string;
}

interface DescriptionFragment {
    type: string;
    model: { text: string; attributes?: unknown[] };
}

interface DescriptionParagraph {
    type: string;
    model: { text: string; blocks?: DescriptionFragment[] };
}

interface DescriptionBlock {
    type: string;
    model: { blocks: DescriptionParagraph[] };
}

interface Article {
    id: string;
    title: string;
    description?: { blocks: DescriptionBlock[] };
    link?: string;
    firstPublished?: string;
    lastPublished?: string;
    byline?: unknown[];
    topics?: Topic[];
    tags?: string[];
    imageUrl?: string;
    body: BodyBlock[];
    text?: string;
    wordCount?: number;
    source?: string;
    sourceUrl?: string;
}

interface ArticleResponse {
    success: boolean;
    cachedAt?: string;
    data: Article;
}
// app/news/[NewsId]/page.jsx
const NewsDetailsPage = async ({ params }: {
    params: Promise<{ NewsId: string }>;
}) => {
    const { NewsId } = await params;

    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${NewsId}`, {
        next: { revalidate: 300 },
    });
    if (!res.ok) notFound();

    const json: ArticleResponse = await res.json();
    const news = json?.data;
    if (!news) notFound();

    const published = news.firstPublished
        ? new Date(news.firstPublished).toLocaleString("bn-BD", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        })
        : null;

    return (
        <main className=" mx-auto max-w-4xl  px-3  sm:py-10">
            <article className="   ">
                {/* Header */}
                <header className="border-b-4 border-red-700 px-4 pb-5  sm:px-8">
                    <p className="mb-3 text-sm font-semibold text-red-700"></p>
                    <h1 className="text-2xl font-bold leading-snug text-neutral-900 sm:text-4xl sm:leading-tight">
                        {news.title}
                    </h1>

                    {news.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text && (
                        <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                            {news.description.blocks[0].model.blocks[0].model.text}
                        </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
                        {published && <time dateTime={news.firstPublished}>{published}</time>}
                        {news.wordCount && <span>{news.wordCount} শব্দ</span>}
                    </div>
                </header>

                {/* Body */}
                <div className="px-4 py-6 sm:px-8">
                    {news.body?.map((block, i) => {
                        if (block.type === "image") {
                            return (
                                <figure key={i} className="-mx-4 my-6 sm:mx-0">
                                    <Image
                                        src={block.url}
                                        alt={block.altText || block.caption || ""}
                                        width={block.width}
                                        height={block.height}
                                        loading={i === 0 ? "eager" : "lazy"}
                                        className="h-auto w-full object-cover"
                                    />
                                    <figcaption className="mt-2 px-4 text-sm leading-snug text-neutral-500 sm:px-0">
                                        {block.caption}
                                        {block.copyrightHolder && (
                                            <span className="ml-1 text-neutral-400">
                                                ({block.copyrightHolder})
                                            </span>
                                        )}
                                    </figcaption>
                                </figure>
                            );
                        }

                        if (block.type === "text") {
                            return (
                                <div key={i} className="space-y-5">
                                    {block.text
                                        .split("\n")
                                        .filter((line) => line.trim())
                                        .map((line, j) => (
                                            <p
                                                key={j}
                                                className="text-[17px] leading-8 text-neutral-800 sm:text-lg"
                                            >
                                                {line}
                                            </p>
                                        ))}
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>

                {/* Footer: topics + source link */}
                <footer className="border-t border-neutral-200 px-4 py-6 sm:px-8">
                    {news.topics && news.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {news.topics.map((topic) => (
                                <span
                                    key={topic.id}
                                    className="rounded-sm bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700"
                                >
                                    {topic.name}
                                </span>
                            ))}
                        </div>
                    )}

                </footer>
            </article>
        </main>
    );
};

export default NewsDetailsPage;
