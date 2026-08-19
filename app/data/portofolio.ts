export type ProjectStatus = string; // isi bebas per project, mis. "Completed", "In Progress", "Beta"

export interface ProjectFeature {
  title: string;
  description: string;
  icon: string; // SVG path string, konsisten dengan pola icon "Key Features"
}

export interface PortofolioItem {
  id: number;
  name: string;
  image: string;
  description: string;
  status: ProjectStatus;  // per-project, tidak lagi hardcode "Completed"
  overview: string;       // paragraf overview asli per project
  tools: string[];        // daftar tools/tech stack asli per project
  features: ProjectFeature[]; // BARU — unik per project, TIDAK boleh sama antar project
}


export const arrayPorto: PortofolioItem[] = [
  {
    id: 1,
    name: "GrowMate - Menanam Cerdas, dengan AI",
    image: "/img/produk/GrowMate.png",
    description: "AI-based application that can identify plants.",
    status: "Completed",      // TODO: isi manual
    overview: "",             // TODO: isi manual
    tools: [],                // TODO: isi manual
    features: [],             // TODO: isi manual, fitur harus unik per project
  },
  {
    id: 2,
    name: "CepuIn - Aplikasi Pelaporan Infrastruktur",
    image: "/img/produk/cepuin.png",
    description: "An application that allows citizens to report damaged infrastructure.",
    status: "Completed",      // TODO: isi manual
    overview: "",             // TODO: isi manual
    tools: [],                // TODO: isi manual
    features: [],             // TODO: isi manual, fitur harus unik per project
  },
  {
    id: 3,
    name: "Local Taste Hub",
    image: "/img/produk/Tastehub.png",
    description: "Platform web responsif yang menyajikan rekomendasi kuliner di wilayah Malang, dilengkapi dengan integrasi peta interaktif lokasi restoran dan manajemen sistem pemesanan",
    status: "Completed",      // TODO: isi manual
    overview: "",             // TODO: isi manual
    tools: [],                // TODO: isi manual
    features: [],             // TODO: isi manual, fitur harus unik per project
  },
  {
    id: 4,
    name: "TEFA Moklet",
    image: "/img/produk/TEFA.png",
    description: "Portal portofolio digital institusi (Teaching Factory) yang dirancang untuk memamerkan lebih dari 50+ proyek siswa kepada mitra industri dan perusahaan.",
    status: "Completed",      // TODO: isi manual
    overview: "",             // TODO: isi manual
    tools: [],                // TODO: isi manual
    features: [],             // TODO: isi manual, fitur harus unik per project
  },
]
