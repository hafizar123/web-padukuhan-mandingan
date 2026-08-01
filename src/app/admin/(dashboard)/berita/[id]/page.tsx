import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BeritaForm from "@/components/admin/BeritaForm";

export const metadata = { title: "Edit Berita - Admin" };
export const dynamic = "force-dynamic";

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const berita = await prisma.berita.findUnique({ where: { id } });
  if (!berita) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Berita</h1>
      <BeritaForm existing={berita} />
    </div>
  );
}
