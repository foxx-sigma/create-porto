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

  const relatedProjects = arrayPorto
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
  );
}