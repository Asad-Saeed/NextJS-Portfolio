"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-Green/10 border border-Green/20 mb-6">
          <FiAlertTriangle className="text-Green text-4xl" />
        </div>
        <h1 className="text-Snow text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-LightGray text-sm mb-8">
          We hit an unexpected error while loading this page. You can try again or head back home.
        </p>
        {error.digest && (
          <p className="text-LightGray/60 text-[10px] font-mono mb-6">Error ID: {error.digest}</p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => reset()} className="button flex items-center gap-2">
            <FiRefreshCw /> Try Again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 text-sm text-LightGray border border-DarkGray/50 rounded-lg hover:text-Snow hover:border-LightGray transition-colors flex items-center gap-2"
          >
            <FiHome /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
