# Frontend Si-Nomer V2 (GitHub Pages)

Folder ini hanya berisi frontend statis. `Code.gs` tidak ada di sini dan harus tetap dikelola terpisah di Google Apps Script.

## Isi

- `index.html` — aplikasi frontend
- `config.js` — URL endpoint Apps Script
- `sw.js` — PWA/cache
- `manifest.webmanifest` dan ikon

Sebelum mengaktifkan frontend baru, uji backend V2 di salinan spreadsheet dan Apps Script. Setelah itu unggah seluruh isi folder ini ke repository tujuan dan aktifkan hosting HTTPS. Jangan mengunggah data spreadsheet atau kredensial pegawai. Repository privat dianjurkan untuk source kantor; kebijakan visibilitas halaman hosting perlu dicek sesuai akun/organisasi.

Untuk antrean offline, biarkan halaman tetap terbuka sampai indikator antrean menjadi nol. Saat perangkat offline, biarkan halaman tetap terbuka dan pastikan tugas sudah dimuat. Jika browser ditutup penuh, antrean tetap tersimpan di IndexedDB dan sinkronisasi dicoba lagi setelah aplikasi dibuka kembali dalam kondisi online dan kurir masuk.

## Input daftar tujuan

Untuk daftar banyak, salin tiga kolom Nama OPD, Alamat, Telepon dari Excel/Google Sheets dan tempel langsung di form; tidak perlu membuat file CSV. Ada 5 baris manual awal dan tombol tambah baris. Pratinjau membantu memeriksa daftar sebelum dipakai.

## Catatan migrasi spreadsheet

Backend staging menambahkan kolom secara additive dan tidak mengosongkan baris lama. Pada tab Users 8 kolom lama, kredensial default lama (`password123` / `123456`) akan ditambahkan—ubah sebelum pemakaian. `setupDatabaseSheets()` dapat dipanggil saat login/API; uji backend pada salinan spreadsheet terlebih dahulu.
