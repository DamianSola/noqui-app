import type { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon: ReactNode;
  accent: string;
  sub?: string;
}

export function KpiCard({ label, value, delta, deltaPositive, icon, accent, sub }: KpiCardProps) {
  return (
    <div className="relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-5 overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${accent}`} />
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{label}</span>
        <span className={`w-8 h-8 rounded-lg ${accent} bg-opacity-15 dark:bg-opacity-20 flex items-center justify-center text-white`}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">{value}</p>
        {sub && <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{sub}</p>}
      </div>
      {delta && (
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${deltaPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
          {deltaPositive
            ? <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path d="M8 3l5 6H3l5-6z"/></svg>
            : <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path d="M8 13L3 7h10l-5 6z"/></svg>
          }
          {delta} vs mes anterior
        </span>
      )}
    </div>
  );
}