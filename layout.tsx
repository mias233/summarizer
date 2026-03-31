import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SummZ AI - Premium YouTube Summarizer",
  description: "Generate high-quality, AI-powered summaries for any YouTube video in seconds. Perfect for students, professionals, and lifelong learners.",
  keywords: ["youtube summarizer", "ai summary", "video transcription", "learning tool", "productivity"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
