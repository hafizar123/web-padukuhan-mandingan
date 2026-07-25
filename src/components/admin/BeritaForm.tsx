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

interface Berita {
  id: string;
  judul: string;
  konten: string;
  thumbnail: string | null;
  published: boolean;
}

export default function BeritaForm({ existing }: { existing?: Berita }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    judul: existing?.judul ?? "",
    konten: existing?.konten ?? "",
    thumbnail: existing?.thumbnail ?? "",
    published: existing?.published ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = existing ? `/api/admin/berita/${existing.id}` : "/api/admin/berita";
    const method = existing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    if (res.ok) {
      toast.success(existing ? "Berita diperbarui!" : "Berita berhasil ditambahkan!");
      router.push("/admin/berita");
      router.refresh();
    } else {
      toast.error("Gagal menyimpan berita.");
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label>Judul Berita *</Label>
            <Input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} placeholder="Judul berita..." required />
          </div>
          <div className="space-y-1">
            <Label>Isi Berita *</Label>
            <Textarea rows={8} value={form.konten} onChange={(e) => setForm({ ...form, konten: e.target.value })} placeholder="Isi berita..." required />
          </div>
          <div className="space-y-1">
            <Label>URL Thumbnail (opsional)</Label>
            <Input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="https://..." />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-green-700" />
            <Label htmlFor="published">Publikasikan langsung</Label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
              {existing ? "Update" : "Simpan"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
