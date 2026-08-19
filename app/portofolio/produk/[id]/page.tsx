import { arrayPorto } from "@/app/data/portofolio";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = arrayPorto.find((p) => p.id === parseInt(id));

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailClient project={project} />
  );
}
