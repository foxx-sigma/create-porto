export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Menguasai Next.js 15 dan App Router untuk Pemula",
    slug: "menguasai-nextjs-15-app-router",
    date: "2024-05-12",
    excerpt: "Panduan lengkap mempelajari Next.js 15, fitur App Router terbaru, dan cara membangun aplikasi web modern yang cepat dan SEO-friendly.",
    coverImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1200&q=80",
    category: "Next.js",
    tags: ["React", "Next.js", "Frontend", "Web Dev"],
    readingTime: "8 min read",
    author: {
      name: "Aesar Sikma",
      role: "Fullstack Developer",
      avatar: "/Img/Fotoku.jpg"
    },
    content: `
      <h2>Mengenal Next.js App Router</h2>
      <p>Next.js telah merevolusi cara kita membangun aplikasi React. Dengan hadirnya <strong>App Router</strong>, Next.js menawarkan paradigma baru dalam mengelola <em>routing</em>, <em>data fetching</em>, dan arsitektur aplikasi secara keseluruhan.</p>
      
      <blockquote>
        "App Router tidak hanya mengubah cara kita menulis rute, tetapi juga cara kita memikirkan batasan antara Server dan Client Component."
      </blockquote>

      <h3>Fitur Unggulan</h3>
      <ul>
        <li><strong>Server Components by default:</strong> Mengurangi bundle size secara drastis dengan merender komponen di server.</li>
        <li><strong>Nested Layouts:</strong> Membuat antarmuka pengguna yang kompleks menjadi jauh lebih mudah dikelola.</li>
        <li><strong>Streaming:</strong> Menampilkan sebagian UI sebelum seluruh data selesai dimuat.</li>
      </ul>

      <h3>Contoh Implementasi Dasar</h3>
      <p>Berikut adalah contoh sederhana bagaimana mendeklarasikan sebuah halaman dengan App Router:</p>
      <pre><code>export default async function Page() {
  const data = await fetchData();
  return (
    &lt;main&gt;
      &lt;h1&gt;{data.title}&lt;/h1&gt;
    &lt;/main&gt;
  );
}</code></pre>
      
      <p>Dengan Next.js 15, Anda juga mendapatkan peningkatan performa pada kompilasi <em>Turbopack</em> yang membuat pengalaman <em>development</em> jauh lebih mulus dan cepat.</p>
    `
  },
  {
    id: 2,
    title: "Prinsip Clean Code dalam Pengembangan Frontend",
    slug: "prinsip-clean-code-frontend",
    date: "2024-05-02",
    excerpt: "Menerapkan prinsip Clean Code di frontend tidak hanya tentang kode yang berjalan, tetapi kode yang mudah dibaca, dipelihara, dan dikembangkan oleh tim.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "Clean Code",
    tags: ["Best Practices", "Refactoring", "JavaScript"],
    readingTime: "6 min read",
    author: {
      name: "Aesar Sikma",
      role: "Fullstack Developer",
      avatar: "/Img/Fotoku.jpg"
    },
    content: `
      <h2>Apa itu Clean Code?</h2>
      <p>Clean Code adalah istilah yang sering digaungkan oleh Robert C. Martin (Uncle Bob). Intinya adalah menulis kode yang ditulis dengan niat agar bisa dipahami dengan mudah oleh manusia (developer lain), bukan sekadar dipahami oleh mesin.</p>

      <h3>Prinsip Utama dalam React</h3>
      <ol>
        <li><strong>Single Responsibility Principle (SRP):</strong> Setiap komponen harus memiliki satu alasan untuk berubah. Jangan menggabungkan UI dan kompleksitas <em>business logic</em> dalam satu file.</li>
        <li><strong>Penamaan yang Jelas:</strong> Gunakan nama variabel dan fungsi yang deskriptif. Hindari singkatan yang membingungkan.</li>
        <li><strong>DRY (Don't Repeat Yourself):</strong> Ekstrak kode yang berulang menjadi <em>reusable component</em> atau <em>custom hook</em>.</li>
      </ol>

      <hr/>

      <h3>Studi Kasus: Refactoring Komponen</h3>
      <p>Misalnya Anda memiliki komponen yang sangat panjang yang menangani form, validasi, dan API call. Memecahnya menjadi bagian-bagian kecil akan membuatnya jauh lebih bersih.</p>
      
      <table>
        <thead>
          <tr>
            <th>Bad Practice</th>
            <th>Good Practice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Komponen raksasa berisi ratusan baris kode.</td>
            <td>Memecah form input menjadi komponen terpisah.</td>
          </tr>
          <tr>
            <td>API call di dalam \`useEffect\`.</td>
            <td>Menggunakan \`React Query\` atau \`SWR\`.</td>
          </tr>
        </tbody>
      </table>

      <p>Mulailah menulis kode yang lebih baik hari ini, dan diri Anda di masa depan akan berterima kasih.</p>
    `
  },
  {
    id: 3,
    title: "Membuat Animasi Web Impresif dengan GSAP dan Motion",
    slug: "animasi-web-gsap-motion",
    date: "2024-04-20",
    excerpt: "Panduan teknis menggabungkan GSAP ScrollTrigger dan Framer Motion (Motion) untuk menciptakan pengalaman web interaktif yang tak terlupakan.",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    category: "UI/UX",
    tags: ["GSAP", "Motion", "Animation", "Frontend"],
    readingTime: "10 min read",
    author: {
      name: "Aesar Sikma",
      role: "Fullstack Developer",
      avatar: "/Img/Fotoku.jpg"
    },
    content: `
      <h2>Kekuatan Animasi di Web Modern</h2>
      <p>Di era di mana <em>attention span</em> pengguna semakin pendek, menyajikan website yang statis seringkali tidak cukup. Animasi membantu menuntun pandangan pengguna dan memberikan umpan balik (feedback) visual yang memuaskan.</p>

      <h3>Kapan Menggunakan GSAP vs Motion?</h3>
      <p>Dalam proyek portofolio ini, kita menggunakan keduanya dengan pembagian tugas yang jelas:</p>
      <ul>
        <li><strong>GSAP (terutama ScrollTrigger):</strong> Digunakan untuk animasi berbasis scroll yang kompleks, seperti memicu animasi saat elemen masuk <em>viewport</em>, pinning elemen, atau efek parallax.</li>
        <li><strong>Motion (Framer Motion):</strong> Digunakan untuk interaksi mikro (hover, tap), transisi antar-state (seperti <code>layoutId</code>), dan animasi berbasis spring physics yang terlihat sangat natural.</li>
      </ul>

      <h3>Contoh Integrasi Motion</h3>
      <pre><code>import { motion } from "motion/react";

export function Button() {
  return (
    &lt;motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    &gt;
      Klik Saya
    &lt;/motion.button&gt;
  );
}</code></pre>

      <p>Kombinasi kedua library ini menghasilkan UI yang dinamis tanpa mengorbankan performa, asalkan diimplementasikan dengan hati-hati dan menghindari memicu re-render yang tidak perlu.</p>
    `
  },
  {
    id: 4,
    title: "Mengapa TypeScript adalah Standar Baru Frontend",
    slug: "mengapa-typescript-standar-baru",
    date: "2024-04-10",
    excerpt: "Bagaimana TypeScript membantu menemukan bug sebelum kode dijalankan dan mengapa sebagian besar perusahaan beralih menggunakannya.",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Developer Tooling"],
    readingTime: "7 min read",
    author: {
      name: "Aesar Sikma",
      role: "Fullstack Developer",
      avatar: "/Img/Fotoku.jpg"
    },
    content: `
      <h2>Evolusi JavaScript</h2>
      <p>JavaScript adalah bahasa yang sangat fleksibel (dinamis). Namun, fleksibilitas ini sering kali menjadi pedang bermata dua saat aplikasi mulai berskala besar. Di sinilah TypeScript hadir.</p>

      <blockquote>
        "TypeScript adalah superset dari JavaScript yang menambahkan static typing opsional."
      </blockquote>

      <h3>Manfaat Utama TypeScript</h3>
      <ul>
        <li><strong>Deteksi Bug Dini:</strong> Mendeteksi kesalahan ketik atau pemanggilan fungsi dengan parameter yang salah saat proses penulisan kode, bukan saat <em>runtime</em>.</li>
        <li><strong>Developer Experience (DX):</strong> <em>Intellisense</em> dan <em>auto-complete</em> di editor kode (seperti VS Code) menjadi jauh lebih akurat.</li>
        <li><strong>Refactoring Lebih Aman:</strong> Mengubah struktur data atau interface lebih aman karena TypeScript akan memberitahu Anda semua tempat yang perlu diperbarui.</li>
      </ul>

      <h3>Contoh Kesalahan yang Dicegah TS</h3>
      <pre><code>// JavaScript Biasa
function greet(user) {
  return "Hello " + user.firstName;
}
greet({ firtName: "Budi" }); // Undefined, rawan bug karena typo

// Menggunakan TypeScript
interface User {
  firstName: string;
}
function greet(user: User) {
  return "Hello " + user.firstName;
}
// greet({ firtName: "Budi" }) -&gt; Error: Property 'firtName' does not exist.</code></pre>

      <p>Jika Anda belum menggunakan TypeScript, sekarang adalah saat yang paling tepat untuk mulai mempelajarinya.</p>
    `
  },
  {
    id: 5,
    title: "Optimasi Performa Website: Mencapai Skor Lighthouse 100",
    slug: "optimasi-performa-website-lighthouse-100",
    date: "2024-03-25",
    excerpt: "Tips dan trik praktis untuk mengoptimalkan Core Web Vitals, waktu muat halaman, dan aksesibilitas agar mendapatkan skor sempurna di Lighthouse.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    category: "Frontend Performance",
    tags: ["Performance", "SEO", "Lighthouse"],
    readingTime: "9 min read",
    author: {
      name: "Aesar Sikma",
      role: "Fullstack Developer",
      avatar: "/Img/Fotoku.jpg"
    },
    content: `
      <h2>Mengapa Performa Penting?</h2>
      <p>Waktu muat yang lama tidak hanya membuat pengguna frustrasi (meningkatkan <em>bounce rate</em>), tetapi juga berdampak buruk pada peringkat SEO website Anda di Google.</p>

      <h3>Core Web Vitals</h3>
      <p>Ada tiga metrik utama yang sangat diperhatikan oleh mesin pencari modern:</p>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> Mengukur waktu render untuk blok teks/gambar terbesar.</li>
        <li><strong>INP (Interaction to Next Paint):</strong> Mengukur waktu respons website terhadap interaksi pengguna.</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> Mengukur seberapa sering terjadi pergeseran layout yang tidak diharapkan.</li>
      </ul>

      <h3>Strategi Optimasi Next.js</h3>
      <p>Jika Anda menggunakan Next.js, Anda sudah selangkah lebih maju. Namun, tetap perhatikan hal-hal berikut:</p>
      <ol>
        <li>Gunakan komponen <code>&lt;Image&gt;</code> untuk optimasi format (WebP) dan <em>lazy-loading</em> otomatis.</li>
        <li>Gunakan fungsi font lokal (<code>next/font/google</code>) untuk menghindari <em>layout shift</em> dari font.</li>
        <li>Dynamic Imports: Load komponen (terutama modal atau chart yang berat) hanya saat dibutuhkan menggunakan <code>next/dynamic</code>.</li>
      </ol>

      <blockquote>
        "Performa adalah fitur. Website yang lambat adalah website yang rusak di mata pengguna."
      </blockquote>

      <p>Jangan lupa untuk melakukan audit berkala menggunakan Chrome DevTools Lighthouse atau PageSpeed Insights.</p>
    `
  }
];
