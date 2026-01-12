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
     name: "Kupa - Food Delivery App",
     image: "https://i.pinimg.com/564x/71/99/ce/7199ceaf6deb560080ac0de71bec0e2d.jpg",
     description: "Kupa is a Premium Food Delivery App UI Kit consisting of 80+ pixel-perfect screens and easy to use in Figma.",
     category: "mobile"
   },
   {
     id: 2,
     name: "Bakery shopping application",
     image: "https://i.pinimg.com/564x/56/07/51/56075169f3befff95331d31bce2dd121.jpg",
     description: "UI/UX,Web Design,Figma,Adobe Illustrator,Adobe XD,Adobe Photoshop.",
     category: "mobile"
   },
   {
     id: 3,
     name: "Echofy – Environment, Ecology & Solar Energy",
     image: "https://i.pinimg.com/736x/a9/be/c1/a9bec1cd989fa24fe67a2d41e779f8ce.jpg",
     description: "Echofy Nature HTML Template is created to help you make world’s environment cleaner and save the nature.",
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
 