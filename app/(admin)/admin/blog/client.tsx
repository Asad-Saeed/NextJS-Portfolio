"use client";

import { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiArrowLeft,
  FiEdit,
  FiX,
  FiGlobe,
  FiFileText,
} from "react-icons/fi";
import type { BlogPost } from "@/types";
import { createPost, updatePost, publishPost, unpublishPost, deletePost } from "@/lib/actions/blog";
import ImageUpload from "@/components/admin/ImageUpload";
import LoadingButton from "@/components/admin/LoadingButton";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { generateSlug } from "@/lib/markdown";
import Tooltip from "@/components/Common/Tooltip";

// ── helpers ──────────────────────────────────────────────────────────────────

function estimateReadingTime(html: string): number {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── form state ────────────────────────────────────────────────────────────────

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  seo_title: string;
  seo_description: string;
};

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  seo_title: "",
  seo_description: "",
};

// ── component ─────────────────────────────────────────────────────────────────

export default function BlogClient({ posts: initialPosts }: { posts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [view, setView] = useState<"list" | "editor">("list");

  // Sync when Next.js re-renders the parent server component (e.g. on navigation)
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [slugLocked, setSlugLocked] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── navigation ───────────────────────────────────────────────────────────────

  function openNew() {
    setEditPost(null);
    setForm(EMPTY_FORM);
    setTags([]);
    setTagInput("");
    setSlugLocked(true);
    setError(null);
    setView("editor");
  }

  function openEdit(post: BlogPost) {
    setEditPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image_url: post.cover_image_url,
      seo_title: post.seo_title,
      seo_description: post.seo_description,
    });
    setTags(post.post_tags.map((t) => t.tag));
    setTagInput("");
    setSlugLocked(true);
    setError(null);
    setView("editor");
  }

  function backToList() {
    setView("list");
    setError(null);
  }

  // ── form helpers ──────────────────────────────────────────────────────────────

  const set =
    (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      setForm((prev) => {
        const next = { ...prev, [k]: val };
        if (k === "title" && slugLocked) {
          next.slug = generateSlug(val);
        }
        return next;
      });
    };

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase().replace(/,/g, "");
      if (tag && !tags.includes(tag)) setTags((prev) => [...prev, tag]);
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  // ── save draft ────────────────────────────────────────────────────────────────

  async function handleSaveDraft() {
    setSaving(true);
    setError(null);
    const postTags = tags.map((tag, i) => ({
      id: "",
      post_id: editPost?.id ?? "",
      tag,
      sort_order: i,
    }));
    const now = new Date().toISOString();

    if (editPost) {
      const result = await updatePost(editPost.id, form, tags);
      setSaving(false);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editPost.id
            ? {
                ...p,
                ...form,
                status: "draft",
                post_tags: postTags,
                reading_time: estimateReadingTime(form.content),
                updated_at: now,
              }
            : p
        )
      );
    } else {
      const result = await createPost(form, tags);
      setSaving(false);
      if (result?.error) {
        setError(result.error);
        return;
      }
      const { id, slug } = result as { id: string; slug: string };
      const newPost: BlogPost = {
        id,
        user_id: "",
        ...form,
        slug,
        status: "draft",
        reading_time: estimateReadingTime(form.content),
        published_at: null,
        post_tags: postTags.map((t) => ({ ...t, post_id: id })),
        created_at: now,
        updated_at: now,
      };
      setPosts((prev) => [newPost, ...prev]);
    }
    backToList();
  }

  // ── publish / unpublish ───────────────────────────────────────────────────────

  async function handlePublish() {
    const postTags = tags.map((tag, i) => ({
      id: "",
      post_id: editPost?.id ?? "",
      tag,
      sort_order: i,
    }));
    const now = new Date().toISOString();

    if (!editPost) {
      setSaving(true);
      setError(null);
      const created = await createPost(form, tags);
      setSaving(false);
      if (created?.error) {
        setError(created.error);
        return;
      }
      const { id, slug } = created as { id: string; slug: string };
      setPublishing(true);
      const pub = await publishPost(id);
      setPublishing(false);
      if (pub?.error) {
        setError(pub.error);
        return;
      }
      const newPost: BlogPost = {
        id,
        user_id: "",
        ...form,
        slug,
        status: "published",
        reading_time: estimateReadingTime(form.content),
        published_at: now,
        post_tags: postTags.map((t) => ({ ...t, post_id: id })),
        created_at: now,
        updated_at: now,
      };
      setPosts((prev) => [newPost, ...prev]);
      backToList();
      return;
    }

    setSaving(true);
    setError(null);
    const upd = await updatePost(editPost.id, form, tags);
    setSaving(false);
    if (upd?.error) {
      setError(upd.error);
      return;
    }
    setPublishing(true);
    const pub = await publishPost(editPost.id);
    setPublishing(false);
    if (pub?.error) {
      setError(pub.error);
      return;
    }
    const publishedAt = editPost.published_at ?? now;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === editPost.id
          ? {
              ...p,
              ...form,
              status: "published",
              post_tags: postTags,
              reading_time: estimateReadingTime(form.content),
              published_at: publishedAt,
              updated_at: now,
            }
          : p
      )
    );
    backToList();
  }

  async function handleUnpublish(id: string) {
    setPublishing(true);
    const result = await unpublishPost(id);
    setPublishing(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "draft" } : p)));
  }

  // ── delete ────────────────────────────────────────────────────────────────────

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    const result = await deletePost(id);
    setDeletingId(null);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (view === "editor") backToList();
  }

  // ── render: list ──────────────────────────────────────────────────────────────

  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-Snow text-2xl font-bold">Blog Posts</h1>
            <p className="text-LightGray text-sm mt-0.5">
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: "var(--ds-link)", color: "#fff" }}
          >
            <FiPlus className="text-base" />
            New Post
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm text-red-400 bg-red-400/10 border border-red-400/20">
            {error}
          </div>
        )}

        {posts.length === 0 ? (
          <div
            className="rounded-xl p-12 text-center"
            style={{ backgroundColor: "var(--ds-surface)", boxShadow: "var(--ds-shadow-border)" }}
          >
            <FiFileText className="text-4xl mx-auto mb-3 text-LightGray" />
            <p className="text-LightGray text-sm">No posts yet. Write your first one!</p>
            <button
              onClick={openNew}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "var(--ds-link)", color: "#fff" }}
            >
              Write a Post
            </button>
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden"
            style={{ boxShadow: "var(--ds-shadow-border)", backgroundColor: "var(--ds-surface)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-DarkGray/30">
                  <th className="text-left px-4 py-3 text-LightGray font-medium">Title</th>
                  <th className="text-left px-4 py-3 text-LightGray font-medium hidden sm:table-cell">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-LightGray font-medium hidden md:table-cell">
                    Published
                  </th>
                  <th className="text-left px-4 py-3 text-LightGray font-medium hidden lg:table-cell">
                    Read time
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr
                    key={post.id}
                    className={i < posts.length - 1 ? "border-b border-DarkGray/20" : ""}
                  >
                    <td className="px-4 py-3">
                      <span className="text-Snow font-medium truncate block max-w-xs">
                        {post.title || "(Untitled)"}
                      </span>
                      <span className="text-LightGray text-xs">/blog/{post.slug}</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor:
                            post.status === "published"
                              ? "rgba(0,200,100,0.12)"
                              : "rgba(255,200,0,0.10)",
                          color: post.status === "published" ? "#00c864" : "#e5a000",
                        }}
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-LightGray">
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-LightGray">
                      {post.reading_time} min
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        {post.status === "published" && (
                          <Tooltip content="Unpublish">
                            <button
                              onClick={() => handleUnpublish(post.id)}
                              disabled={publishing}
                              title="Unpublish"
                              className="p-1.5 rounded text-LightGray hover:text-Snow hover:bg-EveningBlack transition-colors"
                            >
                              <FiGlobe className="text-sm" />
                            </button>
                          </Tooltip>
                        )}
                        <Tooltip content="Edit">
                          <button
                            onClick={() => openEdit(post)}
                            title="Edit"
                            className="p-1.5 rounded text-LightGray hover:text-Snow hover:bg-EveningBlack transition-colors"
                          >
                            <FiEdit2 className="text-sm" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <button
                            onClick={() => handleDelete(post.id)}
                            disabled={deletingId === post.id}
                            title="Delete"
                            className="p-1.5 rounded text-LightGray hover:text-red-400 hover:bg-red-400/10 transition-colors"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // ── render: editor ────────────────────────────────────────────────────────────

  const isPublished = editPost?.status === "published";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={backToList}
          className="flex items-center gap-1.5 text-LightGray hover:text-Snow text-sm transition-colors"
        >
          <FiArrowLeft className="text-base" />
          Back to Posts
        </button>
        <span className="text-DarkGray">/</span>
        <span className="text-Snow text-sm font-medium">{editPost ? "Edit Post" : "New Post"}</span>
        {editPost && (
          <span
            className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: isPublished ? "rgba(0,200,100,0.12)" : "rgba(255,200,0,0.10)",
              color: isPublished ? "#00c864" : "#e5a000",
            }}
          >
            {isPublished ? "Published" : "Draft"}
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg text-sm text-red-400 bg-red-400/10 border border-red-400/20">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* Left: main content */}
        <div className="flex flex-col gap-5">
          {/* Title */}
          <textarea
            value={form.title}
            onChange={set("title")}
            placeholder="Post title…"
            rows={2}
            className="w-full bg-transparent text-Snow text-2xl font-bold placeholder-DarkGray outline-none resize-none border-b border-DarkGray/30 pb-3 focus:border-LightGray/40 transition-colors"
          />

          {/* Slug */}
          <div className="flex items-center gap-2">
            <span className="text-LightGray text-xs shrink-0">/blog/</span>
            <input
              type="text"
              value={form.slug}
              onChange={set("slug")}
              readOnly={slugLocked}
              placeholder="post-slug"
              className={`flex-1 text-xs bg-transparent outline-none transition-colors ${
                slugLocked
                  ? "text-LightGray cursor-default"
                  : "text-Snow border-b border-DarkGray/40 focus:border-LightGray/40 pb-0.5"
              }`}
            />
            <Tooltip content={slugLocked ? "Unlock slug" : "Lock slug"}>
              <button
                onClick={() => setSlugLocked((v) => !v)}
                title={slugLocked ? "Edit slug" : "Lock slug"}
                className="text-LightGray hover:text-Snow text-xs transition-colors"
              >
                {slugLocked ? <FiEdit className="text-xs" /> : <FiX className="text-xs" />}
              </button>
            </Tooltip>
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-LightGray text-xs mb-1.5 block">
              Excerpt{" "}
              <span className="text-DarkGray">(card summary + default meta description)</span>
            </label>
            <textarea
              value={form.excerpt}
              onChange={set("excerpt")}
              placeholder="A short summary of this post…"
              rows={3}
              className="w-full text-sm bg-EveningBlack border border-DarkGray/30 rounded-lg px-3 py-2.5 text-Snow placeholder-DarkGray outline-none focus:border-LightGray/40 transition-colors resize-none"
            />
          </div>

          {/* WYSIWYG editor — key forces remount when post changes */}
          <RichTextEditor
            key={editPost?.id ?? "new"}
            value={form.content}
            onChange={(html) => setForm((p) => ({ ...p, content: html }))}
            placeholder="Start writing your story…"
          />

          {/* Tags */}
          <div>
            <label className="text-LightGray text-xs mb-1.5 block">
              Tags <span className="text-DarkGray">(press Enter or comma to add)</span>
            </label>
            <div
              className="flex flex-wrap gap-1.5 p-2.5 rounded-lg border border-DarkGray/30 min-h-[44px]"
              style={{ backgroundColor: "var(--ds-surface)" }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: "rgba(50,145,255,0.12)", color: "#7cb8ff" }}
                >
                  {tag}
                  <Tooltip content="Remove tag">
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-white transition-colors"
                    >
                      <FiX className="text-[10px]" />
                    </button>
                  </Tooltip>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder={tags.length === 0 ? "next.js, react, typescript…" : ""}
                className="flex-1 min-w-[120px] bg-transparent text-Snow text-xs outline-none placeholder-DarkGray/60"
              />
            </div>
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="flex flex-col gap-5">
          {/* Cover image */}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "var(--ds-surface)", boxShadow: "var(--ds-shadow-border)" }}
          >
            <h3 className="text-Snow text-sm font-medium mb-3">Cover Image</h3>
            <ImageUpload
              value={form.cover_image_url}
              onChange={(url) => setForm((p) => ({ ...p, cover_image_url: url }))}
              bucket="blog"
              label="Cover image"
              accept="image/*"
            />
          </div>

          {/* SEO fields */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ backgroundColor: "var(--ds-surface)", boxShadow: "var(--ds-shadow-border)" }}
          >
            <h3 className="text-Snow text-sm font-medium">
              SEO Overrides <span className="text-LightGray font-normal">(optional)</span>
            </h3>
            <div>
              <label className="text-LightGray text-xs mb-1 block">
                SEO Title <span className="text-DarkGray">≤ 500 chars</span>
              </label>
              <input
                type="text"
                value={form.seo_title}
                onChange={set("seo_title")}
                maxLength={500}
                placeholder={form.title || "Defaults to post title"}
                className="w-full text-xs bg-EveningBlack border border-DarkGray/30 rounded-lg px-3 py-2 text-Snow placeholder-DarkGray outline-none focus:border-LightGray/40 transition-colors"
              />
            </div>
            <div>
              <label className="text-LightGray text-xs mb-1 block">
                SEO Description <span className="text-DarkGray">≤ 2000 chars</span>
              </label>
              <textarea
                value={form.seo_description}
                onChange={set("seo_description")}
                maxLength={2000}
                rows={3}
                placeholder={form.excerpt || "Defaults to excerpt"}
                className="w-full text-xs bg-EveningBlack border border-DarkGray/30 rounded-lg px-3 py-2 text-Snow placeholder-DarkGray outline-none focus:border-LightGray/40 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div
            className="rounded-xl p-4 flex flex-col gap-2.5"
            style={{ backgroundColor: "var(--ds-surface)", boxShadow: "var(--ds-shadow-border)" }}
          >
            <h3 className="text-Snow text-sm font-medium mb-0.5">Publish</h3>

            <LoadingButton loading={saving} onClick={handleSaveDraft} variant="ghost" type="button">
              Save Draft
            </LoadingButton>

            {(!editPost || !isPublished) && (
              <LoadingButton
                loading={publishing}
                onClick={handlePublish}
                variant="primary"
                type="button"
              >
                {editPost ? "Save & Publish" : "Publish"}
              </LoadingButton>
            )}

            {isPublished && editPost && (
              <>
                <LoadingButton
                  loading={saving}
                  onClick={handleSaveDraft}
                  variant="primary"
                  type="button"
                >
                  Save Changes
                </LoadingButton>
                <LoadingButton
                  loading={publishing}
                  onClick={() => handleUnpublish(editPost.id)}
                  variant="ghost"
                  type="button"
                >
                  Unpublish
                </LoadingButton>
              </>
            )}

            {editPost && (
              <LoadingButton
                loading={deletingId === editPost.id}
                onClick={() => handleDelete(editPost.id)}
                variant="danger"
                type="button"
              >
                Delete Post
              </LoadingButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
