"use client";

import { useState } from "react";
import { FiTrash2, FiMail, FiCheck, FiLoader } from "react-icons/fi";
import { markAsRead, deleteMessage } from "@/lib/actions/messages";

export default function MessagesClient({ messages }: { messages: any[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);

  async function handleMarkRead(id: string) {
    setMarkingId(id);
    await markAsRead(id);
    setMarkingId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    setDeletingId(id);
    await deleteMessage(id);
    setDeletingId(null);
  }

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="mb-6">
        <div>
          <h1 className="text-Snow text-xl sm:text-2xl font-bold">Messages</h1>
          <p className="text-LightGray text-sm mt-1">
            {messages.length} total · {unread} unread
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="card_stylings p-8 text-center text-LightGray">
            No messages yet. Share your portfolio and wait for people to reach out!
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`card_stylings p-5 ${!msg.is_read ? "border-l-4 border-l-Green" : ""}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-Snow font-semibold text-sm">{msg.sender_name}</span>
                  <span className="text-LightGray text-xs">{msg.sender_email}</span>
                  {!msg.is_read && (
                    <span className="bg-Green/10 text-Green text-[10px] px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <p className="text-SilverGray text-sm mt-2">{msg.message}</p>
                <p className="text-LightGray text-xs mt-3">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:ml-4">
                {!msg.is_read && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    disabled={markingId === msg.id}
                    className="text-Green hover:text-Green/80 p-1.5 disabled:opacity-50"
                    title="Mark as read"
                  >
                    {markingId === msg.id ? <FiLoader className="animate-spin" /> : <FiCheck />}
                  </button>
                )}
                <a
                  href={`mailto:${msg.sender_email}`}
                  className="text-SilverGray hover:text-Snow p-1.5"
                  title="Reply"
                >
                  <FiMail />
                </a>
                <button
                  onClick={() => handleDelete(msg.id)}
                  disabled={deletingId === msg.id}
                  className="text-red-400 hover:text-red-300 p-1.5 disabled:opacity-50"
                  title="Delete"
                >
                  {deletingId === msg.id ? <FiLoader className="animate-spin" /> : <FiTrash2 />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
