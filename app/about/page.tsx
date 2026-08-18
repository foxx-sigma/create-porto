import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Me — Aesar",
  description:
    "Kenali lebih dekat Aesar — Front-End Developer yang bersemangat membangun antarmuka web yang elegan dan responsif.",
};

export default function AboutPage() {
  return <AboutClient />;
}
