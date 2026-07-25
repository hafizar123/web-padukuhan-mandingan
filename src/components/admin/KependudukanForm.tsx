"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DataKependudukan {
  id: string;
  rt: number;
  jumlahKK: number;
  jumlahPenduduk: number;
  lakiLaki: number;
  perempuan: number;
}

export default function KependudukanForm({
  rt,
  existing,
}: {
  rt: number;
  existing: DataKependudukan | null;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    jumlahKK: existing?.jumlahKK ?? 0,
    jumlahPenduduk: existing?.jumlahPenduduk ?? 0,
    lakiLaki: existing?.lakiLaki ?? 0,
    perempuan: existing?.perempuan ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/kependudukan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rt, ...form }),
    });

    setLoading(false);
    if (res.ok) {
      toast.success(`Data RT ${rt} berhasil disimpan!`);
    } else {
      toast.error("Gagal menyimpan data.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {[
        { key: "jumlahKK", label: "Jumlah KK" },
        { key: "jumlahPenduduk", label: "Jumlah Penduduk" },
        { key: "lakiLaki", label: "Laki-laki" },
        { key: "perempuan", label: "Perempuan" },
      ].map(({ key, label }) => (
        <div key={key} className="space-y-1">
          <Label>{label}</Label>
          <Input
            type="number"
            min={0}
            value={form[key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [key]: parseInt(e.target.value) || 0 })}
          />
        </div>
      ))}
      <Button type="submit" size="sm" className="bg-green-700 hover:bg-green-800 w-full" disabled={loading}>
        {loading ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
        {existing ? "Update" : "Simpan"}
      </Button>
    </form>
  );
}
