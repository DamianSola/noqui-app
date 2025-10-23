"use client";

import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  // null = todavía no cargó (evita flicker)
  const [theme, setTheme] = useState<Theme | null>(null);

  // inicializa una sola vez
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored ?? (prefersDark ? "dark" : "light");

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    if (!theme) return; // si no está inicializado, no hacemos nada
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }, [theme]);

  return { theme, toggleTheme };
}
