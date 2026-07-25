"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Kontak { id: string; nama: string; jabatan: string; rt: number | null; noHp: string | null; email: string | null; }

export default function KontakFormAdmin({ existing }: { existing?: Kontak }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: existing?.nama ?? "",
    jabatan: existing?.jabatan ?? "",
    rt: existing?.rt?.toString() ?? "none",
    noHp: existing?.noHp ?? "",
    email: existing?.email ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = existing ? `/api/admin/kontak/${existing.id}` : "/api/admin/kontak";
    const res = await fetch(url, {
      method: existing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, rt: form.rt === "none" ? null : parseInt(form.rt) }),
    });
    setLoading(false);
    if (res.ok) { toast.success("Kontak tersimpan!"); router.push("/admin/kontak"); router.refresh(); }
    else toast.error("Gagal menyimpan.");
  };

  return (
    <Card className="max-w-lg"><CardContent className="pt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1"><Label>Nama *</Label><Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required /></div>
        <div className="space-y-1"><Label>Jabatan *</Label><Input value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} required /></div>
        <div className="space-y-1">
          <Label>RT (kosongkan jika perangkat desa)</Label>
          <Select value={form.rt} onValueChange={(v) => setForm({ ...form, rt: v ?? "none" })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Perangkat Desa</SelectItem>
              <SelectItem value="1">RT 1</SelectItem>
              <SelectItem value="2">RT 2</SelectItem>
              <SelectItem value="3">RT 3</SelectItem>
              <SelectItem value="4">RT 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1"><Label>No. HP</Label><Input value={form.noHp} onChange={(e) => setForm({ ...form, noHp: e.target.value })} placeholder="08..." /></div>
        <div className="space-y-1"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={loading}>{loading ? <Loader2 className="animate-spin mr-2" size={14} /> : null}{existing ? "Update" : "Simpan"}</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
        </div>
      </form>
    </CardContent></Card>
  );
}
