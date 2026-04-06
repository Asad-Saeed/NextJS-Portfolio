"use client";

import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiLoader } from "react-icons/fi";
import ImageUpload from "@/components/admin/ImageUpload";

interface Column {
  key: string;
  label: string;
  render?: (
    value: string | number | boolean | null | undefined,
    row: Record<string, unknown>
  ) => React.ReactNode;
}

interface Field {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "image";
  placeholder?: string;
  bucket?: string;
}

interface CrudPageProps<T extends { id: string }> {
  title: string;
  data: T[];
  columns: Column[];
  fields: Field[];
  onCreate: (data: Record<string, unknown>) => Promise<unknown>;
  onUpdate: (id: string, data: Record<string, unknown>) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
}

export default function CrudPage<T extends { id: string }>({
  title,
  data,
  columns,
  fields,
  onCreate,
  onUpdate,
  onDelete,
}: CrudPageProps<T>) {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function openCreate() {
    setEditItem(null);
    setFormData({});
    setShowModal(true);
    setError(null);
  }

  function openEdit(item: T) {
    setEditItem(item);
    const initial: Record<string, unknown> = {};
    const row = item as unknown as Record<string, unknown>;
    fields.forEach((f) => (initial[f.key] = row[f.key] ?? ""));
    setFormData(initial);
    setShowModal(true);
    setError(null);
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    const result = editItem ? await onUpdate(editItem.id, formData) : await onCreate(formData);
    setLoading(false);
    if ((result as { error?: string })?.error) {
      setError((result as { error: string }).error);
    } else {
      setShowModal(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-Snow text-xl sm:text-2xl font-bold">{title}</h1>
          <p className="text-LightGray text-sm mt-1">{data.length} items</p>
        </div>
        <button
          onClick={openCreate}
          className="button flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <FiPlus /> Add New
        </button>
      </div>

      {/* Table */}
      <div className="card_stylings overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-LightGray uppercase bg-DarkGray/30">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t border-DarkGray/20 hover:bg-EveningBlack/50">
                  {columns.map((col) => {
                    const row = item as unknown as Record<string, unknown>;
                    const val = row[col.key];
                    return (
                      <td key={col.key} className="px-4 py-3 text-SilverGray">
                        {col.render
                          ? col.render(val as string | number | boolean | null | undefined, row)
                          : String(val ?? "")}
                      </td>
                    );
                  })}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="text-Green hover:text-Green/80 p-1"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="text-red-400 hover:text-red-300 p-1 disabled:opacity-50"
                      >
                        {deletingId === item.id ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <FiTrash2 />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-LightGray">
                    No items yet. Click &quot;Add New&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-Black/80 backdrop-blur-sm">
          <div className="card_stylings w-full max-w-lg mx-2 sm:mx-4 p-4 sm:p-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-LightGray hover:text-Snow"
            >
              <FiX className="text-lg" />
            </button>
            <h2 className="text-Snow text-lg font-bold mb-4">
              {editItem ? "Edit" : "Add"} {title.replace(/s$/, "")}
            </h2>

            <div className="flex flex-col gap-4">
              {fields.map((field) => (
                <div key={field.key}>
                  {field.type === "image" ? (
                    <ImageUpload
                      label={field.label}
                      value={String(formData[field.key] || "")}
                      onChange={(url) => setFormData((prev) => ({ ...prev, [field.key]: url }))}
                      bucket={field.bucket || "profile"}
                    />
                  ) : field.type === "textarea" ? (
                    <>
                      <label className="text-LightGray text-xs mb-1 block">{field.label}</label>
                      <textarea
                        value={String(formData[field.key] || "")}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                        }
                        rows={4}
                        className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                        placeholder={field.placeholder}
                      />
                    </>
                  ) : (
                    <>
                      <label className="text-LightGray text-xs mb-1 block">{field.label}</label>
                      <input
                        type={field.type || "text"}
                        value={String(formData[field.key] || "")}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.key]:
                              field.type === "number" ? Number(e.target.value) : e.target.value,
                          }))
                        }
                        className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                        placeholder={field.placeholder}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="text-red-400 text-xs bg-red-400/10 rounded-lg p-3 mt-4">{error}</div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 text-sm text-LightGray border border-DarkGray/50 rounded-lg hover:bg-EveningBlack"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="button flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <FiLoader className="animate-spin" />}
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
