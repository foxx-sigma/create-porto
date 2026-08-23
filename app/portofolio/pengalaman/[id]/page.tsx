import type { Metadata } from "next";
import { arrayPengalaman } from "@/app/data/pengalaman";
import { notFound } from "next/navigation";
import PengalamanDetailClient from "./PengalamanDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = arrayPengalaman.find((p) => p.id === parseInt(id));
  if (!item) return { title: "Tidak Ditemukan — Aesar" };
  return {
    title: `${item.nama} — Aesar`,
    description: item.deskripsiSingkat,
  };
}

export default async function PengalamanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = arrayPengalaman.find((p) => p.id === parseInt(id));

  if (!item) {
    notFound();
  }

  return <PengalamanDetailClient item={item} />;
}
