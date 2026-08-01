import { prisma } from "@/lib/prisma";
import { Phone, Mail, User } from "lucide-react";
import EditKontakDukuhForm from "@/components/admin/EditKontakDukuhForm";

export const metadata = { title: "Kontak - Admin Padukuhan Mandingan" };
export const dynamic = "force-dynamic";

export default async function AdminKontakPage() {
  let dukuh: { id: string; nama: string; jabatan: string; noHp: string | null; email: string | null } | null = null;
  try {
    dukuh = await prisma.kontak.findFirst({
      where: { jabatan: { contains: "Dukuh" } },
    });
  } catch { /* DB tidak tersedia */ }

  return (
    <div className="min-h-full bg-gray-50 p-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kontak Dukuh</h1>
        <p className="text-sm text-gray-500 mt-1">Informasi kontak yang ditampilkan di halaman publik</p>
      </div>

      {/* Preview Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Preview</p>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <User size={24} className="text-green-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg">{dukuh?.nama ?? "Belum diisi"}</p>
            <p className="text-green-700 text-sm font-medium">{dukuh?.jabatan ?? "Dukuh Mandingan"}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {dukuh?.noHp ? (
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Phone size={12} /> {dukuh.noHp}
                </span>
              ) : (
                <span className="text-xs text-gray-400 italic">No. HP belum diisi</span>
              )}
              {dukuh?.email && (
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Mail size={12} /> {dukuh.email}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Edit Informasi</p>
        <EditKontakDukuhForm dukuh={dukuh} />
      </div>
    </div>
  );
}
