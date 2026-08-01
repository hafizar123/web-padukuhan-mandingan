import PotensiForm from "@/components/admin/PotensiForm";

export const metadata = { title: "Tambah Potensi - Admin Padukuhan Mandingan" };

export default function TambahPotensiPage() {
  return (
    <div className="min-h-full bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Potensi</h1>
      <PotensiForm />
    </div>
  );
}
