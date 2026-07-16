export interface PortofolioItem {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string
}


export const arrayPorto: PortofolioItem[] = [
  {
    id: 1,
    name: "GrowMate - Menanam Cerdas, dengan AI",
    image: "/Img/GrowMate.png",
    description: "AI-based application that can identify plants.",
    category: "mobile"
  },
  {
    id: 2,
    name: "CepuIn - Aplikasi Pelaporan Infrastruktur",
    image: "/Img/cepuin.png",
    description: "An application that allows citizens to report damaged infrastructure.",
    category: "mobile"
  },
  {
    id: 3,
    name: "Local Taste Hub",
    image: "/Img/Tastehub.png",
    description: "Platform web responsif yang menyajikan rekomendasi kuliner di wilayah Malang, dilengkapi dengan integrasi peta interaktif lokasi restoran dan manajemen sistem pemesanan",
    category: "website"
  },
  {
    id: 4,
    name: "TEFA Moklet",
    image: "/Img/TEFA.png",
    description: "Portal portofolio digital institusi (Teaching Factory) yang dirancang untuk memamerkan lebih dari 50+ proyek siswa kepada mitra industri dan perusahaan.",
    category: "website"
  },
]
