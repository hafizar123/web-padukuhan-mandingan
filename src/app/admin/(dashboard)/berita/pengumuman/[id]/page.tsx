import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PengumumanForm from "@/components/admin/PengumumanForm";

export default async function EditPengumumanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pengumuman = await prisma.pengumuman.findUnique({ where: { id } });
  if (!pengumuman) notFound();
  return <div><h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Pengumuman</h1><PengumumanForm existing={pengumuman} /></div>;
}
