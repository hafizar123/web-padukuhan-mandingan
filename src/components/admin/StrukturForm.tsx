"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Struktur { id: string; jabatan: string; nama: string; urutan: number; foto: string | null; }

export default function StrukturForm({ existing }: { existing: Struktur }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState(existing.nama);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/admin/struktur/${existing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jabatan: existing.jabatan, nama }),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Nama berhasil diperbarui!");
      router.push("/admin/struktur");
      router.refresh();
    } else {
      toast.error("Gagal menyimpan.");
    }
  };

  return (
    <Card className="max-w-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Jabatan - read only */}
          <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Jabatan</p>
            <p className="text-base font-semibold text-gray-800 mt-0.5">{existing.jabatan}</p>
          </div>

          {/* Nama - editable */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Nama</Label>
            <Input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama lengkap"
              className="h-11"
              required
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button type="submit" className="bg-green-700 hover:bg-green-800 h-11" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
              Simpan
            </Button>
            <Button type="button" variant="outline" className="h-11" onClick={() => router.back()}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
