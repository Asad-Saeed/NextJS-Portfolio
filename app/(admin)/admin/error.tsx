"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="card_stylings p-8 text-center max-w-md w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-400/10 border border-red-400/20 mb-5">
          <FiAlertTriangle className="text-red-400 text-3xl" />
        </div>
        <h1 className="text-Snow text-xl font-bold mb-2">Admin Error</h1>
        <p className="text-LightGray text-sm mb-2">Something went wrong loading this admin page.</p>
        <p className="text-LightGray/70 text-xs mb-6">
          Check your Supabase connection, run any pending migrations, or try refreshing.
        </p>
        {error.message && (
          <div className="text-left text-[11px] font-mono text-red-400/80 bg-red-400/5 border border-red-400/10 rounded-lg p-3 mb-5 break-all max-h-32 overflow-auto">
            {error.message}
          </div>
        )}
        {error.digest && (
          <p className="text-LightGray/60 text-[10px] font-mono mb-5">Error ID: {error.digest}</p>
        )}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button onClick={() => reset()} className="button flex items-center gap-2">
            <FiRefreshCw /> Try Again
          </button>
          <Link
            href="/admin"
            className="px-5 py-2.5 text-sm text-LightGray border border-DarkGray/50 rounded-lg hover:text-Snow hover:border-LightGray transition-colors flex items-center gap-2"
          >
            <FiHome /> Admin Home
          </Link>
        </div>
      </div>
    </div>
  );
}
