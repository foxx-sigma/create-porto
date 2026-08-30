export interface CertificateItem {
  id: number;
  name: string;
  image: string;
  issuer: string;  
  date: string;    
}

export const arraySertifikasi: CertificateItem[] = [
  {
    id: 1,
    name:"Competency Certificate",
    image: "/img/sertifikat/Sertif Fullstack.jpeg",
    issuer:"SMK Telkom Malang",
    date:"Juni 2026"  ,
  },
  {
    id: 2,
    name:"SQL Basic Certificate",
    image:"/img/sertifikat/sql-hackerrank.png",
    issuer:"Hackerrank",
    date:"Agustus 2026",
  },
  {
    id: 3,
    name:"JavaScript Basic Certificate",
    image: "/img/sertifikat/Javascript Basic.png",
    issuer:"Hackerrank",
    date:"Agustus 2026"  ,
  },
  {
    id: 4,
    name:"Spec-Driven Development with Kiro",
    image: "/img/sertifikat/spec-driven.png",
    issuer:"Dicoding",
    date:"July 2026"  ,
  },
  {
    id: 5,
    name: "TOEFL Participant",
    image: "/img/sertifikat/peserta TOEFL.png",
    issuer:"Brighten English Kediri Pare ",
    date:"August 2024"  ,
  },
  {
    id: 6,
    name: "Top Memorizer Qur'an Student",
    image: "/img/sertifikat/top-memorizer.png",
    issuer:"SMP Modern Al-rifa'ie",
    date:"School Year 2023/2024"  ,
  },
  {
    id: 7,
    name:"Qur'an Memorizing Student",
    image:"/img/sertifikat/5juz.png",
    issuer:"SMP Modern Al-rifa'ie",
    date:"School Year 2022/2023"  ,
  },
  {
    id: 8,
    name: "Gold Medal Islamic Religious Education Olympiad",
    image: "/img/sertifikat/olimpiade.jpeg",
    issuer: "Olimpiade Indonesia & Liga Olimpiade",
    date: "October 2025",
  },
  {
    id: 9,
    name:"Cyber Security Awareness",
    image: "/img/sertifikat/cyber.png",
    issuer:"SMK Telkom Malang",
    date:"Mei 2024"  ,
  },
   {
    id: 10,
    name:"Cyber Security Awareness",
    image: "/img/sertifikat/cyber.png",
    issuer:"SMK Telkom Malang",
    date:"Mei 2024"  ,
  }
];
