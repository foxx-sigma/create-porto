export interface CertificateItem {
  id: number;
  name: string;
  image: string;
  issuer: string;  // penyelenggara/lembaga
  date: string;    // isi bebas, mis. "2024" atau "Januari 2024"
}

export const arraySertifikasi: CertificateItem[] = [
  {
    id:1,
    name:"Spec-Driven Development with Kiro",
    image: "/img/sertifikat/Sertif Fullstack.jpeg",
    issuer:"SMK Telkom Malang",
    date:"Juni 2026"  ,
  }
  // TODO: isi manual — tambahkan data sertifikat di sini, contoh:
  // {
  //   id: 1,
  //   name: "Nama Sertifikat",
  //   image: "/Img/sertifikat/nama-file.png",
  //   issuer: "Nama Lembaga / Penyelenggara",
  //   date: "Januari 2024",
  // },
];
