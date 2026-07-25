"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Agenda { id: string; judul: string; deskripsi: string | null; tanggal: Date; lokasi: string | null; }

export default function AgendaForm({ existing }: { existing?: Agenda }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    judul: existing?.judul ?? "",
    deskripsi: existing?.deskripsi ?? "",
    tanggal: existing?.tanggal ? new Date(existing.tanggal).toISOString().slice(0, 16) : "",
    lokasi: existing?.lokasi ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = existing ? `/api/admin/agenda/${existing.id}` : "/api/admin/agenda";
    const res = await fetch(url, { method: existing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) {
      toast.success("Agenda tersimpan!");
      router.push("/admin/agenda");
      router.refresh();
    } else {
      const err = await res.json().catch(() => ({}));
      toast.error(err.message ?? "Gagal menyimpan.");
    }
  };

  return (
    <Card className="max-w-2xl"><CardContent className="pt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1"><Label>Judul Agenda *</Label><Input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} required /></div>
        <div className="space-y-1"><Label>Tanggal & Waktu *</Label><Input type="datetime-local" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} required /></div>
        <div className="space-y-1"><Label>Lokasi</Label><Input value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} placeholder="cth: Balai Desa" /></div>
        <div className="space-y-1"><Label>Deskripsi</Label><Textarea rows={4} value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} /></div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={loading}>{loading ? <Loader2 className="animate-spin mr-2" size={14} /> : null}{existing ? "Update" : "Simpan"}</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
        </div>
      </form>
    </CardContent></Card>
  );
}
