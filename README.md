# Web Padukuhan Mandingan

Portal informasi resmi Padukuhan Mandingan, Kalurahan Kebonagung, Kapanewon Imogiri, Bantul — mencakup profil padukuhan, data kependudukan, berita, agenda, dan monitoring trash barrier.

## Tech Stack

- **Next.js 16** (App Router)
- **PostgreSQL** via Supabase
- **Prisma 7** dengan driver adapter
- **NextAuth.js v5**
- **Supabase Storage** (foto laporan)
- **Tailwind CSS** + shadcn/ui
- **Recharts** (grafik kependudukan)
- Deploy ke **Vercel**

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Konfigurasi environment

Salin `.env` dan isi variabelnya:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"

AUTH_SECRET="isi-dengan-random-string-32-karakter"
NEXTAUTH_URL="http://localhost:3000"

NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="anon-key-dari-supabase"
```

Generate `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Push schema ke database

```bash
npm run db:push
```

### 4. Seed data awal

```bash
npm run db:seed
```

### 5. Jalankan dev server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Akun Default

Setelah seed, dua akun admin tersedia:

| Email | Password |
|---|---|
| admin1@mandingan.id | admin123 |
| admin2@mandingan.id | admin123 |

Login admin: `/admin/login`

## Deploy ke Vercel

1. Push repo ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Tambahkan environment variables di Vercel Dashboard (`DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Set `NEXTAUTH_URL` ke URL production (misal `https://mandingan.vercel.app`)
5. Deploy, lalu jalankan seed sekali via Vercel CLI atau Supabase dashboard

## Struktur Direktori

```
src/
├── app/
│   ├── (public)/      # Halaman publik
│   └── admin/         # Dashboard admin (protected)
├── components/
│   ├── admin/
│   ├── layout/
│   └── ui/
└── lib/
    ├── prisma.ts
    ├── auth.ts
    └── supabase.ts

prisma/
├── schema.prisma
└── seed.ts
```
