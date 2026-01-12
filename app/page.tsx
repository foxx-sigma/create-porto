import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-neutral-900 sm:items-start">
   <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center sm:items-start mb-12 w-full">

  {/* AVATAR */}
  <div className="relative w-60 h-60 sm:w-50 sm:h-50 rounded-full bg-gradient-to-tr ">
    <div className="w-full h-full rounded-full bg-black overflow-hidden">
      <Image
        src="/Img/Fotoku.jpg"
        alt="Profile"
        fill
        className="object-cover rounded-full"
      />
    </div>
  </div>

  {/* TEKS */}
  <div className="flex flex-col gap-6 text-center sm:text-left">
    <h1 className="text-4xl font-montserrat font-bold text-black dark:text-zinc-50">
      Aesar Sikma
    </h1>

    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
      Looking for a starting point or more instructions? Head over to{" "}
      <a className="font-medium text-zinc-950 dark:text-zinc-50">Templates</a>{" "}
      or the{" "}
      <a className="font-medium text-zinc-950 dark:text-zinc-50">Learning</a>{" "}
      center.
    </p>
  </div>

</div>


      </main>
    </div>
  );
}
