"use client";

import { useState } from "react";
import type { DashboardData, DashboardTab } from "@/types/dashboard";
import { FinancieroTab }   from "./Financierotab";
import { OperacionesTab }  from "@/ordenes/Operacionestab";
import { NegociosTab }     from "@/negocios/Negociostab";
import {
  getTotalRevenue,
  getTotalExpenses,
  getTotalPendingOrders,
  getTotalLowStock,
  formatCurrency,
} from "@/helpers/dashboard";

const TABS: { key: DashboardTab; label: string }[] = [
  { key: "financiero",   label: "Financiero"  },
  { key: "operaciones",  label: "Operaciones" },
  { key: "negocios",     label: "Negocios"    },
];

// ── Badge counter shown in tab pill ───────────────────────────────────────
function TabBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="ml-1.5 inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold leading-none">
      {count}
    </span>
  );
}

interface DashboardTabsProps {
  data: DashboardData;
}

export function DashboardTabs({ data }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("financiero");

  const lowStockAlerts  = getTotalLowStock(data.businesses);
  const pendingOrders   = getTotalPendingOrders(data.businesses);
  const totalRevenue    = getTotalRevenue(data.businesses);
  const totalExpenses   = getTotalExpenses(data.businesses);
  const netBalance      = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">
      {/* ── Summary strip above tabs ── */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span className="text-neutral-500 dark:text-neutral-400">Ingresos</span>
          <span className="font-semibold text-neutral-900 dark:text-white">{formatCurrency(totalRevenue)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
          <span className="text-neutral-500 dark:text-neutral-400">Gastos</span>
          <span className="font-semibold text-neutral-900 dark:text-white">{formatCurrency(totalExpenses)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block" />
          <span className="text-neutral-500 dark:text-neutral-400">Balance</span>
          <span className={`font-semibold ${netBalance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}>
            {formatCurrency(netBalance)}
          </span>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl w-fit">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              activeTab === key
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            {label}
            {key === "operaciones" && <TabBadge count={lowStockAlerts + pendingOrders} />}
            {key === "negocios"    && <TabBadge count={data.businesses.length} />}
          </button>
        ))}
      </div>

      {/* ── Panels ── */}
      {activeTab === "financiero"  && <FinancieroTab  data={data} />}
      {activeTab === "operaciones" && <OperacionesTab data={data} />}
      {activeTab === "negocios"    && <NegociosTab businesses={data.businesses} />}
    </div>
  );
}