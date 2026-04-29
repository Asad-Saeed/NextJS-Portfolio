"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiAlertTriangle, FiRefreshCw, FiArrowLeft } from "react-icons/fi";

export default function PortfolioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  useEffect(() => {
    console.error("Portfolio error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card_stylings p-8 sm:p-10 text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-Green/10 border border-Green/20 mb-5">
          <FiAlertTriangle className="text-Green text-3xl" />
        </div>
        <h1 className="text-Snow text-xl sm:text-2xl font-bold mb-2">
          Couldn&apos;t load this section
        </h1>
        <p className="text-LightGray text-sm mb-6">
          We had trouble loading some of this portfolio&apos;s data. This is usually a temporary
          issue — try refreshing or come back in a moment.
        </p>
        {error.digest && (
          <p className="text-LightGray/60 text-[10px] font-mono mb-5">Error ID: {error.digest}</p>
        )}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button onClick={() => reset()} className="button flex items-center gap-2">
            <FiRefreshCw /> Try Again
          </button>
          {slug && (
            <Link
              href={`/${slug}`}
              className="px-5 py-2.5 text-sm text-LightGray border border-DarkGray/50 rounded-lg hover:text-Snow hover:border-LightGray transition-colors flex items-center gap-2"
            >
              <FiArrowLeft /> Back to Portfolio
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
