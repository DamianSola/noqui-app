"use client";

import { useState } from "react";
import type { Business, BusinessTab } from "@/types/business.ts";
import { OverviewTab } from "./estado/OverviewTab";
import { TeamTab } from "./estado/TeamTab";
import { ActivityTab } from "./estado/ActivityTab";

const TABS: { key: BusinessTab; label: string }[] = [
  { key: "overview",  label: "Resumen"    },
  { key: "team",      label: "Equipo"     },
  { key: "activity",  label: "Actividad"  },
];

interface BusinessTabsProps {
  business: Business;
}

export function BusinessTabs({ business }: BusinessTabsProps) {
  const [activeTab, setActiveTab] = useState<BusinessTab>("overview");

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl w-fit">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              activeTab === key
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Panels */}
      {activeTab === "overview"  && <OverviewTab business={business} />}
      {activeTab === "team"      && <TeamTab business={business} />}
      {activeTab === "activity"  && <ActivityTab />}
    </div>
  );
}