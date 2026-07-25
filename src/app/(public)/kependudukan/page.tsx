import { Separator } from "@/components/ui/separator";
import KependudukanChart from "@/components/kependudukan/KependudukanChart";
import { Users, Home, User, UserRound } from "lucide-react";
import { getDataKependudukan, getTotalKependudukan } from "@/lib/data-kependudukan";

export const metadata = { title: "Kependudukan - Padukuhan Mandingan" };

type DataRTItem = {
  id: string;
  rt: number;
  jumlahKK: number;
  jumlahPenduduk: number;
  lakiLaki: number;
  perempuan: number;
  [key: string]: unknown;
};

const rtColors = [
  { bg: "bg-green-50", border: "border-green-200", accent: "bg-green-600", text: "text-green-700" },
  { bg: "bg-blue-50",  border: "border-blue-200",  accent: "bg-blue-600",  text: "text-blue-700"  },
  { bg: "bg-amber-50", border: "border-amber-200", accent: "bg-amber-600", text: "text-amber-700" },
  { bg: "bg-rose-50",  border: "border-rose-200",  accent: "bg-rose-600",  text: "text-rose-700"  },
];

export default async function KependudukanPage() {
  const [dataRT, total] = await Promise.all([
    getDataKependudukan(),
    getTotalKependudukan(),
  ]);
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-1">Data Kependudukan</h1>
      <p style={{ fontFamily: "var(--font-javanese)" }} className="text-green-600/70 mb-1 tracking-widest text-lg">
        ꦢꦠꦏꦼꦥꦼꦤ꧀ꦢꦸꦢꦸꦏꦤ꧀
      </p>
      <p className="text-gray-500 mb-6">Padukuhan Mandingan</p>
      <Separator className="mb-10" />

      {/* Statistik Total */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Penduduk", value: total.jumlahPenduduk, sub: `${total.lakiLaki}L + ${total.perempuan}P`, icon: Users },
            { label: "Kepala Keluarga", value: total.jumlahKK, sub: "KK", icon: Home },
            { label: "Laki-laki", value: total.lakiLaki, sub: "jiwa", icon: User },
            { label: "Perempuan", value: total.perempuan, sub: "jiwa", icon: UserRound },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <s.icon size={20} className="text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-700 mt-2">{s.value.toLocaleString("id-ID")}</p>
              <p className="text-xs font-semibold text-gray-700 mt-1">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data per RT */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Detail per RT</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {dataRT.map((d: DataRTItem, i: number) => {
            const c = rtColors[i % rtColors.length];
            const laki = d.lakiLaki;
            const perempuan = d.perempuan;
            const totalRT = d.jumlahPenduduk;
            return (
              <div key={d.rt} className={`${c.bg} border ${c.border} rounded-2xl p-5 shadow-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`${c.accent} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                    RT 0{d.rt}
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${c.text}`}>{totalRT}</p>
                    <p className="text-xs text-gray-500">jiwa</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className={`text-lg font-bold ${c.text}`}>{d.jumlahKK}</p>
                    <p className="text-xs text-gray-500 leading-tight">KK</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className={`text-lg font-bold ${c.text}`}>{laki}</p>
                    <p className="text-xs text-gray-500 leading-tight">Laki-laki</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-3 text-center">
                    <p className={`text-lg font-bold ${c.text}`}>{perempuan}</p>
                    <p className="text-xs text-gray-500 leading-tight">Perempuan</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Proporsi penduduk</span>
                    <span>{((totalRT / total.jumlahPenduduk) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                    <div className={`h-full ${c.accent} rounded-full`} style={{ width: `${(totalRT / total.jumlahPenduduk) * 100}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chart */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Grafik Perbandingan</h2>
        <KependudukanChart data={dataRT.map(d => ({
          id: String(d.rt),
          rt: d.rt,
          jumlahKK: d.jumlahKK,
          jumlahPenduduk: d.jumlahPenduduk,
          lakiLaki: d.lakiLaki,
          perempuan: d.perempuan,
        }))} />
      </section>
    </div>
  );
}
