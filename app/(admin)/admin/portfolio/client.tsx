"use client";

import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiLoader } from "react-icons/fi";
import { createProject, updateProject, deleteProject } from "@/lib/actions/portfolio";
import ImageUpload from "@/components/admin/ImageUpload";
import { PortfolioProject, ProjectTechnology } from "@/types";

export default function PortfolioClient({ data }: { data: PortfolioProject[] }) {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioProject | null>(null);
  const [form, setForm] = useState({
    project_name: "",
    url: "",
    image_url: "",
    project_detail: "",
    sort_order: 0,
  });
  const [techs, setTechs] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function openCreate() {
    setEditItem(null);
    setForm({ project_name: "", url: "", image_url: "", project_detail: "", sort_order: 0 });
    setTechs([]);
    setShowModal(true);
    setError(null);
  }

  function openEdit(item: PortfolioProject) {
    setEditItem(item);
    setForm({
      project_name: item.project_name,
      url: item.url,
      image_url: item.image_url,
      project_detail: item.project_detail,
      sort_order: item.sort_order,
    });
    setTechs((item.project_technologies || []).map((t: ProjectTechnology) => t.tech_name));
    setShowModal(true);
    setError(null);
  }

  function addTech() {
    if (techInput.trim() && !techs.includes(techInput.trim())) {
      setTechs([...techs, techInput.trim()]);
      setTechInput("");
    }
  }

  async function handleSubmit() {
    setLoading(true);
    const result = editItem
      ? await updateProject(editItem.id, form, techs)
      : await createProject(form, techs);
    setLoading(false);
    if (result?.error) setError(result.error);
    else setShowModal(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    setDeletingId(id);
    await deleteProject(id);
    setDeletingId(null);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-Snow text-2xl font-bold">Portfolio Projects</h1>
          <p className="text-LightGray text-sm mt-1">{data.length} projects</p>
        </div>
        <button onClick={openCreate} className="button flex items-center gap-2">
          <FiPlus /> Add Project
        </button>
      </div>

      <div className="card_stylings overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-LightGray uppercase bg-DarkGray/30">
              <tr>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Technologies</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t border-DarkGray/20 hover:bg-EveningBlack/50">
                  <td className="px-4 py-3 text-Snow font-medium">{item.project_name}</td>
                  <td className="px-4 py-3 text-SilverGray text-xs">
                    {(item.project_technologies || [])
                      .map((t: ProjectTechnology) => t.tech_name)
                      .join(", ")}
                  </td>
                  <td className="px-4 py-3 text-SilverGray">{item.sort_order}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(item)} className="text-Green p-1">
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="text-red-400 p-1 disabled:opacity-50"
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
            </tbody>
          </table>
        </div>
      </div>

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
              {editItem ? "Edit" : "Add"} Project
            </h2>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-LightGray text-xs mb-1 block">Project Name</label>
                <input
                  value={form.project_name}
                  onChange={(e) => setForm({ ...form, project_name: e.target.value })}
                  className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                />
              </div>
              <div>
                <label className="text-LightGray text-xs mb-1 block">URL</label>
                <input
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                />
              </div>
              <ImageUpload
                label="Project Screenshot"
                value={form.image_url}
                onChange={(url) => setForm({ ...form, image_url: url })}
                bucket="projects"
              />
              <div>
                <label className="text-LightGray text-xs mb-1 block">Description</label>
                <textarea
                  value={form.project_detail}
                  onChange={(e) => setForm({ ...form, project_detail: e.target.value })}
                  rows={3}
                  className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                />
              </div>
              <div>
                <label className="text-LightGray text-xs mb-1 block">Sort Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                />
              </div>
              <div>
                <label className="text-LightGray text-xs mb-1 block">Technologies</label>
                <div className="flex gap-2">
                  <input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                    className="flex-1 bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                    placeholder="Type and press Enter"
                  />
                  <button onClick={addTech} className="button px-4">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {techs.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-Green/10 text-Green text-xs rounded-full flex items-center gap-1"
                    >
                      {t}{" "}
                      <FiX
                        className="cursor-pointer"
                        onClick={() => setTechs(techs.filter((_, j) => j !== i))}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {error && (
              <div className="text-red-400 text-xs bg-red-400/10 rounded-lg p-3 mt-3">{error}</div>
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
