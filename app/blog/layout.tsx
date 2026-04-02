import type { Metadata } from "next";
import { Footer } from "@/components/Footer";


export const metadata: Metadata = {
  title: "Blog | Tolu Olatunji - Business Analyst",
  description: "Practical tips, frameworks, and real-world advice for aspiring and established Business Analysts.",
};

export default function BlogLayout({

  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  {children}
  <Footer />

  </>;
}