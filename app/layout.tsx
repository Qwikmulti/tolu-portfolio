import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Practical BA with Tolu | Business Analyst Educator & Community",
  description:
    "Tolulope is a Senior BA with 6+ years helping aspiring Business Analysts build skills, access resources, and grow their careers.",
  openGraph: {
    title: "Practical BA with Tolu",
    description: "Simplifying Business Analysis. Empowering Careers.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-outfit antialiased">{children}</body>
    </html>
  );
}
