"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import { uploadFile } from "@/lib/supabase";

interface Potensi {
  id: string;
  nama: string;
  kategori: string;
  lokasi: string | null;
  pimpinan: string | null;
  deskripsi: string;
  foto: string[];
  urutan: number;
}

const BUCKET = "potensi-foto";

export default function PotensiForm({ existing }: { existing?: Potensi }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    nama: existing?.nama ?? "",
    kategori: existing?.kategori ?? "pertanian",
    lokasi: existing?.lokasi ?? "",
    pimpinan: existing?.pimpinan ?? "",
    deskripsi: existing?.deskripsi ?? "",
  });

  // Array of uploaded URLs (already saved or just uploaded)
  const [fotoUrls, setFotoUrls] = useState<string[]>(existing?.foto ?? []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of files) {
      const path = `potensi-foto/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const url = await uploadFile(file, BUCKET, path);
      if (url) {
        newUrls.push(url);
      } else {
        toast.error(`Gagal upload: ${file.name}`);
      }
    }

    setFotoUrls((prev) => [...prev, ...newUrls]);
    setUploading(false);

    // Reset file input so the same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFoto = (index: number) => {
    setFotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = existing ? `/api/admin/potensi/${existing.id}` : "/api/admin/potensi";
    const res = await fetch(url, {
      method: existing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, foto: fotoUrls, urutan: 0 }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Potensi tersimpan!");
      router.push("/admin/potensi");
      router.refresh();
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.message ?? "Gagal menyimpan.");
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama */}
          <div className="space-y-1">
            <Label>Nama *</Label>
            <Input name="nama" value={form.nama} onChange={handleChange} required placeholder='cth: Kelompok Tani "Karya"' />
          </div>

          {/* Kategori */}
          <div className="space-y-1">
            <Label>Kategori *</Label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="pertanian">Pertanian</option>
              <option value="peternakan">Peternakan</option>
              <option value="kesenian">Kesenian</option>
              <option value="wisata">Wisata</option>
            </select>
          </div>

          {/* Lokasi */}
          <div className="space-y-1">
            <Label>Lokasi</Label>
            <Input name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="cth: RT 01 Dusun Wolosono, Padukuhan Mandingan" />
          </div>

          {/* Pimpinan */}
          <div className="space-y-1">
            <Label>Pimpinan / Ketua</Label>
            <Input name="pimpinan" value={form.pimpinan} onChange={handleChange} placeholder="cth: Bapak Mujiyono" />
          </div>

          {/* Deskripsi */}
          <div className="space-y-1">
            <Label>Deskripsi *</Label>
            <Textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              required
              rows={8}
              placeholder="Deskripsi lengkap tentang potensi ini..."
            />
          </div>

          {/* Foto */}
          <div className="space-y-2">
            <Label>Foto</Label>

            {/* Existing / uploaded foto preview */}
            {fotoUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-2">
                {fotoUrls.map((url, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`foto-${i + 1}`} className="w-full h-28 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveFoto(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Hapus foto"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? (
                  <><Loader2 size={14} className="animate-spin" /> Mengupload...</>
                ) : (
                  <><Upload size={14} /> Pilih Foto</>
                )}
              </button>
              <p className="text-xs text-gray-400 mt-1">Bisa pilih beberapa foto sekaligus. Format: JPG, PNG, WebP.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={loading || uploading}>
              {loading ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
              {existing ? "Update" : "Simpan"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
