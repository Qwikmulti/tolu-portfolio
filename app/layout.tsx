import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PageTransition } from "./components/PageTransition";
import { FontLoader } from "@/components/FontLoader";

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
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Practical BA with Tolu",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tolulope (Tolu)",
    "jobTitle": "Senior Business Analyst",
    "description": "Senior Business Analyst with 6+ years helping aspiring BAs build skills and grow their careers.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://practicalbacommunity.com",
    "sameAs": [
      "https://youtube.com/@PracticalBA",
      "https://instagram.com/PracticalBAcommunity",
      "https://facebook.com/PracticalBAcommunity",
    ],
    "knowsAbout": ["Business Analysis", "Requirements Engineering", "Stakeholder Management", "BA Training"],
    "areaServed": "Worldwide",
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F1F3D" />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"}`}
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"}');
            `,
          }}
        />
      </head>
      <body className="font-outfit antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FontLoader>
          <PageTransition>{children}</PageTransition>
        </FontLoader>
      </body>
    </html>
  );
}
