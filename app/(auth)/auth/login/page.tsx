"use client";

import { useState, useRef } from "react";
import { signIn } from "@/lib/actions/auth";
import { FaLock } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(formRef.current!);
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-Black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="card_stylings p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-Green/10 flex items-center justify-center mb-4">
              <FaLock className="text-Green text-lg" />
            </div>
            <h1 className="text-Snow text-xl font-bold">Admin Access</h1>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-LightGray text-xs mb-1 block">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                placeholder="admin@email.com"
              />
            </div>
            <div>
              <label className="text-LightGray text-xs mb-1 block">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs bg-red-400/10 rounded-lg p-3">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="button w-full text-center mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <FiLoader className="animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
