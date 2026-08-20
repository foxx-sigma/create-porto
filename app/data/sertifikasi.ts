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
    name:"Competency Certificate",
    image: "/img/sertifikat/Sertif Fullstack.jpeg",
    issuer:"SMK Telkom Malang",
    date:"Juni 2026"  ,
  },
  {
    id: 2,
    name:"Cyber Security Awareness",
    image: "/img/sertifikat/cyber.png",
    issuer:"SMK Telmkom Malang",
    date:"Mei 2024"  ,
  },
  {
    id: 3,
    name:"Spec-Driven Development with Kiro",
    image: "/img/sertifikat/spec-driven.png",
    issuer:"Dicoding",
    date:"July 2026"  ,
  },
  {
    id: 4,
    name: "TOEFL Participant",
    image: "/img/sertifikat/peserta TOEFL.png",
    issuer:"Brighten English Kediri Pare ",
    date:"August 2024"  ,
  },
  {
    id: 5,
    name: "Top Memorizer Qur'an Student",
    image: "/img/sertifikat/top-memorizer.png",
    issuer:"SMP Modern Al-rifa'ie",
    date:"School Year 2023/2024"  ,
  },
  {
    id:6,
    name:"Qur'an Memorizing Student",
    image:"/img/sertifikat/5juz.png",
    issuer:"SMP Modern Al-rifa'ie",
    date:"School Year 2022/2023"  ,
  },
  {
    id: 7,
    name: "Gold Medal Islamic Religious Education Olympiad",
    image: "/img/sertifikat/Olimpiade.jpeg",
    issuer: "Olimpiade Indonesia & Liga Olimpiade",
    date: "October 2025",
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
