"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from "recharts";

const volumeToNumber: Record<string, number> = {
  RENDAH: 1, SEDANG: 2, TINGGI: 3, PENUH: 4,
};

interface Report {
  id: string;
  volume: string;
  createdAt: Date;
}

interface Barrier {
  id: string;
  nama: string;
  reports: Report[];
}

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#a855f7", "#ef4444"];

export default function MonitoringChart({ barriers }: { barriers: Barrier[] }) {
  // Ambil semua tanggal unik dari semua laporan (7 hari terakhir)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30);

  // Buat data per tanggal
  const dateMap: Record<string, Record<string, number>> = {};

  barriers.forEach((b) => {
    b.reports
      .filter((r) => new Date(r.createdAt) >= sevenDaysAgo)
      .forEach((r) => {
        const date = new Date(r.createdAt).toLocaleDateString("id-ID", {
          day: "numeric", month: "short"
        });
        if (!dateMap[date]) dateMap[date] = {};
        dateMap[date][b.nama] = volumeToNumber[r.volume];
      });
  });

  const chartData = Object.entries(dateMap).map(([date, vals]) => ({
    date,
    ...vals,
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-gray-400 italic">
        Belum ada data laporan untuk ditampilkan.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border p-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, 4]}
            ticks={[1, 2, 3, 4]}
            tickFormatter={(v) => ["", "Rendah", "Sedang", "Tinggi", "Penuh"][v] || ""}
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            formatter={(value) => {
              const v = typeof value === "number" ? value : 0;
              return ["", "Rendah", "Sedang", "Tinggi", "Penuh"][v] ?? String(v);
            }}
          />
          <Legend />
          {barriers.map((b, i) => (
            <Line
              key={b.id}
              type="monotone"
              dataKey={b.nama}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 text-center mt-2">Data 30 hari terakhir</p>
    </div>
  );
}
