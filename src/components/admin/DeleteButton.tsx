"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, type }: { id: string; type: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    setLoading(true);

    const res = await fetch(`/api/admin/${type}/${id}`, { method: "DELETE" });

    setLoading(false);
    if (res.ok) {
      toast.success("Data berhasil dihapus.");
      router.refresh();
    } else {
      toast.error("Gagal menghapus data.");
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
    </Button>
  );
}
