"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";

export default function GantiPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({ lama: false, baru: false, konfirmasi: false });
  const [form, setForm] = useState({
    passwordLama: "",
    passwordBaru: "",
    konfirmasi: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.passwordBaru.length < 6) {
      toast.error("Password baru minimal 6 karakter.");
      return;
    }

    if (form.passwordBaru !== form.konfirmasi) {
      toast.error("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/admin/akun/ganti-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passwordLama: form.passwordLama,
        passwordBaru: form.passwordBaru,
      }),
    });

    setLoading(false);
    const data = await res.json();

    if (res.ok) {
      toast.success("Password berhasil diubah!");
      setForm({ passwordLama: "", passwordBaru: "", konfirmasi: "" });
    } else {
      toast.error(data.message ?? "Gagal mengubah password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Password Lama */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Password Lama</Label>
        <div className="relative">
          <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type={show.lama ? "text" : "password"}
            value={form.passwordLama}
            onChange={(e) => setForm({ ...form, passwordLama: e.target.value })}
            className="pl-9 pr-10 h-11"
            placeholder="Masukkan password lama"
            required
          />
          <button
            type="button"
            onClick={() => setShow({ ...show, lama: !show.lama })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show.lama ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Password Baru */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Password Baru</Label>
        <div className="relative">
          <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type={show.baru ? "text" : "password"}
            value={form.passwordBaru}
            onChange={(e) => setForm({ ...form, passwordBaru: e.target.value })}
            className="pl-9 pr-10 h-11"
            placeholder="Minimal 6 karakter"
            required
          />
          <button
            type="button"
            onClick={() => setShow({ ...show, baru: !show.baru })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show.baru ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Konfirmasi Password */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700">Konfirmasi Password Baru</Label>
        <div className="relative">
          <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type={show.konfirmasi ? "text" : "password"}
            value={form.konfirmasi}
            onChange={(e) => setForm({ ...form, konfirmasi: e.target.value })}
            className="pl-9 pr-10 h-11"
            placeholder="Ulangi password baru"
            required
          />
          <button
            type="button"
            onClick={() => setShow({ ...show, konfirmasi: !show.konfirmasi })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show.konfirmasi ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-green-700 hover:bg-green-800 h-11 font-semibold"
        disabled={loading}
      >
        {loading ? <><Loader2 className="animate-spin mr-2" size={15} />Menyimpan...</> : "Simpan Password Baru"}
      </Button>
    </form>
  );
}
