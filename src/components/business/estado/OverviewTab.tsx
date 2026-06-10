import type { Business } from "@/types/business.ts";
import { buildStats, formatDate } from "@/helpers/business";
import { StatCard } from "./StatCard";
import { QuickAction } from "./QuickAction";
import { Avatar } from "./Avatar";

// ── Inline SVG icons ────────────────────────────────────────────────────────
const icons: Record<string, React.ReactNode> = {
  customers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  products: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  inventory: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  suppliers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  supplyOrders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  tags: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  expenses: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
};

const QUICK_ACTIONS = [
  { label: "Clientes",   key: "customers"   },
  { label: "Productos",  key: "products"    },
  { label: "Órdenes",    key: "orders"      },
  { label: "Inventario", key: "inventory"   },
  { label: "Proveedores",key: "suppliers"   },
  { label: "Compras",    key: "supplyOrders"},
  { label: "Agenda",     key: "calendar"    },
  { label: "Reportes",   key: "reports"     },
  { label: "Etiquetas",  key: "tags"        },
  { label: "Gastos",     key: "expenses"    },
] as const;

const INFO_LABEL =
  "text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500";
const INFO_CARD =
  "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-3";

interface OverviewTabProps {
  business: Business;
}

export function OverviewTab({ business }: OverviewTabProps) {
  const stats = buildStats(business.id, business._count);

  return (
    <div className="space-y-8">
      {/* Metrics */}
      <section>
        <h2 className={`${INFO_LABEL} mb-4`}>Métricas generales</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              accent={s.accent}
              href={s.href}
              icon={icons[Object.keys(icons)[i]]}
            />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className={`${INFO_LABEL} mb-4`}>Acciones rápidas</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3">
          {QUICK_ACTIONS.map(({ label, key }) => (
            <QuickAction
              key={key}
              label={label}
              icon={icons[key]}
              href={`/negocios/${business.id}/${key}`}
            />
          ))}
        </div>
      </section>

      {/* Info cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Owner */}
        <div className={INFO_CARD}>
          <h3 className={INFO_LABEL}>Propietario</h3>
          <div className="flex items-center gap-3">
            <Avatar seed={business.ownerId} size="md" />
            <div>
              <p className="text-sm font-semibold">Usuario principal</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                {business.ownerId}
              </p>
            </div>
          </div>
        </div>

        {/* Identifiers */}
        <div className={INFO_CARD}>
          <h3 className={INFO_LABEL}>Identificadores</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">ID interno</p>
              <p className="text-sm font-mono truncate">{business.id}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Slug de URL</p>
              <p className="text-sm font-mono text-violet-600 dark:text-violet-400">
                /{business.slug}
              </p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className={INFO_CARD}>
          <h3 className={INFO_LABEL}>Fechas</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Creación</p>
              <p className="text-sm font-medium">{formatDate(business.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Última actualización</p>
              <p className="text-sm font-medium">{formatDate(business.updatedAt)}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}