import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeader from "@/components/Common/SectionHeader";
import BlogCard from "./BlogCard";
import type { BlogPost } from "@/types";

interface LatestBlogProps {
  posts: BlogPost[];
  eyebrow?: string;
  heading?: string;
  description?: string;
}

export default function LatestBlog({ posts, eyebrow, heading, description }: LatestBlogProps) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" aria-label="Latest blog posts" className="px-5 sm:px-8 py-4 sm:py-5">
      <SectionHeader
        eyebrow={eyebrow || "Writing"}
        title={heading || "Thoughts & Tutorials"}
        description={description}
        right={
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            style={{ color: "var(--ds-link)" }}
          >
            See all posts
            <FiArrowRight size={14} aria-hidden />
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <BlogCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
