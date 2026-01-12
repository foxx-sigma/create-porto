import Image from "next/image";
import Link from "next/link";
import { arrayPorto } from '../data/portofolio';


export default function Portofolio() {
 return (
     <main className="container mx-auto">
         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 h-screen">
           <h2 className="text-2xl font-bold tracking-tight text-center text-soft-brown">My Portofolio</h2>
         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
         {arrayPorto.map((porto, index) => (
             <div key={index} className="group relative">
                 <Link href={`/portofolio/${porto.id}`}>
                     <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-black lg:aspect-none group-hover:opacity-75 lg:h-80">
                         <Image
                           alt={porto.name}
                           src={porto.image}
                           width={100}
                           height={100}
                           unoptimized
                           className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                         />
                     </div>
                     <div className="mt-4 flex justify-between">
                         <div>
                             <h3 className="text-sm text-soft-brown">{porto.name}</h3>
                             <p className="mt-1 text-sm text-gray-300">{porto.description}</p>
                         </div>
                     </div>
                 </Link>
             </div>
         ))}
         </div>
         </div>
     </main>
 );
}
