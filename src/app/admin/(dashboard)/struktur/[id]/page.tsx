import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import StrukturForm from "@/components/admin/StrukturForm";

export const dynamic = "force-dynamic";

export default async function EditStrukturPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await prisma.strukturOrganisasi.findUnique({ where: { id } });
  if (!data) notFound();
  return <div><h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Struktur Organisasi</h1><StrukturForm existing={data} /></div>;
}
