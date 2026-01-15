import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-transparent px-4">
      <main className="flex min-h-screen w-full max-w-7xl flex-col items-center justify-center py-24 px-10 bg-white dark:bg-transparent backdrop-blur-sm rounded-2xl sm:items-start">

        <div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start w-full">

          {/* AVATAR */}
          <div className="relative w-56 h-56 rounded-full overflow-hidden ring-2 ring-white/10">
            <Image
              src="/Img/Fotoku.jpg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* TEKS */}
          <div className="flex flex-col gap-6 text-center sm:text-left">
            
            {/* NAME */}
            <h1 className="font-sans text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Aesar Sikma
            </h1>

            {/* DESCRIPTION */}
            <p className="font-sans max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Nothing Here
            
            </p>

          </div>
        </div>

      </main>
    </div>
  );
}
