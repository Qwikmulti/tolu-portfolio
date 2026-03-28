"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadGuideData, downloadGuideSchema } from "@/lib/validations";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download } from "lucide-react";

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DownloadModal({ open, onOpenChange }: DownloadModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DownloadGuideData>({
    resolver: zodResolver(downloadGuideSchema),
  });

  const onSubmit = async (data: DownloadGuideData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/download-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      const { downloadUrl } = await res.json();
      setSuccess(true);
      window.open(downloadUrl, "_blank");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      setSuccess(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-2xl font-bold text-navy">
            {success ? "You're All Set! 🎉" : "Get Your Free BA Starter Guide"}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-charcoal/60">
              Your guide is on its way to your inbox! Click the link to download instantly.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-charcoal/50 mb-4">
              What&apos;s inside the guide:
            </p>
            <ul className="text-sm space-y-2.5 mb-6">
              {[
                "The 5 core skills every BA needs",
                "How to write a winning BRD",
                "Template for stakeholder interviews",
                "Top 10 BA tools & how to use them",
                "Career path roadmap for new BAs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-charcoal/70">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">
                  Your Name
                </label>
                <input
                  {...register("name")}
                  placeholder="Tolulope"
                  className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all text-charcoal text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide mb-1.5 block">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-electric focus:ring-2 focus:ring-electric/10 outline-none transition-all text-charcoal text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Sending..."
                className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Send Me The Guide
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
