"use client";

import { useEffect, useRef } from "react";
import type { DashboardData } from "@/types/dashboard";
import {
  formatCurrency,
  formatDelta,
  isDeltaPositive,
  getTotalRevenue,
  getTotalExpenses,
  getTotalPrevRevenue,
  getNetBalance,
} from "@/helpers/dashboard";
import { KpiCard } from "./KpiCard";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendiente",
  COMPLETED: "Completada",
  CANCELED: "Cancelada",
};
const STATUS_CLASS: Record<string, string> = {
  PENDING:   "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  COMPLETED: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  CANCELED:  "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
};

interface FinancieroTabProps {
  data: DashboardData;
}

export function FinancieroTab({ data }: FinancieroTabProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<unknown>(null);

  const totalRevenue  = getTotalRevenue(data.businesses);
  const totalExpenses = getTotalExpenses(data.businesses);
  const prevRevenue   = getTotalPrevRevenue(data.businesses);
  const netBalance    = getNetBalance(data.businesses);
  const margin        = totalRevenue > 0 ? ((netBalance / totalRevenue) * 100).toFixed(1) : "0";

  // ── Chart.js ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;

    if (chartRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (chartRef.current as any).destroy();
    }

    chartRef.current = new ChartJS(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.monthlySeries.map((p) => p.month),
        datasets: [
          {
            label: "Ingresos",
            data: data.monthlySeries.map((p) => p.revenue),
            backgroundColor: "#1D9E75",
            borderRadius: 5,
            borderSkipped: false,
          },
          {
            label: "Gastos",
            data: data.monthlySeries.map((p) => p.expenses),
            backgroundColor: isDark ? "#3C3489" : "#AFA9EC",
            borderRadius: 5,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx: { parsed: { y: number }; dataset: { label: string } }) =>
                ` ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString("es-AR")}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
              font: { size: 11 },
            },
          },
          y: {
            border: { display: false },
            grid: { color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
            ticks: {
              color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
              font: { size: 11 },
              callback: (v: number) => "$" + (v / 1000).toFixed(0) + "k",
            },
          },
        },
      },
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (chartRef.current) (chartRef.current as any).destroy();
    };
  }, [data.monthlySeries]);

  // ── Expense bar widths ─────────────────────────────────────────────────────
  const maxExpense = Math.max(...data.expenseByCategory.map((e) => e.amount));

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard
          label="Ingresos del mes"
          value={formatCurrency(totalRevenue)}
          delta={formatDelta(totalRevenue, prevRevenue)}
          deltaPositive={isDeltaPositive(totalRevenue, prevRevenue)}
          accent="bg-emerald-500"
          icon={<svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>}
        />
        <KpiCard
          label="Gastos del mes"
          value={formatCurrency(totalExpenses)}
          accent="bg-rose-500"
          sub="todos los negocios"
          icon={<svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"/></svg>}
        />
        <KpiCard
          label="Balance neto"
          value={formatCurrency(netBalance)}
          deltaPositive={netBalance >= 0}
          accent={netBalance >= 0 ? "bg-sky-500" : "bg-rose-500"}
          sub={`margen ${margin}%`}
          icon={<svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/></svg>}
        />
        <KpiCard
          label="Negocios activos"
          value={String(data.businesses.length)}
          accent="bg-violet-500"
          sub={`${data.businesses.reduce((s, b) => s + b.customerCount, 0)} clientes en total`}
          icon={<svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/></svg>}
        />
      </div>

      {/* Chart + Expenses breakdown */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Ingresos vs Gastos — últimos 6 meses
            </h3>
            <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                Ingresos
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-violet-300 dark:bg-violet-800 inline-block" />
                Gastos
              </span>
            </div>
          </div>
          <div className="relative h-48">
            <canvas ref={canvasRef} aria-label="Gráfico de ingresos y gastos mensuales de todos los negocios" role="img">
              Serie de ingresos y gastos de los últimos 6 meses.
            </canvas>
          </div>
        </div>

        {/* Expenses by category */}
        <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-5">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Gastos por categoría
          </h3>
          <div className="space-y-3">
            {data.expenseByCategory.map((e) => (
              <div key={e.category}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">{e.category}</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{formatCurrency(e.amount)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(e.amount / maxExpense) * 100}%`,
                      backgroundColor: e.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">Total gastos</span>
            <span className="font-semibold text-neutral-900 dark:text-white">{formatCurrency(totalExpenses)}</span>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Órdenes recientes
          </h3>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">todos los negocios</span>
        </div>
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {data.recentOrders.map((o) => (
            <div key={o.id} className="flex items-center gap-3 py-2.5">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-600 dark:text-neutral-300 shrink-0">
                {o.customerName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">{o.customerName}</p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">{o.businessName} · {o.id}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  ${o.total.toLocaleString("es-AR")}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_CLASS[o.status]}`}>
                  {STATUS_LABEL[o.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}