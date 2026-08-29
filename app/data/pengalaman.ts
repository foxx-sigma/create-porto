export interface PengalamanItem {
  id: number;               
  nama: string;             
  tahun?: string;           
  gambar: string;           
  deskripsiSingkat: string; 
  deskripsiLengkap: string[]; 
  linkDokumentasi?: {       
    label: string;          
    url: string;            
  };
}

export const arrayPengalaman: PengalamanItem[] = [
  {
    id: 1,
    nama: "Program Lead - Moklet Victory Program 2026",
    tahun: "Maret 2026",
    gambar: "/img/pengalaman/saqu.jpeg", 
    deskripsiSingkat:
      "Memimpin dan mengoordinasikan tim beranggotakan 20 orang dari berbagai divisi dalam merencanakan serta melaksanakan Moklet Victory Program, hingga seluruh rangkaian acara berhasil berjalan dengan lancar sampai selesai.",
    deskripsiLengkap: [
      "Sebagai Program Lead, saya memimpin tim yang terdiri dari 20 anggota dari berbagai divisi untuk merencanakan dan melaksanakan Moklet Victory Program. Saya bertanggung jawab dalam mengoordinasikan pembagian tugas, timeline, rapat, serta komunikasi antardivisi selama proses persiapan hingga pelaksanaan acara.",
      "Dalam prosesnya, terdapat beberapa rencana yang harus disesuaikan karena tidak dapat berjalan sesuai dengan perencanaan awal. Saya bersama tim melakukan penyesuaian dan mencari solusi agar setiap bagian dari program tetap dapat berjalan dengan baik. Pada akhirnya, seluruh rangkaian Moklet Victory Program dapat terlaksana dengan lancar hingga acara selesai.",
    ],
    linkDokumentasi: {
      label: "Tonton di YouTube",
      url: "https://www.youtube.com/live/BiJXU7v_Jug?si=HgACaoq_1nKVGy0N", 
    },
  },
  {
    id: 2,
    nama: "Public Health Outreach Volunteer - Puskesmas Rampal Celaket",
    tahun: "Juni 2025",
    gambar: "/img/pengalaman/ramket.jpeg", 
    deskripsiSingkat:
      "Mendukung program penjangkauan masyarakat dengan mendokumentasikan kegiatan serta mencatat data pengunjung/pasien secara akurat untuk keperluan administratif.",
    deskripsiLengkap: [
      "Berkontribusi sebagai volunteer dalam kegiatan penyuluhan dengan menangani dokumentasi kegiatan dan pengelolaan data pasien yang hadir. Bertanggung jawab dalam melakukan pencatatan serta input data secara terstruktur dan akurat untuk mendukung kebutuhan administrasi kegiatan. Pengalaman ini juga melatih ketelitian dalam mengelola informasi, kemampuan bekerja secara terorganisir, serta koordinasi dalam mendukung kelancaran kegiatan di lapangan.",
    ],
  },
  {
    id: 3,
    nama: "Tilawah - Tasyakuran Dies Natalis ke-33 SMK Telkom Malang",
    tahun: "September 2026",
    gambar: "/img/pengalaman/tasyakuran.png",
    deskripsiSingkat:
      "Bertugas menjadi pembaca tilawah dalam acara Tasyakuran Dies Natalis ke-33 SMK Telkom Malang, membacakan ayat suci Al-Qur'an dengan tartil di hadapan seluruh pengunjung.",
    deskripsiLengkap: [
      "Menjadi pembaca tilawah pada acara Tasyakuran Dies Natalis ke-33 SMK Telkom Malang merupakan pengalaman yang berharga. Saya dipercaya untuk membacakan ayat-ayat suci Al-Qur'an dengan tartil di hadapan seluruh pengunjung, termasuk Bapak Kepala Sekolah, Bapak Ibu Guru, Tamu Undangan, dan seluruh siswa. Acara ini menjadi momen penting untuk mensyukuri nikmat dan keberkahan yang telah diberikan kepada SMK Telkom Malang selama 33 tahun.",
      "Melalui kesempatan ini, saya belajar untuk mengendalikan rasa gugup dan fokus pada keindahan lantunan ayat suci. Selain itu, pengalaman ini juga memperkuat rasa cinta saya terhadap Al-Qur'an dan kebanggaan sebagai bagian dari keluarga besar SMK Telkom Malang. Dengan iringan doa dan lantunan ayat suci, kami memohon agar SMK Telkom Malang senantiasa diberikan keberkahan, kemajuan, dan keberhasilan di masa mendatang.",
    ],
    linkDokumentasi: {
      label: "Tonton di YouTube",
      url: "https://www.youtube.com/live/KCckJ2HxvGY?si=JX-fhgrAf4anT-8L", 
    },
  },
  {
    id: 4,
    nama: "Tilawah - Demo Day MIC 2025",
    tahun: "Juni 2025",
    gambar: "/img/pengalaman/demo day.png",
    deskripsiSingkat:
      "Bertugas menjadi pembaca tilawah dalam acara Demo Day MIC 2025, membacakan ayat suci Al-Qur'an dengan tartil di hadapan seluruh pengunjung.",
    deskripsiLengkap: [
      "Menjadi pembaca tilawah pada acara Demo Day MIC 2025 merupakan pengalaman yang berharga bagi saya. Saya dipercaya untuk membacakan ayat-ayat suci Al-Qur'an dengan tartil sebagai bagian dari rangkaian pembukaan acara. Kesempatan ini menjadi pengalaman yang berkesan karena saya dapat berkontribusi dalam mengawali kegiatan dengan lantunan ayat suci Al-Qur'an di hadapan para peserta dan tamu undangan.",
      "Melalui kesempatan ini, saya belajar untuk mengendalikan rasa gugup, menjaga fokus, dan membawakan tilawah dengan penuh ketenangan serta tanggung jawab. Selain itu, pengalaman ini meningkatkan kepercayaan diri saya untuk tampil di hadapan banyak orang. Menjadi pembaca tilawah dalam Demo Day MIC 2025 merupakan pengalaman yang bermakna dan membanggakan bagi saya.",
    ],
    linkDokumentasi: {
      label: "Tonton di YouTube",
      url: "https://www.youtube.com/live/cLSGVSkwkuM?si=8FfEvRiNP4S80RE3", 
    },
  },
  {
    id: 5,
    nama:"Moklet Serve 2025",
    tahun:"September 2025",
    gambar:"/img/pengalaman/moklet-serve.jpg",
    deskripsiSingkat:
    "Moklet Serve merupakan program pengabdian masyarakat yang melibatkan siswa-siswi SMK Telkom Malang dalam penerapan keterampilan digital dan kepedulian sosial melalui pemberian materi edukasi bagi murid Sekolah Dasar.",
    deskripsiLengkap:[
    "Moklet Serve merupakan program pengabdian masyarakat yang melibatkan siswa-siswi SMK Telkom Malang untuk berkontribusi secara langsung kepada masyarakat melalui kegiatan edukasi bagi murid Sekolah Dasar. Dalam program ini, siswa terlibat dalam mempersiapkan dan menyampaikan materi yang dikemas secara interaktif agar mudah dipahami dan menarik bagi peserta didik. Kegiatan ini menjadi wadah untuk berbagi pengetahuan sekaligus memperkenalkan keterampilan digital kepada generasi muda sejak dini.",
    "Selain memberikan manfaat bagi peserta didik, Moklet Serve juga menjadi pengalaman bagi siswa untuk mengembangkan kemampuan komunikasi, kerja sama tim, kreativitas, dan tanggung jawab. Melalui keterlibatan langsung dalam kegiatan sosial, program ini mendorong siswa untuk menerapkan pengetahuan yang dimiliki sekaligus membangun kepedulian terhadap lingkungan dan masyarakat sekitar.",
    ],
    linkDokumentasi: {
      label: "Tonton di Instagram",
      url: "https://www.instagram.com/reel/DPVPD6zAUSm/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA=="
    }
  }
];
