import { prisma } from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, User } from "lucide-react";

export const metadata = { title: "Kontak - Padukuhan Mandingan" };
export const dynamic = "force-dynamic";

// Data fallback dukuh
const dukuhFallback = {
  nama: "Suradi Wiyono",
  jabatan: "Dukuh Mandingan",
  noHp: null as string | null,
  email: null as string | null,
};

export default async function KontakPage() {
  let dukuh: { nama: string; jabatan: string; noHp: string | null; email: string | null } | null = null;
  try {
    const data = await prisma.kontak.findFirst({
      where: { jabatan: { contains: "Dukuh" } },
    });
    dukuh = data;
  } catch { /* DB tidak tersedia */ }

  const kontakDukuh = dukuh ?? dukuhFallback;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-1">Kontak</h1>
      <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/70 mb-6 tracking-widest text-lg">
        ꦏꦺꦴꦤ꧀ꦠꦏ꧀
      </p>
      <Separator className="mb-10" />

      {/* Kontak Dukuh */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center shrink-0">
            <User size={36} className="text-green-700" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1">Dukuh Padukuhan Mandingan</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{kontakDukuh.nama}</h2>
            <p className="text-green-700 font-medium mb-4">{kontakDukuh.jabatan}</p>

            <div className="space-y-2">
              {kontakDukuh.noHp ? (
                <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-lg px-4 py-2 text-sm text-gray-700">
                  <Phone size={15} className="text-green-600" />
                  {kontakDukuh.noHp}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No. HP belum tersedia</p>
              )}

              {kontakDukuh.email && (
                <div className="inline-flex items-center gap-2 bg-white border border-green-200 rounded-lg px-4 py-2 text-sm text-gray-700">
                  <Mail size={15} className="text-green-600" />
                  {kontakDukuh.email}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alamat */}
        <div className="mt-6 pt-6 border-t border-green-200 flex items-start gap-2 text-sm text-gray-600">
          <MapPin size={15} className="text-green-600 mt-0.5 shrink-0" />
          <span>Padukuhan Mandingan, Kalurahan Kebonagung, Kapanewon Imogiri, Kabupaten Bantul, D.I. Yogyakarta</span>
        </div>
      </div>
    </div>
  );
}
