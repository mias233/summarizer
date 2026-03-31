"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Youtube, Sun, Moon, LayoutDashboard, LogIn } from "lucide-react";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const html = document.querySelector("html");
    if (isDarkMode) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/25">
            <Youtube size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            SummZ<span className="gradient-text">.AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Testimonials
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <LayoutDashboard size={14} />
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <button className="hidden md:flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            Get Started
          </button>
          
          <button className="flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            <LogIn size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
