"use client";

import React, { useState } from "react";
import { Search, Link as LinkIcon, Sparkles } from "lucide-react";
import ResultDisplay from "./ResultDisplay";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, length: "medium", language: "English" }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to summarize video");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      {/* Background patterns */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 opacity-20 blur-[100px] bg-gradient-to-br from-primary via-purple-500 to-transparent rounded-full" />
      
      <div className="container relative z-10 text-center">
        {!result ? (
          <>
            <div className="mx-auto mb-6 flex max-w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md">
              <Sparkles size={14} />
              <span>Summarize any video instantly with Gemini AI</span>
            </div>
            
            <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
              Watch Smarter, Not <span className="gradient-text">Harder.</span>
            </h1>
            
            <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Transform any long YouTube video into a clear, concise AI-generated summary in seconds. Save time and absorb information faster.
            </p>

            <div className="mx-auto max-w-3xl">
              <form onSubmit={handleSubmit} className="relative flex flex-col items-center gap-4 sm:flex-row">
                <div className="relative flex-1 w-full group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                    <LinkIcon size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Paste YouTube video URL here..."
                    className="h-16 w-full rounded-2xl border border-border bg-background/50 pl-12 pr-4 text-base outline-none ring-primary/20 transition-all focus:border-primary focus:ring-4 backdrop-blur-md"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-16 w-full sm:w-auto min-w-[160px] rounded-2xl bg-primary px-8 text-lg font-bold text-white shadow-xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Search size={20} />
                      Summarize
                    </>
                  )}
                </button>
              </form>
              
              {error && (
                <p className="mt-4 text-sm text-destructive font-medium bg-destructive/10 py-2 px-4 rounded-lg inline-block">
                  {error}
                </p>
              )}
              
              <p className="mt-4 text-sm text-muted-foreground">
                Try an example: <button 
                  type="button"
                  onClick={() => setUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                  className="text-primary hover:underline italic"
                >
                  youtube.com/watch?v=dQw4w9WgXcQ
                </button>
              </p>
            </div>
          </>
        ) : (
          <div className="text-left">
            <button 
              onClick={() => setResult(null)}
              className="mb-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              ← Back to Generator
            </button>
            <ResultDisplay 
              videoId={result.videoId} 
              summary={result.summary} 
              onRegenerate={() => handleSubmit({ preventDefault: () => {} } as any)} 
            />
          </div>
        )}
      </div>
    </section>
  );
}
