import type { BusinessSummary } from "@/types/dashboard";
import {
  formatCurrency,
  formatDelta,
  isDeltaPositive,
  getInitials,
} from "@/helpers/dashboard";

const ACCENT_COLORS = [
  { ring: "border-violet-500",  bg: "bg-violet-500",  text: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" },
  { ring: "border-emerald-500", bg: "bg-emerald-500", text: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" },
  { ring: "border-sky-500",     bg: "bg-sky-500",     text: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300" },
  { ring: "border-amber-500",   bg: "bg-amber-500",   text: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
];

interface BusinessCardProps {
  business: BusinessSummary;
  accentIndex: number;
}

function BusinessCard({ business: b, accentIndex }: BusinessCardProps) {
  const accent  = ACCENT_COLORS[accentIndex % ACCENT_COLORS.length];
  const balance = b.monthlyRevenue - b.monthlyExpenses;
  const delta   = formatDelta(b.monthlyRevenue, b.prevMonthRevenue);
  const positive = isDeltaPositive(b.monthlyRevenue, b.prevMonthRevenue);

  return (
    <a
      href={`/negocios/${b.id}`}
      className={`
        group relative flex flex-col gap-4 rounded-2xl bg-white dark:bg-neutral-900
        border border-neutral-100 dark:border-neutral-800
        hover:border-transparent dark:hover:border-transparent
        hover:shadow-lg dark:hover:shadow-black/30
        transition-all duration-200 p-5 overflow-hidden cursor-pointer
      `}
    >
      {/* left accent border */}
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${accent.bg} rounded-l-2xl`} />

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center text-white text-sm font-semibold shrink-0`}>
          {getInitials(b.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-neutral-900 dark:text-white truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {b.name}
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">/{b.slug}</p>
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors shrink-0">
          Ver →
        </span>
      </div>

      {/* Revenue + delta */}
      <div>
        <p className="text-xl font-semibold text-neutral-900 dark:text-white tracking-tight">
          {formatCurrency(b.monthlyRevenue)}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-xs font-medium flex items-center gap-0.5 ${positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
            {positive
              ? <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5"><path d="M8 3l5 6H3l5-6z"/></svg>
              : <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5"><path d="M8 13L3 7h10l-5 6z"/></svg>
            }
            {delta}
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">vs mes anterior</span>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
        <div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Balance</p>
          <p className={`text-sm font-semibold ${balance >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
            {formatCurrency(balance)}
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Clientes</p>
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{b.customerCount}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Pendientes</p>
          <p className={`text-sm font-semibold ${b.pendingOrders > 10 ? "text-amber-600 dark:text-amber-400" : "text-neutral-800 dark:text-neutral-200"}`}>
            {b.pendingOrders}
          </p>
        </div>
      </div>

      {/* Alerts */}
      {b.lowStockCount > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400 font-medium">
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0">
            <path fillRule="evenodd" d="M6.257 1.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H2.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-1-6a1 1 0 00-1 1v2a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {b.lowStockCount} producto{b.lowStockCount > 1 ? "s" : ""} bajo stock mínimo
        </div>
      )}

      {/* Guests */}
      {b.guests.length > 0 && (
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          {b.guests.length} colaborador{b.guests.length > 1 ? "es" : ""}
        </p>
      )}
    </a>
  );
}

interface NegociosTabProps {
  businesses: BusinessSummary[];
}

export function NegociosTab({ businesses }: NegociosTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.map((b, i) => (
          <BusinessCard key={b.id} business={b} accentIndex={i} />
        ))}
      </div>
      <a
        href="/negocios/nuevo"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-400 dark:text-neutral-500 hover:border-violet-400 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
        </svg>
        Agregar nuevo negocio
      </a>
    </div>
  );
}