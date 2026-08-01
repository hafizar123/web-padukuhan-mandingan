-- =============================================
-- Tabel potensi
-- (Prisma mengelola migrasi, tapi ini untuk referensi manual / seed langsung)
-- =============================================

CREATE TABLE IF NOT EXISTS potensi (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  nama        TEXT NOT NULL,
  kategori    TEXT NOT NULL,   -- pertanian | peternakan | kesenian | wisata
  lokasi      TEXT,
  pimpinan    TEXT,
  deskripsi   TEXT NOT NULL,
  foto        TEXT[] NOT NULL DEFAULT '{}',
  urutan      INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- Data awal 7 potensi padukuhan
-- =============================================

INSERT INTO potensi (nama, kategori, lokasi, pimpinan, deskripsi, foto, urutan) VALUES

(
  'Kelompok Tani "Karya"',
  'pertanian',
  'Bulak Karya Selatan, Padukuhan Mandingan',
  'Bapak Mujiyono',
  'Kelompok Tani "Karya" berlokasi di Bulak Karya Selatan, Padukuhan Mandingan dan dipimpin oleh Bapak Mujiyono. Kelompok ini dibentuk dengan tujuan untuk meningkatkan kemampuan, kemandirian, dan efisiensi para petani melalui pengembangan pengetahuan, keterampilan, serta sikap anggota. Selain itu, Kelompok Tani "Karya" juga menyediakan berbagai sarana pendukung pertanian, seperti traktor, benih, dan pupuk.

Kelompok Tani "Karya" berperan sebagai wadah penyuluhan yang mendorong inovasi serta memperkuat kerja sama antara petani dan berbagai pihak terkait. Keberadaan kelompok ini diharapkan dapat meningkatkan kesejahteraan petani sekaligus menjaga keberlangsungan tradisi pertanian di Padukuhan Mandingan.',
  '{}',
  1
),

(
  'Kelompok Ternak "Sarono Rukun"',
  'peternakan',
  'RT 01 Dusun Wolosono, Padukuhan Mandingan',
  NULL,
  'Kelompok Ternak "Sarono Rukun" berlokasi di RT 01 Dusun Wolosono, Padukuhan Mandingan dan berdiri pada tahun 2025. Pada awal pembentukannya, kelompok ini memiliki kandang berkapasitas 6 petak dengan jumlah ternak sebanyak 11 ekor kambing yang terdiri atas 10 ekor betina dan 1 ekor jantan. Saat ini, kelompok tersebut telah berkembang dengan kapasitas kandang sebanyak 12 petak yang tersebar di dua lokasi serta memiliki total populasi ternak mencapai 25 ekor kambing.

Kelompok Ternak "Sarono Rukun" memiliki 20 anggota terdaftar dengan 7 anggota yang masih aktif. Kegiatan kelompok meliputi musyawarah rutin setiap satu bulan sekali serta perawatan kandang secara berkala untuk menjaga kesehatan dan produktivitas ternak.',
  '{}',
  2
),

(
  'Kelompok Ternak "Sido Renggeng"',
  'peternakan',
  'RT 02 Dusun Mandingan, Padukuhan Mandingan',
  NULL,
  'Kelompok Ternak "Sido Renggeng" berlokasi di RT 02 Dusun Mandingan, Padukuhan Mandingan dan berdiri pada akhir tahun 2023. Pembentukan kelompok ini diawali dengan bantuan dari Dinas Peternakan, Kelautan, dan Perikanan Kabupaten Bantul berupa 11 ekor kambing. Seiring dengan perkembangan kelompok, jumlah ternak yang dikelola saat ini telah meningkat menjadi 25 ekor kambing.

Kelompok Ternak "Sido Renggeng" dibentuk sebagai wadah kerja sama antarpeternak dalam pengelolaan ternak, pelaksanaan pelatihan, serta peningkatan akses terhadap sumber daya dan pasar. Keberadaan kelompok ini diharapkan dapat meningkatkan produktivitas dan kesejahteraan para peternak di Padukuhan Mandingan.',
  '{}',
  3
),

(
  'Gejog Lesung "Gemah Ripah"',
  'kesenian',
  'RT 03 Dusun Candran, Padukuhan Mandingan',
  'Bapak Slamet',
  'Kelompok kesenian Gejog Lesung "Gemah Ripah" berlokasi di RT 03 Dusun Candran, Padukuhan Mandingan dan menjadi salah satu kesenian tradisional yang digunakan sebagai bentuk penyambutan bagi tamu yang berkunjung ke Padukuhan Mandingan. Kelompok kesenian ini dipimpin oleh Bapak Slamet dan dibentuk sebagai wadah untuk mengenalkan serta mengembangkan seni dan budaya tradisional kepada generasi muda.

Gejog Lesung "Gemah Ripah" berperan dalam melatih dan membimbing generasi muda agar dapat menjaga, melestarikan, serta meneruskan keberadaan kesenian tradisional. Keberadaan kelompok ini menjadi salah satu bentuk upaya pelestarian budaya lokal di Padukuhan Mandingan.',
  '{}',
  4
),

(
  'Hadroh "As-Syifa"',
  'kesenian',
  'RT 03 Dusun Candran, Padukuhan Mandingan',
  'Ibu Siti Nurjanah',
  'Kelompok Hadroh "As-Syifa" berlokasi di RT 03 Dusun Candran, Padukuhan Mandingan dan dibentuk pada tahun 2023. Nama "As-Syifa" dipilih dengan harapan bahwa kegiatan bershalawat dapat menjadi sarana penyembuhan fisik maupun mental. Kelompok ini dipimpin oleh Ibu Siti Nurjanah dengan jumlah anggota sebanyak 11 orang.

Hadroh "As-Syifa" dibentuk sebagai wadah untuk mendidik generasi muda mengenai nilai-nilai agama, seni, dan budaya tradisional. Kegiatan latihan rutin dilaksanakan setiap malam Selasa, sedangkan pementasan dilakukan pada pengajian rutin malam Ahad Pahing maupun kegiatan masyarakat lainnya. Kelompok ini juga telah memiliki Nomor Induk Berusaha (NIB) dari Dinas Kebudayaan.',
  '{}',
  5
),

(
  'Karawitan "Agung Wiromo"',
  'kesenian',
  'RT 01 Dusun Wolosono, Padukuhan Mandingan',
  'Ibu Sudiwiranto',
  'Kelompok Karawitan "Agung Wiromo" berlokasi di RT 01 Dusun Wolosono, Padukuhan Mandingan dan merupakan salah satu kesenian tradisional yang telah berkembang sejak tahun 1918. Kesenian ini pertama kali digagas oleh Ibu Sudiwiranto dengan menggunakan perangkat gamelan milik pribadi. Kelompok ini memiliki 24 personil terdaftar dengan sekitar 20 anggota yang masih aktif, terdiri atas 12 penabuh serta 8 anggota sebagai girong dan sinden.

Keberadaan Karawitan "Agung Wiromo" menjadi salah satu bentuk upaya pelestarian seni dan budaya tradisional di Padukuhan Mandingan.',
  '{}',
  6
),

(
  'Museum Tani Jawa Indonesia',
  'wisata',
  'Dusun Candran, Padukuhan Mandingan',
  'Kristya Bintara (Pendiri)',
  'Museum Tani Jawa Indonesia berlokasi di Dusun Candran, Padukuhan Mandingan dan didirikan oleh Kristya Bintara, mantan Lurah Desa Kebonagung, pada tahun 1998. Museum ini dibangun sebagai tempat pelestarian budaya pertanian Jawa dan mulai mengumpulkan berbagai alat pertanian tradisional sejak tahun 2005. Bangunan sempat mengalami kerusakan akibat gempa Yogyakarta tahun 2006, kemudian dibangun kembali dan diresmikan pada 4 Mei 2007.

Hingga saat ini, Museum Tani Jawa Indonesia menyimpan lebih dari 620 koleksi alat pertanian tradisional Jawa dari berbagai zaman dengan bahan berupa batu, besi, bambu, kayu, dan aluminium. Selain sebagai tempat penyimpanan artefak budaya, museum ini juga menjadi sarana edukasi bagi masyarakat dan wisatawan untuk mengenal sejarah, tradisi, serta kearifan lokal dalam kehidupan agraris masyarakat Jawa.',
  '{}',
  7
);
