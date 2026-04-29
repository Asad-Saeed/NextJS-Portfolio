"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { signUp } from "@/lib/actions/auth";
import { FaUserPlus } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(formRef.current!);
    const result = await signUp(formData);
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
              <FaUserPlus className="text-Green text-lg" />
            </div>
            <h1 className="text-Snow text-xl font-bold">Create Portfolio</h1>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="signup-name" className="text-LightGray text-xs mb-1 block">
                Full Name
              </label>
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-describedby="signup-name-help"
                className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                placeholder="John Doe"
              />
              <span id="signup-name-help" className="text-LightGray text-[10px] mt-1 block">
                Your portfolio URL will be: domain.com/john-doe
              </span>
            </div>
            <div>
              <label htmlFor="signup-email" className="text-LightGray text-xs mb-1 block">
                Email
              </label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="text-LightGray text-xs mb-1 block">
                Password
              </label>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                aria-describedby="signup-password-help"
                className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                placeholder="Min 6 characters"
              />
              <span id="signup-password-help" className="sr-only">
                Password must be at least 6 characters
              </span>
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
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-LightGray text-xs text-center mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-Green hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
