"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeBanner } from "@/components/MarqueeBanner";
import { StatsSection } from "./components/StatsSection";
import { WhatIDoSection } from "@/components/WhatIDoSection";
import { LogoStrip } from "@/components/LogoStrip";
import { AboutSection } from "@/components/AboutSection";
import { ToolkitsSection } from "@/components/ToolkitsSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { YouTubeSection } from "@/components/YouTubeSection";
import { MailingListSection } from "@/components/MailingListSection";
import { CommunitySection } from "@/components/CommunitySection";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { FAQSection } from "@/app/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTopButton } from "@/components/BackToTopButton";
import { DownloadModal } from "@/components/DownloadModal";
import { PWAProvider } from "@/app/components/PWAProvider";
import { Analytics } from "@/components/Analytics";
import { EventTracking } from "@/components/EventTracking";
import { CustomCursor } from "./components/CustomCursor";
import { MicroInteractions } from "./components/MicroInteractions";

export default function Home() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <MicroInteractions />
      <PWAProvider />
      <Analytics />
      <EventTracking />
      <Navbar onOpenDownloadModal={() => setDownloadModalOpen(true)} />
      <main>
        <HeroSection onOpenDownloadModal={() => setDownloadModalOpen(true)} />
        <MarqueeBanner />
        <StatsSection />
        <WhatIDoSection />
        <LogoStrip />
        <AboutSection />
        <ToolkitsSection />
        <ResourcesSection />
        <YouTubeSection />
        <MailingListSection />
        <CommunitySection />
        <TestimonialsCarousel />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
      <DownloadModal open={downloadModalOpen} onOpenChange={setDownloadModalOpen} />
    </>
  );
}
