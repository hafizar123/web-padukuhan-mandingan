import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AgendaForm from "@/components/admin/AgendaForm";

export const dynamic = "force-dynamic";

export default async function EditAgendaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agenda = await prisma.agenda.findUnique({ where: { id } });
  if (!agenda) notFound();
  return <div><h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Agenda</h1><AgendaForm existing={agenda} /></div>;
}
