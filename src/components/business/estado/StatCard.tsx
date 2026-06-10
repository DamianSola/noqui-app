import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  accent: string;
  href?: string;
}

export function StatCard({ label, value, icon, accent, href }: StatCardProps) {
  return (
    <a
      href={href ?? "#"}
      className="
        group relative flex flex-col gap-4 rounded-2xl border p-5
        bg-white dark:bg-neutral-900
        border-neutral-100 dark:border-neutral-800
        hover:border-transparent dark:hover:border-transparent
        shadow-sm hover:shadow-lg dark:hover:shadow-black/40
        transition-all duration-200 cursor-pointer overflow-hidden
      "
    >
      {/* Accent glow on hover */}
      <span
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${accent} blur-2xl scale-150`}
      />

      <div className="relative z-10 flex items-start justify-between">
        <span className={`p-2 rounded-xl ${accent} text-white`}>{icon}</span>
        <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
          Ver →
        </span>
      </div>

      <div className="relative z-10">
        <p className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {value.toLocaleString("es-AR")}
        </p>
        <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
      </div>
    </a>
  );
}