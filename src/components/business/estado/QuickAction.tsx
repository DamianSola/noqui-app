import type { ReactNode } from "react";

interface QuickActionProps {
  label: string;
  icon: ReactNode;
  href?: string;
}

export function QuickAction({ label, icon, href }: QuickActionProps) {
  return (
    <a
      href={href ?? "#"}
      className="
        flex flex-col items-center gap-2 p-4 rounded-2xl
        bg-neutral-50 dark:bg-neutral-800/60
        hover:bg-neutral-100 dark:hover:bg-neutral-800
        border border-neutral-200 dark:border-neutral-700
        transition-all duration-150 hover:scale-105
        text-neutral-700 dark:text-neutral-300
        text-xs font-medium
      "
    >
      <span className="text-neutral-600 dark:text-neutral-300">{icon}</span>
      {label}
    </a>
  );
}