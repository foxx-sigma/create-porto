import { arrayPorto } from "../data/portofolio";
import PortfolioClient from "./PortofolioClient";

export default function PortfolioPage() {
  return <PortfolioClient projects={arrayPorto} />;
}