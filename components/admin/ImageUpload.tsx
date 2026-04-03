"use client";

import { useState, useRef } from "react";
import { FiUpload, FiX, FiLink, FiImage } from "react-icons/fi";
import { uploadFile } from "@/lib/actions/upload";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket: string;
  label: string;
  accept?: string;
}

export default function ImageUpload({
  value,
  onChange,
  bucket,
  label,
  accept = "image/*",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "url">(value ? "url" : "upload");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("bucket", bucket);

    const result = await uploadFile(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      onChange(result.url);
    }

    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  const isImage = accept.startsWith("image");
  const hasValue = value && value.length > 0;

  return (
    <div>
      <label className="text-LightGray text-xs mb-2 block">{label}</label>

      {/* Preview */}
      {hasValue && (
        <div className="mb-3 relative inline-block">
          {isImage ? (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-DarkGray/50">
              <Image src={value} alt={label} fill className="object-cover" unoptimized />
            </div>
          ) : (
            <a
              href={value}
              target="_blank"
              className="text-Green text-xs underline flex items-center gap-1"
            >
              <FiLink /> View file
            </a>
          )}
          <button
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 text-xs"
            type="button"
          >
            <FiX />
          </button>
        </div>
      )}

      {/* Mode toggle */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
            mode === "upload"
              ? "bg-Green/10 text-Green border border-Green/30"
              : "text-LightGray border border-DarkGray/50 hover:bg-EveningBlack"
          }`}
        >
          <FiUpload /> Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
            mode === "url"
              ? "bg-Green/10 text-Green border border-Green/30"
              : "text-LightGray border border-DarkGray/50 hover:bg-EveningBlack"
          }`}
        >
          <FiLink /> Paste URL
        </button>
      </div>

      {/* Upload mode */}
      {mode === "upload" && (
        <div className="relative">
          <label
            className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              uploading
                ? "border-Green/50 bg-Green/5"
                : "border-DarkGray/50 hover:border-Green/30 hover:bg-EveningBlack/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              {uploading ? (
                <span className="text-Green text-xs">Uploading...</span>
              ) : (
                <>
                  <FiImage className="text-LightGray text-lg mb-1" />
                  <span className="text-LightGray text-xs">Click to upload or drag & drop</span>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept={accept}
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* URL mode */}
      {mode === "url" && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
        />
      )}

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
