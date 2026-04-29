"use client";

import { useState } from "react";
import { FiLoader, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { sendMessage } from "@/lib/actions/messages";

interface ContactFormProps {
  slug: string;
}

const inputBase =
  "w-full text-[14px] rounded-md px-3 py-2.5 outline-none transition-shadow duration-150 placeholder:text-[var(--ds-fg-muted)]";

export default function ContactForm({ slug }: ContactFormProps) {
  const [form, setForm] = useState({ sender_name: "", sender_email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await sendMessage({
      slug,
      sender_name: form.sender_name,
      sender_email: form.sender_email,
      message: form.message,
    });

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setForm({ sender_name: "", sender_email: "", message: "" });
    }
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--ds-surface)",
    color: "var(--ds-fg)",
    boxShadow: "var(--ds-shadow-border)",
    letterSpacing: "-0.005em",
  };
  const focusOnly = "focus:[box-shadow:var(--ds-shadow-border),var(--ds-focus-ring)]";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-4 sm:p-5 lg:p-6"
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sender_name"
            className="text-mono-label"
            style={{ color: "var(--ds-fg-tertiary)" }}
          >
            Name
          </label>
          <input
            id="sender_name"
            name="sender_name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            className={`${inputBase} ${focusOnly}`}
            style={inputStyle}
            value={form.sender_name}
            onChange={(e) => setForm({ ...form, sender_name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sender_email"
            className="text-mono-label"
            style={{ color: "var(--ds-fg-tertiary)" }}
          >
            Email
          </label>
          <input
            id="sender_email"
            name="sender_email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@domain.com"
            className={`${inputBase} ${focusOnly}`}
            style={inputStyle}
            value={form.sender_email}
            onChange={(e) => setForm({ ...form, sender_email: e.target.value })}
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5 mt-3">
        <label
          htmlFor="message"
          className="text-mono-label"
          style={{ color: "var(--ds-fg-tertiary)" }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What are you working on? How can I help?"
          className={`${inputBase} ${focusOnly} resize-y min-h-[140px] leading-relaxed`}
          style={inputStyle}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {/* Status messages */}
      {success && (
        <div
          className="mt-4 flex items-center gap-2 rounded-md px-3 py-2.5 text-[13px]"
          style={{
            color: "var(--ds-develop)",
            backgroundColor: "var(--ds-badge-bg)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          <FiCheckCircle size={14} />
          Message sent — I&apos;ll get back to you soon.
        </div>
      )}
      {error && (
        <div
          className="mt-4 flex items-center gap-2 rounded-md px-3 py-2.5 text-[13px]"
          style={{
            color: "var(--ds-ship)",
            backgroundColor: "color-mix(in srgb, var(--ds-ship) 12%, transparent)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          <FiAlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Footer with submit */}
      <div
        className="mt-5 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        style={{ boxShadow: "inset 0 1px 0 0 var(--ds-border-shadow)" }}
      >
        <span className="text-mono-label" style={{ color: "var(--ds-fg-tertiary)" }}>
          Replies usually within 24h
        </span>
        <button
          type="submit"
          disabled={loading}
          className="ds-btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={13} />
              Sending…
            </>
          ) : (
            <>
              Send message
              <span
                aria-hidden
                className="-mr-0.5 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
