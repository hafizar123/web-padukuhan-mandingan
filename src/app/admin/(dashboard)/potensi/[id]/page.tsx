import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PotensiForm from "@/components/admin/PotensiForm";

export const metadata = { title: "Edit Potensi - Admin Padukuhan Mandingan" };
export const dynamic = "force-dynamic";

export default async function EditPotensiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const potensi = await prisma.potensi.findUnique({ where: { id } });
  if (!potensi) notFound();

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Potensi</h1>
      <PotensiForm existing={potensi} />
    </div>
  );
}
