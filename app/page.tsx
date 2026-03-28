"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeBanner } from "@/components/MarqueeBanner";
import { WhatIDoSection } from "@/components/WhatIDoSection";
import { AboutSection } from "@/components/AboutSection";
import { ToolkitsSection } from "@/components/ToolkitsSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { YouTubeSection } from "@/components/YouTubeSection";
import { MailingListSection } from "@/components/MailingListSection";
import { CommunitySection } from "@/components/CommunitySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTopButton } from "@/components/BackToTopButton";
import { DownloadModal } from "@/components/DownloadModal";

export default function Home() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenDownloadModal={() => setDownloadModalOpen(true)} />
      <main>
        <HeroSection onOpenDownloadModal={() => setDownloadModalOpen(true)} />
        <MarqueeBanner />
        <WhatIDoSection />
        <AboutSection />
        <ToolkitsSection />
        <ResourcesSection />
        <YouTubeSection />
        <MailingListSection />
        <CommunitySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
      <DownloadModal open={downloadModalOpen} onOpenChange={setDownloadModalOpen} />
    </>
  );
}
