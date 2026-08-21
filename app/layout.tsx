import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./header";
import LenisProvider from "./providers/LenisProvider";
import ConstellationBackground from "./components/ConstellationBackground";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portofolio | Aesar",
  description: "Portofolio Aesar — Fullstack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <LenisProvider>
          {/* Wrapper Background */}
          <div className="relative min-h-screen w-screen overflow-hidden">

            {/* Constellation Background — rendered first, z-index 0 via fixed canvas */}
            <ConstellationBackground />

            {/* Konten — z-index di atas canvas */}
            <Header />
            <main className="relative z-10">
              {children}
            </main>

          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
