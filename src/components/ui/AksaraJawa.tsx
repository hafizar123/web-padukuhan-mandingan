// Komponen untuk menampilkan teks dalam aksara Jawa
// Menggunakan font Noto Serif Javanese dari Google Fonts

interface AksaraJawaProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClass = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
};

export default function AksaraJawa({ text, className = "", size = "md" }: AksaraJawaProps) {
  return (
    <span
      style={{ fontFamily: "var(--font-javanese)" }}
      className={`${sizeClass[size]} text-green-700/70 tracking-wider ${className}`}
    >
      {text}
    </span>
  );
}
