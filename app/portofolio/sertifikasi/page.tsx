import { arraySertifikasi } from "../../data/sertifikasi";
import SertifikasiClient from "./SertifikasiClient";

export default function SertifikasiPage() {
  return <SertifikasiClient certificates={arraySertifikasi} />;
}
