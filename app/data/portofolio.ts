export interface ProjectFeature {
  title: string;
  description: string;
}

export interface PortofolioItem {
  id: number;
  name: string;
  image: string;
  description: string;
  role: string;           // peran/kontribusi per project, mis. "Full-Stack Developer", "Frontend Lead"
  overview: string;       // paragraf overview asli per project
  tools: string[];        // daftar tools/tech stack asli per project
  features: ProjectFeature[]; // isi manual per project
  repoUrl?: string;       // URL repo GitHub (opsional — isi manual, kosongkan jika belum ada)
}


export const arrayPorto: PortofolioItem[] = [
  {
    id: 1,
    name: "MockeT",
    image: "/img/produk/MockeT.png",
    description: "Platform ticketing kegiatan sekolah yang mengintegrasikan proses pemesanan tiket, pembayaran, dan refund dalam satu sistem yang responsif dan mudah digunakan.",
    role: "Frontend Developer",               
    overview: "Platform ticketing kegiatan sekolah yang dirancang untuk mempermudah proses pemesanan tiket, pembayaran, dan refund dalam satu sistem terintegrasi. MockeT menyediakan antarmuka yang responsif dan intuitif untuk membantu siswa, perusahaan, serta pengelola kegiatan dalam mengelola proses ticketing secara lebih efisien.",             
    tools: ["Laravel", "MySQL", "NextJS", "Tailwind CSS", "Shadcn/UI"],                  
    repoUrl: "https://github.com/foxx-sigma/moket1", 
    features: [
      {
        title: "Alur Pembelian Tiket",
        description: "Purchase flow 4 tahap dengan stepper: Pilih Tiket → Data Peserta → Pembayaran → Selesai.",
      },
      {
        title: "QR Ticketing System",
        description: "Scanner check-in mobile-first untuk panitia gate: kamera besar, feedback instan tanpa reload, 4 status hasil scan (Valid / Sudah Digunakan / Tidak Valid / Bukan Event Ini).",
      },
      {
        title: "Sistem Role Multi Tenant",
        description: "Role global (User, Talent, Mentor, Super Admin) terpisah dari role kontekstual per-organisasi (Admin, Committee, Ticketing, Scanner, Finance)",
      },
      {
        title: "Dashboard & Manajemen Event",
        description: "Dashboard khusus untuk tiap role",
      }
    ],
  },
  {
    id: 2,
    name: "Local Taste Hub",
    image: "/img/produk/Tastehub.png",
    description: "Platform web responsif yang menyajikan rekomendasi kuliner di wilayah Malang, dilengkapi dengan integrasi peta interaktif lokasi restoran dan manajemen sistem pemesanan",
    role: "Backend Developer",               
    overview: "Platform rekomendasi dan pemesanan kuliner lokal yang dikembangkan oleh tim saya dengan fokus utama di sisi backend, dirancang untuk membantu pengguna menemukan tempat makan di sekitar mereka sekaligus melakukan pemesanan langsung dari platform tanpa harus berpindah aplikasi. Proyek ini dibangun menggunakan NestJS sebagai framework utama, dipadukan dengan Prisma ORM dan Supabase (PostgreSQL) sebagai database, serta sistem autentikasi berbasis JWT yang membedakan akses antara pengguna biasa dan admin.",             
    tools: ["NestJs","Supabase (PostgreSQL)","JWT","PDFKit","Railway", "Git/GitHub","Swagger","Postman"],
    repoUrl: "https://github.com/foxx-sigma/kulinerukl_backend",               
    features: [
      {
        title: "Autentikasi dan Manajemen Role",
        description: "Fitur ini mengatur akses pengguna ke seluruh sistem menggunakan JWT-based authentication dengan dua tingkatan role, admin dan user.",
      },
      {
        title: "Eksplorasi Kuliner dan Menu",
        description: "Memungkinkan pengguna menelusuri tempat kuliner lokal beserta menu yang tersedia di masing-masing tempat di daerah Malang."
      },
      {
        title: "Order",
        description:"Saat pengguna melakukan pemesanan, sistem menyimpan detail item yang dipesan menggunakan Prisma transactions agar data tetap konsisten meskipun terjadi kegagalan di tengah proses, lalu menghasilkan bukti pembayaran dalam bentuk PDF secara otomatis menggunakan PDFKit begitu transaksi selesai diverifikasi."
      },
      {
        title: "Verifikasi Pembayaran",
        description: "Menangani proses konfirmasi pembayaran atas pesanan yang masuk, memastikan status transaksi hanya berubah menjadi terverifikasi setelah melalui pengecekan yang sesuai di backend."
      },
      {
        title: "Export Laporan",
        description: "Fitur ini memudahkan admin memantau seluruh transaksi yang terjadi di platform dengan menyediakan opsi ekspor data pesanan ke format CSV maupun PDF."
      }
    ],             
  },
  {
    id: 3,
    name: "TEFA Moklet",
    image: "/img/produk/TEFA.png",
    description: "Portal portofolio digital institusi (Teaching Factory) yang dirancang untuk memamerkan proyek siswa kepada mitra industri dan perusahaan.",
    role: "Frontend Developer",              
    overview: "Platform yang dikembangkan untuk menjembatani siswa dengan pihak industri dan mitra eksternal. Melalui platform ini, siswa dapat mengunggah proyek yang sudah mereka selesaikan, guru dari departemen terkait meninjau dan menyetujui proyek tersebut sebelum ditampilkan secara publik, dan pihak industri yang tertarik dengan suatu proyek bisa langsung menghubungi guru penanggung jawab sebagai kontak resmi. Saya membangun platform ini menggunakan Next.js 14, dengan fokus utama pada sistem autentikasi, alur onboarding pengguna, serta redesign tampilan menggunakan shadcn/ui dan palet warna institusional yang disesuaikan dengan identitas sekolah.",             
    tools: ["NextJS 14", "Shadcn/UI", "Tailwind CSS", "Git/GitHub"],
    repoUrl: "https://github.com/foxx-sigma/dev-frontend-tefa-rev-main",                
    features: [
      {
        title: "Role-Based Routing",
        description: "mengatur seluruh akses masuk ke platform menggunakan custom hooks useSignIn, useSignUp, dan useProfileSetup yang dibangun terpisah agar logikanya reusable di berbagai halaman."
      },
      {
        title: "2FA Email",
        description: "memastikan akun yang mendaftar benar-benar valid, proses sign up dilengkapi alur verifikasi email dua langkah sebelum akun bisa digunakan sepenuhnya."
      },
      {
        title: "Alur Pengajuan dan Persetujuan Proyek",
        description: "Siswa dapat mengunggah proyek yang telah mereka selesaikan melalui sistem, lalu proyek tersebut masuk ke antrean peninjauan guru dari departemen terkait. Guru meninjau kelayakan proyek dan memberikan persetujuan sebelum proyek itu ditampilkan di halaman publik."
      },
    ],             
  },
  {
    id: 4,
    name: "PDAM Management System",
    image: "/img/produk/pdam.png",
    description: "Sistem manajemen untuk PDAM yang dirancang untuk membantu dalam pengelolaan data pelanggan, tagihan, dan pembayaran.",
    role: "Frontend Developer",               
    overview: "Sistem manajemen yang dirancang untuk membantu PDAM dalam pengelolaan data pelanggan, tagihan, dan pembayaran.",             
    tools: ["NextJS 14", "Tailwind CSS", "Git/GitHub"],
    repoUrl: "https://github.com/foxx-sigma/pdam-app",        
    features: [
      {
        title: "",
        description: "",
      },
    ],             
  }
]
