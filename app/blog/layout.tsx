"use client";
import { useState } from "react";
import { BlogNavbar } from "@/components/BlogNavbar";
import { JoinWebinar } from "@/components/JoinWebinar";
import { DownloadModal } from "@/components/DownloadModal";
import { Footer } from "@/components/Footer";


export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [webinarModalOpen, setWebinarModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <>
      <BlogNavbar
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        onOpenWebinarModal={() => setWebinarModalOpen(true)}
      />
      {children}
      <Footer />
      <JoinWebinar open={webinarModalOpen} onOpenChange={setWebinarModalOpen} />
      <DownloadModal open={downloadModalOpen} onOpenChange={setDownloadModalOpen} />
    </>
  );
}
