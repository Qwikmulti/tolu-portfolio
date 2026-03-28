"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Upload, Trash2, FileText, Loader2, Download, X } from "lucide-react";

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

      const res = await fetch("/api/admin/upload-guide", {
        method: "POST",
        body: formPayload,
      });

      if (!res.ok) throw new Error("Upload failed");
      await reloadGuides();
      setShowForm(false);
      setFormData({ title: "", description: "", file: null });
    } catch (err) {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal/30" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-cormorant text-3xl font-bold text-navy">Downloadable Guides</h1>
          <p className="text-charcoal/50 text-sm mt-1">{guides.length} guides</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Upload className="w-4 h-4" />
          Upload Guide
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-cormorant text-xl font-bold text-navy">Upload New Guide</h2>
            <button onClick={() => setShowForm(false)}>
              <X className="w-5 h-5 text-charcoal/30 hover:text-charcoal/60" />
            </button>
          </div>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Title</label>
              <input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy focus:outline-none focus:border-gold"
                placeholder="BA Starter Guide"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy focus:outline-none focus:border-gold resize-none"
                rows={2}
                placeholder="A brief description of what's inside..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">PDF File</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] ?? null })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-navy file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-gold/10 file:text-gold file:cursor-pointer"
                required
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Guide"}
            </button>
          </form>
        </div>
      )}

      {/* Guides list */}
      <div className="space-y-3">
        {guides.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-100 text-center">
            <FileText className="w-12 h-12 text-charcoal/10 mx-auto mb-3" />
            <p className="text-charcoal/40">No guides uploaded yet.</p>
          </div>
        ) : (
          guides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-electric" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-navy">{guide.title}</p>
                  <p className="text-xs text-charcoal/40">{guide.file_name} · {formatSize(guide.file_size)}</p>
                  {guide.description && (
                    <p className="text-xs text-charcoal/50 mt-1 truncate">{guide.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`/api/guide/${guide.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-navy hover:bg-navy/90 text-white text-xs rounded-lg transition-colors"
                >
                  <Download className="w-3 h-3" /> Download
                </a>
                <button
                  onClick={() => handleDelete(guide)}
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
