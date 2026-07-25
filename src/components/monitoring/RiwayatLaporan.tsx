"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const volumeConfig: Record<string, { label: string; color: string }> = {
  RENDAH: { label: "Rendah", color: "bg-green-100 text-green-700" },
  SEDANG: { label: "Sedang", color: "bg-yellow-100 text-yellow-700" },
  TINGGI: { label: "Tinggi", color: "bg-orange-100 text-orange-700" },
  PENUH: { label: "Penuh", color: "bg-red-100 text-red-700" },
};

interface Report {
  id: string;
  volume: string;
  foto: string | null;
  catatan: string | null;
  createdAt: Date;
  admin: { name: string; role: string };
}

interface Barrier {
  id: string;
  nama: string;
  rt: number;
  reports: Report[];
}

export default function RiwayatLaporan({ barriers }: { barriers: Barrier[] }) {
  const [selected, setSelected] = useState(barriers[0]?.id ?? "");

  const barrier = barriers.find((b) => b.id === selected);

  return (
    <div>
      {/* Tab Pilih Barrier */}
      <div className="flex flex-wrap gap-2 mb-4">
        {barriers.map((b) => (
          <Button
            key={b.id}
            variant={selected === b.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelected(b.id)}
            className={selected === b.id ? "bg-green-700 hover:bg-green-800" : ""}
          >
            {b.nama}
          </Button>
        ))}
      </div>

      {/* Riwayat Laporan */}
      {barrier && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {barrier.nama}
              <Badge variant="outline" className="text-green-700 border-green-300">RT {barrier.rt}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {barrier.reports.length > 0 ? (
              <div className="space-y-4">
                {barrier.reports.map((r) => {
                  const vol = volumeConfig[r.volume];
                  return (
                    <div key={r.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${vol.color}`}>
                          {vol.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(r.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric", month: "long", year: "numeric",
                            hour: "2-digit", minute: "2-digit"
                          })}
                        </span>
                      </div>
                      {r.foto && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.foto} alt="Foto laporan" className="w-full h-40 object-cover rounded-lg mb-2" />
                      )}
                      {r.catatan && <p className="text-sm text-gray-600">{r.catatan}</p>}
                      <p className="text-xs text-gray-400 mt-1">Dilaporkan oleh: {r.admin.name}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 italic text-sm">Belum ada laporan untuk barrier ini.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
