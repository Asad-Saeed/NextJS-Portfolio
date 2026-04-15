"use client";

import { useState } from "react";
import { HiMail, HiUser } from "react-icons/hi";
import { BsChatTextFill } from "react-icons/bs";
import { FiLoader, FiCheck } from "react-icons/fi";
import { sendMessage } from "@/lib/actions/messages";

interface ContactFormProps {
  slug: string;
}

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

  return (
    <div className="my-12 w-full h-auto text-Snow">
      <h2 className="text-lg font-semibold text-Green">Get In Touch</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-4 py-6 px-4 sm:px-6 card_stylings rounded-xl text-sm"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="sender_name" className="sr-only">
            Your name
          </label>
          <div className="userIcon relative mb-6">
            <div
              id="icon"
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-xl pointer-events-none"
              aria-hidden="true"
            >
              <HiUser />
            </div>
            <input
              id="sender_name"
              name="sender_name"
              type="text"
              autoComplete="name"
              className="input_stylings"
              placeholder="Name"
              required
              value={form.sender_name}
              onChange={(e) => setForm({ ...form, sender_name: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="sender_email" className="sr-only">
            Your email address
          </label>
          <div className="mailIcon relative mb-6">
            <div
              id="icon"
              className="absolute inset-y-0 left-0 flex items-center text-xl pl-3 pointer-events-none"
              aria-hidden="true"
            >
              <HiMail />
            </div>
            <input
              id="sender_email"
              name="sender_email"
              type="email"
              autoComplete="email"
              className="input_stylings"
              placeholder="Email"
              required
              value={form.sender_email}
              onChange={(e) => setForm({ ...form, sender_email: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="message" className="sr-only">
            Your message
          </label>
          <div className="textIcon relative mb-6">
            <div
              id="icon"
              className="absolute top-3 left-0 flex items-center text-lg pl-3 pointer-events-none"
              aria-hidden="true"
            >
              <BsChatTextFill />
            </div>
            <textarea
              id="message"
              name="message"
              rows={6}
              cols={50}
              className="input_stylings"
              placeholder="Message"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
        </div>

        {success && (
          <div className="flex items-center gap-2 text-Green text-sm bg-Green/10 rounded-lg p-3 mb-4">
            <FiCheck /> Message sent successfully!
          </div>
        )}

        {error && (
          <div className="text-red-400 text-sm bg-red-400/10 rounded-lg p-3 mb-4">{error}</div>
        )}

        <div className="my-4">
          <button
            type="submit"
            disabled={loading}
            className="button flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <FiLoader className="animate-spin" />}
            {loading ? "Sending..." : "SEND MESSAGE"}
          </button>
        </div>
      </form>
    </div>
  );
}
