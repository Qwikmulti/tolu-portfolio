"use client";

import { useState, useEffect, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Upload, Trash2, FileText, Loader2, Download, X, FileUp } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { motion, AnimatePresence } from "framer-motion";

interface Guide {
  id: string;
  title: string;
  description: string | null;
  file_name: string;
  file_size: number | null;
  is_active: boolean;
  storage_path: string;
  created_at: string;
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", file: null as File | null });
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await supabase
        .from("guides")
        .select("*")
        .order("created_at", { ascending: false });
      if (mounted) {
        setGuides(data ?? []);
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [supabase]);

  async function reloadGuides() {
    const { data } = await supabase.from("guides").select("*").order("created_at", { ascending: false });
    setGuides(data ?? []);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.file || !formData.title) return;
    setUploading(true);
    try {
      const formPayload = new FormData();
      formPayload.append("file", formData.file);
      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      const res = await fetch("/api/admin/upload-guide", { method: "POST", body: formPayload });
      if (!res.ok) throw new Error("Upload failed");
      await reloadGuides();
      setShowForm(false);
      setFormData({ title: "", description: "", file: null });
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(guide: Guide) {
    if (!confirm(`Delete "${guide.title}"? This cannot be undone.`)) return;
    await fetch("/api/admin/delete-guide", {
      method: "POST",
      body: JSON.stringify({ id: guide.id, storagePath: guide.storage_path }),
    });
    await reloadGuides();
  }

  function formatSize(bytes: number | null) {
    if (!bytes) return "—";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setFormData((p) => ({ ...p, file }));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-stone-300" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Downloadable Guides"
        subtitle={`${guides.length} resource${guides.length !== 1 ? "s" : ""} available`}
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Upload className="w-4 h-4" />
            Upload Guide
          </button>
        }
      />

      {/* Upload form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-navy">Upload New Guide</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleUpload} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Title</label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
                    placeholder="The BA Starter Guide"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all resize-none"
                    rows={2}
                    placeholder="What will readers learn from this guide?"
                  />
                </div>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragActive
                      ? "border-amber-400 bg-amber-50"
                      : formData.file
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-stone-200 hover:border-amber-300 hover:bg-stone-50"
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] ?? null })}
                    className="hidden"
                  />
                  {formData.file ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileUp className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-600">{formData.file.name}</span>
                      <span className="text-xs text-emerald-500">({formatSize(formData.file.size)})</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
                        <FileUp className="w-5 h-5 text-stone-400" />
                      </div>
                      <p className="text-sm font-medium text-stone-500">Drop your PDF here or <span className="text-amber-500 underline">browse</span></p>
                      <p className="text-xs text-stone-400 mt-1">PDF files only, up to 50MB</p>
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={uploading || !formData.file}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Uploading..." : "Upload Guide"}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guides list */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        <AnimatePresence>
          {guides.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-16 border border-stone-100 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-stone-300" />
              </div>
              <p className="text-stone-400 font-medium">No guides uploaded yet.</p>
              <p className="text-stone-300 text-sm mt-1">Upload your first resource to get started.</p>
            </motion.div>
          ) : (
            guides.map((guide) => (
              <motion.div
                key={guide.id}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="bg-white rounded-2xl p-5 border border-stone-100 hover:shadow-md hover:-translate-y-px transition-all duration-200 group flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-navy">{guide.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-stone-400">{guide.file_name}</span>
                      <span className="text-stone-200">·</span>
                      <span className="text-xs text-stone-400">{formatSize(guide.file_size)}</span>
                      <span className="text-stone-200">·</span>
                      <span className="text-xs text-stone-400">
                        {new Date(guide.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    {guide.description && (
                      <p className="text-xs text-stone-400 mt-1 truncate">{guide.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`/api/guide/${guide.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-navy hover:bg-navy/90 text-white text-xs font-medium rounded-xl transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                  <button
                    onClick={() => handleDelete(guide)}
                    className="p-1.5 text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
