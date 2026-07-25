"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Phone, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Dukuh {
  id: string;
  nama: string;
  jabatan: string;
  noHp: string | null;
  email: string | null;
}

export default function EditKontakDukuhForm({ dukuh }: { dukuh: Dukuh | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: dukuh?.nama ?? "",
    noHp: dukuh?.noHp ?? "",
    email: dukuh?.email ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = dukuh
      ? `/api/admin/kontak/${dukuh.id}`
      : "/api/admin/kontak";

    const res = await fetch(url, {
      method: dukuh ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: form.nama,
        jabatan: "Dukuh Mandingan",
        rt: null,
        noHp: form.noHp || null,
        email: form.email || null,
        urutan: 2,
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Kontak berhasil diperbarui!");
      router.refresh();
    } else {
      toast.error("Gagal menyimpan.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nama */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Nama Dukuh</Label>
        <div className="relative">
          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            placeholder="Nama lengkap dukuh"
            className="pl-9 h-11"
            required
          />
        </div>
      </div>

      {/* No HP */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">No. HP / WhatsApp</Label>
        <div className="relative">
          <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={form.noHp}
            onChange={(e) => setForm({ ...form, noHp: e.target.value })}
            placeholder="cth: 0812xxxx"
            className="pl-9 h-11"
            type="tel"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Email <span className="text-gray-400 font-normal">(opsional)</span></Label>
        <div className="relative">
          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="email@example.com"
            className="pl-9 h-11"
            type="email"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-green-700 hover:bg-green-800 font-semibold rounded-xl"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin mr-2" size={15} /> : null}
        Simpan Perubahan
      </Button>
    </form>
  );
}
