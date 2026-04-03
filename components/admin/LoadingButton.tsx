"use client";

import { FiLoader } from "react-icons/fi";

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  variant?: "primary" | "danger" | "ghost";
  disabled?: boolean;
}

export default function LoadingButton({
  loading,
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  disabled = false,
}: LoadingButtonProps) {
  const base =
    "flex items-center justify-center gap-2 text-sm font-medium rounded-lg px-4 py-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "button",
    danger: "bg-transparent border border-red-400/50 text-red-400 hover:bg-red-400/10",
    ghost: "text-LightGray border border-DarkGray/50 hover:bg-EveningBlack",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading && <FiLoader className="animate-spin text-sm" />}
      {children}
    </button>
  );
}
