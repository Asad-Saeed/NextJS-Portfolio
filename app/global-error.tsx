"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          background: "linear-gradient(160deg, #0e1a2e 0%, #080f1a 40%, #050a12 100%)",
          fontFamily: "Inter, -apple-system, system-ui, 'San Francisco', 'SF Pro Text', sans-serif",
          color: "#e8ecf1",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <div
            style={{
              fontSize: "5rem",
              fontWeight: 800,
              color: "#00e5ff",
              lineHeight: 1,
              marginBottom: "1rem",
            }}
          >
            ⚠
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#9aacbe",
              marginBottom: "2rem",
            }}
          >
            A critical error occurred while loading the page. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "rgba(0, 229, 255, 0.06)",
              border: "1px solid #00e5ff",
              color: "#00e5ff",
              padding: "0.625rem 1.75rem",
              borderRadius: "12px",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
