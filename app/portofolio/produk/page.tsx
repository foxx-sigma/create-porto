import { arrayPorto } from "../../data/portofolio";
import PortfolioClient from "./PortofolioClient";

export default function PortfolioProdukPage() {
  return <PortfolioClient projects={arrayPorto} />;
}
