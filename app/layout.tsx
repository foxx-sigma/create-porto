import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./header";
import LenisProvider from "./providers/LenisProvider";

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

            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover -z-10 fixed"
            >
              <source src="/video/bg-madara.mp4" type="video/mp4" />
            </video>

            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-black/50 -z-10"></div>

            {/* Konten */}
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
