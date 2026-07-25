"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Barrier {
  id: string;
  nama: string;
  rt: number;
}

export default function InputLaporanForm({ barriers }: { barriers: Barrier[] }) {
  const [loading, setLoading] = useState(false);
  const [barrierId, setBarrierId] = useState("");
  const [volume, setVolume] = useState("");
  const [catatan, setCatatan] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barrierId || !volume) {
      toast.error("Pilih barrier dan volume sampah terlebih dahulu.");
      return;
    }

    setLoading(true);

    let fotoUrl: string | null = null;

    // Upload foto ke Supabase Storage jika ada
    if (foto) {
      const ext = foto.name.split(".").pop();
      const path = `trash-reports/${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("trash-reports")
        .upload(path, foto, { upsert: true });

      if (error) {
        toast.error("Gagal upload foto.");
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("trash-reports")
        .getPublicUrl(data.path);
      fotoUrl = urlData.publicUrl;
    }

    // Kirim ke API
    const res = await fetch("/api/admin/laporan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barrierId, volume, catatan, foto: fotoUrl }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Laporan berhasil disimpan!");
      setBarrierId("");
      setVolume("");
      setCatatan("");
      setFoto(null);
      setPreview(null);
    } else {
      const data = await res.json();
      toast.error(data.message ?? "Gagal menyimpan laporan.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      {/* Pilih Barrier */}
      <div className="space-y-1">
        <Label>Titik Trash Barrier</Label>
        <Select value={barrierId} onValueChange={(v) => setBarrierId(v ?? "")}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih barrier..." />
          </SelectTrigger>
          <SelectContent>
            {barriers.map((b) => (
              <SelectItem key={b.id} value={b.id}>{b.nama} (RT {b.rt})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Volume */}
      <div className="space-y-1">
        <Label>Volume Sampah</Label>
        <Select value={volume} onValueChange={(v) => setVolume(v ?? "")}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih volume..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RENDAH">🟢 Rendah</SelectItem>
            <SelectItem value="SEDANG">🟡 Sedang</SelectItem>
            <SelectItem value="TINGGI">🟠 Tinggi</SelectItem>
            <SelectItem value="PENUH">🔴 Penuh</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Foto */}
      <div className="space-y-1">
        <Label>Foto Kondisi (opsional)</Label>
        <label className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-green-400 transition-colors">
          <Upload size={18} className="text-gray-400" />
          <span className="text-sm text-gray-500">
            {foto ? foto.name : "Klik untuk upload foto"}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
        </label>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview" className="mt-2 h-40 w-full object-cover rounded-lg" />
        )}
      </div>

      {/* Catatan */}
      <div className="space-y-1">
        <Label>Catatan (opsional)</Label>
        <Textarea
          placeholder="Tambahkan catatan kondisi barrier..."
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={loading}>
        {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
        {loading ? "Menyimpan..." : "Simpan Laporan"}
      </Button>
    </form>
  );
}
