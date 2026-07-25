import Image from "next/image";

export default function PetaMap() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
      <Image
        src="/peta.png"
        alt="Peta Wilayah Padukuhan Mandingan"
        width={1200}
        height={800}
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  );
}
