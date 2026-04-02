"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JoinWebinarData, joinWebinarSchema } from "@/lib/validations";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Video } from "lucide-react";

interface JoinWebinarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinWebinar({ open, onOpenChange }: JoinWebinarProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<JoinWebinarData>({
    resolver: zodResolver(joinWebinarSchema),
  });

  const onSubmit = async (data: JoinWebinarData) => {
    // Honeypot check - bot detected if field is filled
    const honeypotField = document.querySelector("input[name='website']") as HTMLInputElement;
    if (honeypotField?.value) {
      // Bot detected - fake success
      setSuccess(true);
      setMessage("You're registered! We'll send you the webinar link soon.");
      reset();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/join-webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      const result = await res.json();
      setSuccess(true);
      setMessage(result.message || "You're registered! We'll send you the webinar link soon.");
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
      setMessage("");
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-2xl font-bold text-navy">
            {success ? "You're All Set! 🎉" : "Join Our Free Webinar"}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-charcoal/60">
              {message}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-charcoal/50 mb-4">
              Register now to get access to our upcoming free webinar session.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot - hidden from users, bots will fill it */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px]"
                onChange={() => {}}
              />
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
                loadingText="Registering..."
                className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold"
              >
                <Video className="w-4 h-4 mr-2" />
                Join Free Webinar
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
