"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataKependudukan {
  id: string;
  rt: number;
  jumlahKK: number;
  jumlahPenduduk: number;
  lakiLaki: number;
  perempuan: number;
}

export default function KependudukanChart({ data }: { data: DataKependudukan[] }) {
  const chartData = data.map((d) => ({
    name: `RT ${d.rt}`,
    "Laki-laki": d.lakiLaki,
    Perempuan: d.perempuan,
    Total: d.jumlahPenduduk,
  }));

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Grafik Kependudukan per RT</h2>
      <div className="bg-white rounded-xl border p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Laki-laki" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Perempuan" fill="#ec4899" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
