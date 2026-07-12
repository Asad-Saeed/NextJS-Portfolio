"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { useRef, useState } from "react";
import {
  FiImage,
  FiLink,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiMinus,
  FiList,
  FiX,
  FiCheck,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
} from "react-icons/fi";
import { uploadFile } from "@/lib/actions/upload";
import Tooltip from "@/components/Common/Tooltip";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

// ── Toolbar button ────────────────────────────────────────────────────────────

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
  small,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  small?: boolean;
}) {
  const btn = (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      title={title}
      style={{
        color: active ? "var(--ds-link)" : "var(--ds-fg-secondary)",
        backgroundColor: active ? "rgba(50,145,255,0.14)" : "transparent",
      }}
      className={`flex items-center justify-center rounded font-medium transition-colors
        hover:bg-white/[0.06] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed
        ${small ? "w-6 h-6 text-[11px]" : "w-7 h-7 text-[12px]"}`}
    >
      {children}
    </button>
  );
  if (!title) return btn;
  return <Tooltip content={title}>{btn}</Tooltip>;
}

function Sep() {
  return <div className="self-stretch w-px mx-0.5 bg-white/[0.08]" />;
}

// ── Main editor ───────────────────────────────────────────────────────────────

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      ImageExtension.configure({ allowBase64: false }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing your story…",
      }),
      CharacterCount,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      Typography,
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate({ editor: e }) {
      onChange(e.getHTML());
    },
    onSelectionUpdate({ editor: e }) {
      const { from, to } = e.state.selection;
      if (from === to || e.isActive("codeBlock")) {
        setBubbleVisible(false);
        return;
      }
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        setBubblePos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
        setBubbleVisible(true);
      }
    },
    editorProps: {
      attributes: { class: "tiptap-prose" },
    },
  });

  // ── image upload ──────────────────────────────────────────────────────────

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "blog");
    const result = await uploadFile(fd);
    setUploading(false);
    if ("url" in result && result.url) {
      editor.chain().focus().setImage({ src: result.url, alt: file.name }).run();
    }
    e.target.value = "";
  }

  // ── link helpers ──────────────────────────────────────────────────────────

  function openLink() {
    if (!editor) return;
    setLinkUrl(editor.getAttributes("link").href ?? "");
    setShowLink(true);
  }

  function applyLink() {
    if (!editor) return;
    const href = linkUrl.trim();
    if (href) {
      editor
        .chain()
        .focus()
        .setLink({ href: /^https?:\/\//i.test(href) ? href : `https://${href}` })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setShowLink(false);
    setLinkUrl("");
  }

  function removeLink() {
    editor?.chain().focus().unsetLink().run();
    setShowLink(false);
  }

  if (!editor) return null;

  const words = editor.storage.characterCount?.words() ?? 0;
  const chars = editor.storage.characterCount?.characters() ?? 0;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "var(--ds-surface)", boxShadow: "var(--ds-shadow-border)" }}
    >
      {/* ── Fixed toolbar ────────────────────────────────────────────────── */}
      <div
        className="flex flex-wrap items-center gap-0.5 px-2.5 py-1.5 border-b border-white/[0.06]"
        style={{ backgroundColor: "rgba(255,255,255,0.025)" }}
      >
        {/* Block type */}
        <Btn
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive("paragraph")}
          title="Paragraph"
        >
          <span className="font-serif text-[13px]">¶</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <span className="font-bold tracking-tight">H1</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <span className="font-bold tracking-tight">H2</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <span className="font-bold tracking-tight">H3</span>
        </Btn>

        <Sep />

        {/* Inline format */}
        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold (⌘B)"
        >
          <span className="font-extrabold text-[13px]">B</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic (⌘I)"
        >
          <span className="italic font-semibold text-[13px]">I</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline (⌘U)"
        >
          <span className="underline underline-offset-2 text-[13px]">U</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <span className="line-through text-[13px]">S</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight")}
          title="Highlight"
        >
          <span
            style={{
              textDecoration: "underline",
              textDecorationColor: "#facc15",
              textDecorationThickness: "3px",
              textUnderlineOffset: "2px",
            }}
          >
            A
          </span>
        </Btn>

        <Sep />

        {/* Code */}
        <Btn
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          title="Inline code"
        >
          <span className="font-mono text-[10px] tracking-tighter">`c`</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code block"
        >
          <span className="font-mono text-[10px]">{"{}"}</span>
        </Btn>

        <Sep />

        {/* Block elements */}
        <Btn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <span className="font-serif text-[16px] leading-none">&ldquo;</span>
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <FiList className="text-[13px]" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered list"
        >
          <span className="font-mono text-[10px] font-bold">1.</span>
        </Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
          <FiMinus className="text-[13px]" />
        </Btn>

        <Sep />

        {/* Text align */}
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align left"
        >
          <FiAlignLeft className="text-[12px]" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align center"
        >
          <FiAlignCenter className="text-[12px]" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align right"
        >
          <FiAlignRight className="text-[12px]" />
        </Btn>

        <Sep />

        {/* Link & image */}
        <Btn onClick={openLink} active={editor.isActive("link")} title="Insert / edit link">
          <FiLink className="text-[12px]" />
        </Btn>
        <Btn onClick={() => fileRef.current?.click()} disabled={uploading} title="Insert image">
          <FiImage className="text-[12px]" />
        </Btn>

        <Sep />

        {/* History */}
        <Btn
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (⌘Z)"
        >
          <FiCornerUpLeft className="text-[12px]" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (⌘⇧Z)"
        >
          <FiCornerUpRight className="text-[12px]" />
        </Btn>
      </div>

      {/* ── Link input bar ────────────────────────────────────────────────── */}
      {showLink && (
        <div
          className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06]"
          style={{ backgroundColor: "rgba(50,145,255,0.06)" }}
        >
          <FiLink className="text-xs shrink-0" style={{ color: "var(--ds-link)" }} />
          <input
            autoFocus
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink();
              }
              if (e.key === "Escape") setShowLink(false);
            }}
            placeholder="https://example.com"
            className="flex-1 text-xs bg-transparent outline-none"
            style={{ color: "var(--ds-fg)", caretColor: "var(--ds-link)" }}
          />
          <Tooltip content="Apply link">
            <button
              type="button"
              onClick={applyLink}
              title="Apply link"
              className="flex items-center justify-center w-5 h-5 rounded shrink-0"
              style={{ backgroundColor: "var(--ds-link)", color: "#fff" }}
            >
              <FiCheck className="text-[10px]" />
            </button>
          </Tooltip>
          {editor.isActive("link") && (
            <Tooltip content="Remove link">
              <button
                type="button"
                onClick={removeLink}
                className="text-[10px] shrink-0 transition-colors"
                style={{ color: "var(--ds-fg-tertiary)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f87171")}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--ds-fg-tertiary)")
                }
              >
                Remove
              </button>
            </Tooltip>
          )}
          <Tooltip content="Close">
            <button
              type="button"
              onClick={() => setShowLink(false)}
              className="shrink-0"
              style={{ color: "var(--ds-fg-tertiary)" }}
            >
              <FiX className="text-xs" />
            </button>
          </Tooltip>
        </div>
      )}

      {/* ── Bubble menu (custom fixed-position, appears on text selection) ── */}
      {bubbleVisible && (
        <div
          style={{
            position: "fixed",
            top: bubblePos.y,
            left: bubblePos.x,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
            pointerEvents: "all",
          }}
        >
          <div
            className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg"
            style={{
              background: "#141414",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <Btn
              small
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              title="Bold"
            >
              <span className="font-extrabold">B</span>
            </Btn>
            <Btn
              small
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              title="Italic"
            >
              <span className="italic font-semibold">I</span>
            </Btn>
            <Btn
              small
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive("underline")}
              title="Underline"
            >
              <span className="underline underline-offset-2">U</span>
            </Btn>
            <Btn
              small
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive("strike")}
              title="Strikethrough"
            >
              <span className="line-through">S</span>
            </Btn>
            <Btn
              small
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              active={editor.isActive("highlight")}
              title="Highlight"
            >
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#facc15",
                  textDecorationThickness: "2px",
                }}
              >
                A
              </span>
            </Btn>

            <div className="w-px h-3.5 bg-white/10 mx-0.5" />

            <Btn
              small
              onClick={() => editor.chain().focus().toggleCode().run()}
              active={editor.isActive("code")}
              title="Inline code"
            >
              <span className="font-mono text-[9px] tracking-tighter">`c`</span>
            </Btn>

            <div className="w-px h-3.5 bg-white/10 mx-0.5" />

            <Btn
              small
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              active={editor.isActive("heading", { level: 2 })}
              title="Heading 2"
            >
              <span className="font-bold text-[9px]">H2</span>
            </Btn>
            <Btn
              small
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              active={editor.isActive("heading", { level: 3 })}
              title="Heading 3"
            >
              <span className="font-bold text-[9px]">H3</span>
            </Btn>

            <div className="w-px h-3.5 bg-white/10 mx-0.5" />

            <Btn
              small
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive("blockquote")}
              title="Blockquote"
            >
              <span className="font-serif text-[14px] leading-none">&ldquo;</span>
            </Btn>

            <div className="w-px h-3.5 bg-white/10 mx-0.5" />

            <Btn small onClick={openLink} active={editor.isActive("link")} title="Link">
              <FiLink className="text-[10px]" />
            </Btn>
          </div>
        </div>
      )}

      {/* ── Editor area ───────────────────────────────────────────────────── */}
      <EditorContent editor={editor} />

      {/* ── Footer: word / char count ─────────────────────────────────────── */}
      <div
        className="flex items-center justify-end gap-3 px-4 py-1.5 border-t border-white/[0.04] font-mono text-[10px]"
        style={{ color: "var(--ds-fg-tertiary)" }}
      >
        {uploading ? (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 border border-current border-t-transparent rounded-full animate-spin" />
            Uploading image…
          </span>
        ) : (
          <>
            <span>{words} words</span>
            <span className="opacity-40">·</span>
            <span>{chars} chars</span>
          </>
        )}
      </div>

      {/* ── Hidden file input ─────────────────────────────────────────────── */}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleImageFile}
      />
    </div>
  );
}
