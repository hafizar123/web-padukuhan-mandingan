import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import KontakFormAdmin from "@/components/admin/KontakFormAdmin";

export default async function EditKontakPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const kontak = await prisma.kontak.findUnique({ where: { id } });
  if (!kontak) notFound();
  return <div><h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Kontak</h1><KontakFormAdmin existing={kontak} /></div>;
}
