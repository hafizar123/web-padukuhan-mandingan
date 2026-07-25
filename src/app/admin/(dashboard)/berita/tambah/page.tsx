import BeritaForm from "@/components/admin/BeritaForm";

export const metadata = { title: "Tambah Berita - Admin" };

export default function TambahBeritaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Berita</h1>
      <BeritaForm />
    </div>
  );
}
