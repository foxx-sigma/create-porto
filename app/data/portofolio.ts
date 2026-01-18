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
     image: "Img/GrowMate.png",
     description: "AI-based application that can identify plants.",
     category: "mobile"
   },
   {
     id: 2,
     name: "CepuIn - Aplikasi Pelaporan Infrastruktur",
     image: "Img/cepuin.png",
     description: "An application that allows citizens to report damaged infrastructure.",
     category: "mobile"
   },
   {
     id: 3,
     name: "Portofolio Website",
     image: "Img/web-porto.png",
     description: "My portfolio website which contains a little information and some projects that have been made.",
     category: "website"
   },
   {
     id: 4,
     name: "Social Media Marketing Agency",
     image: "https://i.pinimg.com/736x/a3/00/2e/a3002e3616f18160d291bcd2fe69b07e.jpg",
     description: "Socialy is a modern Social Media Marketing Agency Elementor Template Kit that perfect for creating a website for Digital Marketing Agency that specialized in Social Media Marketing.",
     category: "website"
   },
 ]
 