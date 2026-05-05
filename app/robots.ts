import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const PRIVATE_PATHS = ["/admin", "/admin/", "/auth", "/auth/", "/api/"];

// Explicitly opt in every major AI crawler / agent so this site is
// indexable by both search-style and training-style bots.
const AI_USER_AGENTS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Google AI (Bard / Gemini training opt-in)
  "Google-Extended",
  "GoogleOther",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Meta AI
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  // Microsoft / Bing AI
  "Bingbot",
  "BingPreview",
  // Amazon
  "Amazonbot",
  // ByteDance (Doubao / TikTok AI)
  "Bytespider",
  // DuckDuckGo Assist
  "DuckAssistBot",
  // You.com
  "YouBot",
  // Cohere
  "cohere-ai",
  "cohere-training-data-crawler",
  // Mistral / Le Chat
  "MistralAI-User",
  // xAI / Grok
  "Grok",
  // Common Crawl (feeds nearly every open LLM)
  "CCBot",
  // Misc commercial AI crawlers
  "Diffbot",
  "Omgilibot",
  "Omgili",
  "ImagesiftBot",
  "PetalBot",
  "Timpibot",
  "Webzio-Extended",
  "img2dataset",
  // Cursor / agentic IDE fetchers
  "Cursor",
  "Cursor-Agent",
];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
