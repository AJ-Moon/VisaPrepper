import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { z } from "zod";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const frontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  publishDate: z.string(),
  updatedDate: z.string().optional(),
  author: z.string(),
  authorRole: z.string().optional(),
  primaryKeyword: z.string(),
  market: z.enum(["pakistan", "india", "bangladesh"]).optional(),
  tags: z.array(z.string()).optional().default([]),
  draft: z.boolean().optional().default(false),
  faq: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional()
    .default([]),
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export type TocItem = { depth: number; value: string; id: string };

export type Post = PostFrontmatter & {
  content: string;
  toc: TocItem[];
  readingTimeMinutes: number;
};

function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];
  for (const rawLine of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.*)$/.exec(rawLine.trim());
    if (match) {
      const depth = match[1].length;
      const value = match[2].trim();
      toc.push({ depth, value, id: slugger.slug(value) });
    }
  }
  return toc;
}

function estimateReadingTime(markdown: string): number {
  const wordCount = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 200));
}

let cachedPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  const filenames = fs.readdirSync(BLOG_DIR).filter((name) => name.endsWith(".mdx"));

  const posts = filenames
    .map((filename) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = frontmatterSchema.parse(data);
      return {
        ...frontmatter,
        content,
        toc: extractToc(content),
        readingTimeMinutes: estimateReadingTime(content),
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

  cachedPosts = posts;
  return posts;
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): Post[] {
  const currentMarket = getPostBySlug(currentSlug)?.market;
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => !currentMarket || !post.market || post.market === currentMarket)
    .filter((post) => post.tags.some((tag) => tags.includes(tag)))
    .sort((a, b) => b.tags.filter((tag) => tags.includes(tag)).length - a.tags.filter((tag) => tags.includes(tag)).length)
    .slice(0, limit);
}
