import type { Metadata } from "next";
import { arrayPengalaman } from "@/app/data/pengalaman";
import PengalamanClient from "./PengalamanClient";

export const metadata: Metadata = {
  title: "Pengalaman — Aesar",
  description:
    "Daftar kegiatan organisasi dan pengalaman Aesar selama bersekolah di SMK Telkom Malang.",
};

export default function PengalamanPage() {
  return <PengalamanClient items={arrayPengalaman} />;
}
