import type { BusinessCount } from "@/types/business.ts";

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" }).format(
    new Date(iso)
  );
}

/** Returns a deterministic Tailwind bg class based on the last char of the seed string. */
export function getAvatarColor(seed: string): string {
  const palette = [
    "bg-violet-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-sky-500",
  ];
  return palette[seed.charCodeAt(seed.length - 1) % palette.length];
}

export interface StatConfig {
  label: string;
  value: number;
  accent: string;
  href: string;
}

export function buildStats(
  id: string,
  count: BusinessCount
): StatConfig[] {
  return [
    { label: "Clientes",        value: count.customers,     accent: "bg-violet-500",  href: `/negocios/${id}/clientes` },
    { label: "Productos",       value: count.products,      accent: "bg-sky-500",     href: `/negocios/${id}/productos` },
    { label: "Órdenes activas", value: count.orders,        accent: "bg-emerald-500", href: `/negocios/${id}/ordenes` },
    { label: "Inventario",      value: count.inventory,     accent: "bg-amber-500",   href: `/negocios/${id}/inventario` },
    { label: "Proveedores",     value: count.suppliers,     accent: "bg-rose-500",    href: `/negocios/${id}/proveedores` },
    { label: "Órdenes compra",  value: count.supplyOrders,  accent: "bg-indigo-500",  href: `/negocios/${id}/compras` },
    { label: "Eventos",         value: count.calendarEvents,accent: "bg-teal-500",    href: `/negocios/${id}/agenda` },
    { label: "Reportes",        value: count.reports,       accent: "bg-orange-500",  href: `/negocios/${id}/reportes` },
    { label: "Etiquetas",       value: count.tags,          accent: "bg-pink-500",    href: `/negocios/${id}/etiquetas` },
    { label: "Gastos",          value: count.expenses,      accent: "bg-cyan-500",    href: `/negocios/${id}/gastos` },
  ];
}

export const ACTIVITY_EVENTS = [
  { action: "Nueva orden creada",    detail: 'Orden #0092 por $18.400',       time: "hace 2h", dot: "bg-emerald-500" },
  { action: "Producto actualizado",  detail: 'Tornillo galvanizado 3/8"',      time: "hace 5h", dot: "bg-sky-500"     },
  { action: "Gasto registrado",      detail: "Electricidad – $12.300",         time: "hace 1d", dot: "bg-amber-500"   },
  { action: "Proveedor agregado",    detail: "Metalúrgica Norte S.A.",         time: "hace 2d", dot: "bg-rose-500"    },
  { action: "Reporte generado",      detail: "Ventas mayo 2025",               time: "hace 3d", dot: "bg-violet-500"  },
  { action: "Evento en agenda",      detail: "Reunión con proveedor",          time: "hace 4d", dot: "bg-teal-500"    },
];