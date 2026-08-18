export type ProjectType = "Prototype" | "Development" | "Produk";
export type ProjectStatus = string; // isi bebas per project, mis. "Completed", "In Progress", "Beta"

export interface PortofolioItem {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;       // tetap: "mobile" | "website"
  type: ProjectType;      // BARU: Prototype | Development | Produk
  status: ProjectStatus;  // BARU: per-project, tidak lagi hardcode "Completed"
  overview: string;       // BARU: paragraf overview asli per project
  tools: string[];        // BARU: daftar tools/tech stack asli per project
}


export const arrayPorto: PortofolioItem[] = [
  {
    id: 1,
    name: "GrowMate - Menanam Cerdas, dengan AI",
    image: "/img/produk/GrowMate.png",
    description: "AI-based application that can identify plants.",
    category: "mobile",
    type: "Development",      // TODO: isi manual
    status: "Completed",      // TODO: isi manual
    overview: "",             // TODO: isi manual
    tools: [],                // TODO: isi manual
  },
  {
    id: 2,
    name: "CepuIn - Aplikasi Pelaporan Infrastruktur",
    image: "/img/produk/cepuin.png",
    description: "An application that allows citizens to report damaged infrastructure.",
    category: "mobile",
    type: "Development",      // TODO: isi manual
    status: "Completed",      // TODO: isi manual
    overview: "",             // TODO: isi manual
    tools: [],                // TODO: isi manual
  },
  {
    id: 3,
    name: "Local Taste Hub",
    image: "/img/produk/Tastehub.png",
    description: "Platform web responsif yang menyajikan rekomendasi kuliner di wilayah Malang, dilengkapi dengan integrasi peta interaktif lokasi restoran dan manajemen sistem pemesanan",
    category: "website",
    type: "Development",      // TODO: isi manual
    status: "Completed",      // TODO: isi manual
    overview: "",             // TODO: isi manual
    tools: [],                // TODO: isi manual
  },
  {
    id: 4,
    name: "TEFA Moklet",
    image: "/img/produk/TEFA.png",
    description: "Portal portofolio digital institusi (Teaching Factory) yang dirancang untuk memamerkan lebih dari 50+ proyek siswa kepada mitra industri dan perusahaan.",
    category: "website",
    type: "Development",      // TODO: isi manual
    status: "Completed",      // TODO: isi manual
    overview: "",             // TODO: isi manual
    tools: [],                // TODO: isi manual
  },
]
