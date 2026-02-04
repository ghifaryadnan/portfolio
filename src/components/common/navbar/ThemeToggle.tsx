"use client";
import { Button } from "@/components/ui/button";
import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = stored ? stored === "dark" : prefers;
    setDark(next);
    setMounted(true);
    document.documentElement.classList.toggle("dark", next);
  }, []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => {
        const next = !dark;
        setDark(next);
        localStorage.setItem("theme", next ? "dark" : "light");
        document.documentElement.classList.toggle("dark", next);
      }}
    >
      {mounted ? (dark ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
