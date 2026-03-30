import { z } from "zod";

export const downloadGuideSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export const subscribeSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export const joinCommunitySchema = z.object({
firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  currentRole: z.string().min(1, "Please select your current role"),
  challenge: z.string().min(10, "Please describe your BA challenge (at least 10 characters)"),
});

export const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type DownloadGuideData = z.infer<typeof downloadGuideSchema>;
export type SubscribeData = z.infer<typeof subscribeSchema>;
export type JoinCommunityData = z.infer<typeof joinCommunitySchema>;
export type ContactData = z.infer<typeof contactSchema>;
