export type ProjectStatus = string; // isi bebas per project, mis. "Completed", "In Progress", "Beta"

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface PortofolioItem {
  id: number;
  name: string;
  image: string;
  description: string;
  status: ProjectStatus;  // per-project, tidak lagi hardcode "Completed"
  overview: string;       // paragraf overview asli per project
  tools: string[];        // daftar tools/tech stack asli per project
  features: ProjectFeature[]; // isi manual per project
}


export const arrayPorto: PortofolioItem[] = [
  {
    id: 1,
    name: "GrowMate - Menanam Cerdas, dengan AI",
    image: "/img/produk/GrowMate.png",
    description: "AI-based application that can identify plants.",
    status: "Completed",      
    overview: "",             
    tools: [],                
    features: [],             
  },
  {
    id: 2,
    name: "MockeT",
    image: "/img/produk/MockeT.png",
    description: "An application that allows citizens to report damaged infrastructure.",
    status: "Running",      
    overview: "",             
    tools: ["Laravel", "MySQL", "NextJS", "Tailwind CSS", "Lenis", "Shadcn/UI"],                  
    features: [
      {
        title: "Multi-role authentication",
        description: "Deskripsi fitur di sini",
      },
      {
        title: "Role-based Dashboard",
        description: "Deskripsi fitur di sini",
      },
      {
        title: "Refund Request Management",
        description: "Deskripsi fitur di sini",
      }
    ],
  },
  {
    id: 3,
    name: "Local Taste Hub",
    image: "/img/produk/Tastehub.png",
    description: "Platform web responsif yang menyajikan rekomendasi kuliner di wilayah Malang, dilengkapi dengan integrasi peta interaktif lokasi restoran dan manajemen sistem pemesanan",
    status: "Completed",      
    overview: "",             
    tools: [],                
    features: [],             
  },
  {
    id: 4,
    name: "TEFA Moklet",
    image: "/img/produk/TEFA.png",
    description: "Portal portofolio digital institusi (Teaching Factory) yang dirancang untuk memamerkan lebih dari 50+ proyek siswa kepada mitra industri dan perusahaan.",
    status: "Completed",      
    overview: "",             
    tools: [],                
    features: [],             
  },
]
