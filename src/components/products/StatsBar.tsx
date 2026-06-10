'use client';

import { ProductStats } from '@/types/product';
import {
  Package,
  PackageCheck,
  PackageX,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

interface StatsBarProps {
  stats: ProductStats | null;
  loading: boolean;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);

const STAT_CARDS = (stats: ProductStats) => [
  {
    label: 'Total productos',
    value: stats.total.toString(),
    icon: Package,
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    label: 'Activos',
    value: stats.active.toString(),
    icon: PackageCheck,
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    label: 'Archivados',
    value: stats.deleted.toString(),
    icon: PackageX,
    accent: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/20',
  },
  {
    label: 'Valor inventario',
    value: formatCurrency(stats.totalInventoryValue),
    icon: DollarSign,
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    label: 'Stock bajo',
    value: stats.lowStockCount.toString(),
    icon: AlertTriangle,
    accent: stats.lowStockCount > 0 ? 'text-amber-400' : 'text-zinc-500',
    bg: stats.lowStockCount > 0 ? 'bg-amber-500/10' : 'bg-zinc-500/10',
    border: stats.lowStockCount > 0 ? 'border-amber-500/20' : 'border-zinc-500/20',
  },
];

const SkeletonCard = () => (
  <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 animate-pulse">
    <div className="h-9 w-9 rounded-lg bg-zinc-800" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-20 rounded bg-zinc-800" />
      <div className="h-5 w-14 rounded bg-zinc-700" />
    </div>
  </div>
);

export function StatsBar({ stats, loading }: StatsBarProps) {
  
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {STAT_CARDS(stats).map(({ label, value, icon: Icon, accent, bg, border }) => (
        <div
          key={label}
          className={`group flex items-center gap-3 rounded-xl border ${border} ${bg} p-4 transition-all duration-200 hover:scale-[1.02]`}
        >
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bg}`}>
            <Icon className={`h-5 w-5 ${accent}`} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-zinc-500">{label}</p>
            <p className={`mt-0.5 text-lg font-semibold leading-none ${accent}`}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}