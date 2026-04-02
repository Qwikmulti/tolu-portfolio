"use client";

import { ReactNode } from "react";
import { ToastProvider } from "@/components/admin/Toast";

export function Providers({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
