import type { DashboardData } from "@/types/dashboard";
import { formatCurrency, getTotalPendingOrders, getTotalLowStock } from "@/helpers/dashboard";
import { KpiCard } from "@/components/dashboard/KpiCard";

interface OperacionesTabProps {
  data: DashboardData;
}

export function OperacionesTab({ data }: OperacionesTabProps) {
  const totalPending  = getTotalPendingOrders(data.businesses);
  const totalLowStock = getTotalLowStock(data.businesses);
  const totalSuppliers = data.businesses.reduce((s, b) => s + b.activeSuppliers, 0);

  return (
    <div className="space-y-6">
      {/* KPIs operativos */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <KpiCard
          label="Órdenes pendientes"
          value={String(totalPending)}
          accent="bg-amber-500"
          sub="en todos los negocios"
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          }
        />
        <KpiCard
          label="Alertas de stock bajo"
          value={String(totalLowStock)}
          accent="bg-rose-500"
          sub="productos bajo mínimo"
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          }
        />
        <KpiCard
          label="Proveedores activos"
          value={String(totalSuppliers)}
          accent="bg-sky-500"
          sub="entre todos los negocios"
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
          }
        />
      </div>

      {/* Stock alerts + Pending per business */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Stock crítico */}
        <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-5">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Productos bajo stock mínimo
          </h3>
          <div className="space-y-1">
            {data.stockAlerts.map((a, i) => {
              const pct = Math.round((a.quantity / a.minStock) * 100);
              const isCritical = pct <= 15;
              return (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                  <div
                    className={`w-1.5 h-8 rounded-full shrink-0 ${
                      isCritical ? "bg-rose-500" : "bg-amber-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                      {a.productName}
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">{a.businessName}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-semibold ${isCritical ? "text-rose-500 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"}`}>
                      {a.quantity} / {a.minStock}
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">{pct}% del mínimo</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Órdenes pendientes por negocio */}
        <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-5">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Órdenes pendientes por negocio
          </h3>
          <div className="space-y-3">
            {data.businesses.map((b) => {
              const maxPending = Math.max(...data.businesses.map((x) => x.pendingOrders));
              const pct = maxPending > 0 ? (b.pendingOrders / maxPending) * 100 : 0;
              return (
                <div key={b.id}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate max-w-[60%]">
                      {b.name}
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {b.pendingOrders} órdenes
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400 dark:bg-amber-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Revenue por negocio */}
          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
              Ingresos del mes por negocio
            </h4>
            {data.businesses.map((b) => (
              <div key={b.id} className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300 truncate max-w-[60%]">
                  {b.name}
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {formatCurrency(b.monthlyRevenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}