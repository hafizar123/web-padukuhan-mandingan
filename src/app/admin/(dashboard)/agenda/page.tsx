import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = { title: "Agenda - Admin Padukuhan Mandingan" };

export default async function AdminAgendaPage() {
  let agenda: Awaited<ReturnType<typeof prisma.agenda.findMany>> = [];
  try {
    agenda = await prisma.agenda.findMany({ orderBy: { tanggal: "desc" } });
  } catch { /* DB tidak tersedia */ }
  const now = new Date();

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agenda Kegiatan</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola agenda dan kegiatan padukuhan</p>
        </div>
        <Link href="/admin/agenda/tambah">
          <Button size="sm" className="bg-green-700 hover:bg-green-800 rounded-xl">
            <Plus size={14} className="mr-1" /> Tambah Agenda
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Judul</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Lokasi</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {agenda.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-400 italic">Belum ada agenda.</td></tr>
            ) : agenda.map((a) => {
              const mendatang = new Date(a.tanggal) >= now;
              return (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{a.judul}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    {new Date(a.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{a.lokasi ?? "-"}</td>
                  <td className="px-5 py-3.5">
                    {mendatang
                      ? <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium">Mendatang</span>
                      : <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-medium">Selesai</span>
                    }
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      <Link href={`/admin/agenda/${a.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gray-100"><Pencil size={14} /></Button>
                      </Link>
                      <DeleteButton id={a.id} type="agenda" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
