// Fallback statis kalau DB tidak mengembalikan data
export const dataKependudukanFallback = [
  { id: "1", rt: 1, kkLaki: 61, kkPerempuan: 12, jumlahKK: 73, lakiLaki: 104, perempuan: 107, jumlahPenduduk: 211 },
  { id: "2", rt: 2, kkLaki: 24, kkPerempuan: 8,  jumlahKK: 32, lakiLaki: 44,  perempuan: 44,  jumlahPenduduk: 88  },
  { id: "3", rt: 3, kkLaki: 37, kkPerempuan: 13, jumlahKK: 50, lakiLaki: 62,  perempuan: 67,  jumlahPenduduk: 129 },
  { id: "4", rt: 4, kkLaki: 53, kkPerempuan: 7,  jumlahKK: 60, lakiLaki: 94,  perempuan: 80,  jumlahPenduduk: 174 },
];

export const totalFallback = {
  jumlahKK: 215,
  jumlahPenduduk: 602,
  lakiLaki: 304,
  perempuan: 298,
};

import { prisma } from "@/lib/prisma";

export async function getDataKependudukan() {
  try {
    const data = await prisma.dataKependudukan.findMany({ orderBy: { rt: "asc" } });
    if (data.length > 0) return data;
    return dataKependudukanFallback;
  } catch {
    return dataKependudukanFallback;
  }
}

export async function getTotalKependudukan() {
  try {
    const result = await prisma.dataKependudukan.aggregate({
      _sum: { jumlahPenduduk: true, jumlahKK: true, lakiLaki: true, perempuan: true },
    });
    if (result._sum.jumlahPenduduk) {
      return {
        jumlahPenduduk: result._sum.jumlahPenduduk ?? 0,
        jumlahKK: result._sum.jumlahKK ?? 0,
        lakiLaki: result._sum.lakiLaki ?? 0,
        perempuan: result._sum.perempuan ?? 0,
      };
    }
    return totalFallback;
  } catch {
    return totalFallback;
  }
}
