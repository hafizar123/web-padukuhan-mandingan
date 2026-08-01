# Web Padukuhan Mandingan

Website profil Padukuhan Mandingan, Kalurahan Kebonagung, Imogiri, Bantul. Berisi informasi kependudukan, berita, agenda, potensi desa, dan monitoring trash barrier.

## Tech Stack

- Next.js 15 (App Router)
- PostgreSQL via Supabase
- Prisma 6 + adapter pg
- NextAuth.js v5
- Supabase Storage
- Tailwind CSS + shadcn/ui
- Recharts

## Setup Lokal

**1. Install dependencies**
```bash
npm install
```

**2. Isi environment variables**

Buat file `.env` dan isi:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
AUTH_SECRET="random-string-32-karakter"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="anon-key-dari-supabase"
```

Generate `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

**3. Push schema ke database**
```bash
npm run db:push
```

**4. Seed data awal**
```bash
npm run db:seed
```

**5. Jalankan dev server**
```bash
npm run dev
```

## Akun Admin Default

Setelah seed:

| Email | Password |
|---|---|
| admin1@mandingan.id | admin123 |
| admin2@mandingan.id | admin123 |

Login di `/admin/login`.
