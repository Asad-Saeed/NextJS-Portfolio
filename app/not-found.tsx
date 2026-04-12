import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-Green mb-4">404</div>
        <h1 className="text-Snow text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-LightGray text-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="button">
            Go Home
          </Link>
          <Link
            href="/auth/login"
            className="px-5 py-2.5 text-sm text-LightGray border border-DarkGray/50 rounded-lg hover:text-Snow hover:border-LightGray transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
