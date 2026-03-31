"use client";

import React, { useState } from "react";
import { 
  FileText, List, Sparkles, Copy, Download, Share2, 
  Volume2, RotateCw, Check, Globe, ChevronDown 
} from "lucide-react";

interface SummaryData {
  short: string;
  detailed: string;
  keyPoints: string[];
}

interface ResultDisplayProps {
  videoId: string;
  summary: SummaryData;
  onRegenerate: () => void;
}

export default function ResultDisplay({ videoId, summary, onRegenerate }: ResultDisplayProps) {
  const [activeTab, setActiveTab] = useState<"short" | "detailed" | "points">("short");
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = () => {
    const text = activeTab === "short" ? summary.short : 
                 activeTab === "detailed" ? summary.detailed : 
                 summary.keyPoints.join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = activeTab === "short" ? summary.short : summary.detailed;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleDownload = async () => {
    const { exportToPDF } = await import("@/lib/pdf");
    await exportToPDF("summary-content", `YouTube-Summary-${videoId}`);
  };

  return (
    <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="glass-card overflow-hidden shadow-2xl">
        <div className="relative aspect-video w-full bg-slate-900">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Video preview"
            className="h-full w-full"
            allowFullScreen
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-4 bg-muted/30">
          <div className="flex bg-background/50 rounded-lg p-1 border border-border">
            <button
              onClick={() => setActiveTab("short")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "short" ? "bg-primary text-white shadow-md shadow-primary/25" : "hover:bg-muted"
              }`}
            >
              <Sparkles size={14} />
              Short AI
            </button>
            <button
              onClick={() => setActiveTab("detailed")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "detailed" ? "bg-primary text-white shadow-md shadow-primary/25" : "hover:bg-muted"
              }`}
            >
              <FileText size={14} />
              Detailed
            </button>
            <button
              onClick={() => setActiveTab("points")}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "points" ? "bg-primary text-white shadow-md shadow-primary/25" : "hover:bg-muted"
              }`}
            >
              <List size={14} />
              Key Points
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
            <button
              onClick={speak}
              className={`h-10 w-10 flex items-center justify-center rounded-lg border border-border transition-colors ${
                isSpeaking ? "bg-primary/10 text-primary border-primary/20" : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <Volume2 size={18} />
            </button>
            <button
              onClick={handleDownload}
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground"
            >
              <Download size={18} />
            </button>
            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 h-10 px-4 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500/20 transition-colors text-sm font-semibold"
            >
              <RotateCw size={16} />
              Regenerate
            </button>
          </div>
        </div>

        <div id="summary-content" className="p-8 prose prose-slate dark:prose-invert max-w-none bg-background">
          {activeTab === "short" && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                TL;DR Summary
              </h3>
              <p className="text-lg leading-relaxed text-foreground/90">
                {summary.short}
              </p>
            </div>
          )}

          {activeTab === "detailed" && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-primary" />
                In-Depth Analysis
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {summary.detailed}
              </p>
            </div>
          )}

          {activeTab === "points" && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <List size={20} className="text-primary" />
                Key Takeaways
              </h3>
              <ul className="space-y-4">
                {summary.keyPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 group">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    </div>
                    <span className="text-base text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/10 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Globe size={12} />
              Language: <span className="font-medium text-foreground">English</span>
            </span>
            <span className="flex items-center gap-1">
              <RotateCw size={12} />
              AI Model: <span className="font-medium text-foreground">Gemini 1.5 Flash</span>
            </span>
          </div>
          <p>Generated in 2.4s</p>
        </div>
      </div>
    </div>
  );
}
