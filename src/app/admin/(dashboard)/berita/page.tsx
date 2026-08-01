import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = { title: "Berita & Pengumuman - Admin Padukuhan Mandingan" };
export const dynamic = "force-dynamic";

export default async function AdminBeritaPage() {
  let berita: Awaited<ReturnType<typeof prisma.berita.findMany>> = [];
  let pengumuman: Awaited<ReturnType<typeof prisma.pengumuman.findMany>> = [];
  try {
    [berita, pengumuman] = await Promise.all([
      prisma.berita.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.pengumuman.findMany({ orderBy: { createdAt: "desc" } }),
    ]);
  } catch { /* DB tidak tersedia */ }

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Berita &amp; Pengumuman</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola konten berita dan pengumuman padukuhan</p>
      </div>

      {/* Berita */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Berita</h2>
            <p className="text-xs text-gray-500">{berita.length} artikel tersedia</p>
          </div>
          <Link href="/admin/berita/tambah">
            <Button size="sm" className="bg-green-700 hover:bg-green-800 rounded-xl">
              <Plus size={14} className="mr-1" /> Tambah Berita
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Judul</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {berita.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400 italic">Belum ada berita.</td></tr>
              ) : berita.map((b) => (
                <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800 max-w-xs truncate">{b.judul}</td>
                  <td className="px-5 py-3.5">
                    {b.published
                      ? <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium">Publik</span>
                      : <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-medium">Draft</span>
                    }
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    {new Date(b.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      <Link href={`/admin/berita/${b.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gray-100"><Pencil size={14} /></Button>
                      </Link>
                      <DeleteButton id={b.id} type="berita" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pengumuman */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Pengumuman</h2>
            <p className="text-xs text-gray-500">{pengumuman.length} pengumuman tersedia</p>
          </div>
          <Link href="/admin/berita/pengumuman/tambah">
            <Button size="sm" className="bg-green-700 hover:bg-green-800 rounded-xl">
              <Plus size={14} className="mr-1" /> Tambah Pengumuman
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Judul</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {pengumuman.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400 italic">Belum ada pengumuman.</td></tr>
              ) : pengumuman.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800 max-w-xs truncate">{p.judul}</td>
                  <td className="px-5 py-3.5">
                    {p.published
                      ? <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium">Publik</span>
                      : <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-medium">Draft</span>
                    }
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    {new Date(p.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      <Link href={`/admin/berita/pengumuman/${p.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gray-100"><Pencil size={14} /></Button>
                      </Link>
                      <DeleteButton id={p.id} type="pengumuman" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
