# FlowSync Finance - Project Context

## Overview
FlowSync adalah aplikasi personal finance berbasis PWA (Progressive Web App) mobile-first yang terhubung langsung dengan Google Sheets sebagai database utama melalui Google Apps Script (GAS).

## Tech Stack & Architecture
- **Frontend**: Single Page PWA (`index.html`), Tailwind CSS via CDN, Vanilla JavaScript.
- **PWA Assets**: `manifest.json` (standalone display) dan `sw.js` (service worker caching).
- **Backend**: Google Apps Script Web App (GAS) dengan Gemini API integration.
- **Database**: Google Sheets (`Log Transaksi Bank`).
- **Hosting**: GitHub Pages.

## Schema Database (Google Sheets)
Tabel transaksi memiliki 7 kolom:
1. `Waktu` (Format: DD/MM/YYYY HH:mm:ss)
2. `Aplikasi` (Contoh: Livin' by Mandiri, BRImo)
3. `Merchant / Tujuan`
4. `Kategori` (Makanan & Minuman, Transportasi, Belanja Harian, Tagihan & Utilitas, Transfer Keluar, Investasi & Tabungan, Pemasukan / Gaji, Lain-lain)
5. `Tipe` (PENGELUARAN / PEMASUKAN)
6. `Nominal` (Numerik bersih)
7. `Pesan Notifikasi Asli` (Catatan mutasi e-statement & saldo akhir)

## API Endpoints (Google Apps Script)
- **GET Request (`doGet`)**: Mengembalikan JSON ringkasan:
  - Parameter opsional: `?syncGmail=true` untuk sinkronisasi otomatis transaksi terbaru dari Gmail.
  - `status`: "success"
  - `totalTransactions`: Total baris transaksi
  - `summary`: { saldoTotal, saldoMandiri, saldoBRI, pemasukan, pengeluaran, netFlow }
  - `categoryBreakdown`: Objek akumulasi nominal per kategori { "Makanan & Minuman": 123456, ... }
  - `expenses`: Array seluruh transaksi pengeluaran (diurutkan terbesar ke terkecil)
  - `incomes`: Array seluruh transaksi pemasukan
  - `recentTransactions`: Array 20 transaksi terbaru (dengan atribut bank / app)
- **POST Request (`doPost`)**: Menerima payload JSON `{ time, app, text }`, di-parse oleh Gemini API, lalu di-append ke Google Sheets (app: "Livin' by Mandiri" atau "BRImo").

## Development Rules
- Pertahankan dukungan PWA agar aplikasi tetap bisa diinstal di Android Chrome.
- Desain selalu mobile-first (max-width mobile screen, touch-friendly, dark mode slate-950/slate-900).
- Transaksi terkait "Bank Permata" atau "RDN" secara otomatis dikelompokkan ke pos "Investasi & Tabungan".
- URL Web App Apps Script disimpan pada `localStorage` pengguna (`gas_webhook_url`).
