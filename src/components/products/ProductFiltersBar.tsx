'use client';

import { useRef } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { ProductFilters, SortField, SortOrder, ViewMode } from '@/types/product';

interface ProductFiltersBarProps {
  filters: ProductFilters;
  viewMode: ViewMode;
  onFiltersChange: (partial: Partial<ProductFilters>) => void;
  onReset: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onAddNew: () => void;
}

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'createdAt', label: 'Más recientes' },
  { value: 'name', label: 'Nombre A–Z' },
  { value: 'price', label: 'Precio' },
  // { value: 'updatedAt', label: 'Última actualización' },
];

export function ProductFiltersBar({
  filters,
  viewMode,
  onFiltersChange,
  onReset,
  onViewModeChange,
  onAddNew,
}: ProductFiltersBarProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  const hasActiveFilters =
    !!filters.search ||
    !!filters.minPrice ||
    !!filters.maxPrice ||
    !!filters.tagId ||
    filters.includeDeleted;

  const toggleSortOrder = () => {
    onFiltersChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <div className="space-y-3">
      {/* Row 1: Search + actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            strokeWidth={1.5}
          />
          <input
            ref={searchRef}
            type="text"
            placeholder="Buscar por nombre o SKU…"
            value={filters.search ?? ''}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-9 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onFiltersChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Sort select */}
          <select
            value={filters.sortBy ?? 'createdAt'}
            onChange={(e) => onFiltersChange({ sortBy: e.target.value as SortField })}
            className="h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-300 focus:border-zinc-600 focus:outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Sort order toggle */}
          <button
            onClick={toggleSortOrder}
            title={filters.sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-colors"
          >
            <span className={`text-base transition-transform ${filters.sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'}`}>
              ↑
            </span>
          </button>

          {/* View mode */}
          <div className="flex rounded-lg border border-zinc-800 overflow-hidden">
            <button
              onClick={() => onViewModeChange('table')}
              className={`flex h-10 w-10 items-center justify-center text-sm transition-colors ${
                viewMode === 'table'
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
              }`}
              title="Vista tabla"
            >
              ☰
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`flex h-10 w-10 items-center justify-center text-sm transition-colors ${
                viewMode === 'grid'
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
              }`}
              title="Vista grilla"
            >
              ⊞
            </button>
          </div>

          {/* Add button */}
          <button
            onClick={onAddNew}
            className="flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-200 transition-colors"
          >
            <span className="text-base leading-none">+</span>
            <span className="hidden sm:inline">Nuevo producto</span>
          </button>
        </div>
      </div>

      {/* Row 2: Extra filters */}
      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-600" strokeWidth={1.5} />

        {/* Min/Max price */}
        <div className="flex items-center gap-1">
          <input
            type="number"
            placeholder="Precio min"
            value={filters.minPrice ?? ''}
            onChange={(e) =>
              onFiltersChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })
            }
            className="h-8 w-28 rounded-md border border-zinc-800 bg-zinc-900 px-2 text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
          <span className="text-zinc-600">–</span>
          <input
            type="number"
            placeholder="Precio max"
            value={filters.maxPrice ?? ''}
            onChange={(e) =>
              onFiltersChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })
            }
            className="h-8 w-28 rounded-md border border-zinc-800 bg-zinc-900 px-2 text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
        </div>

        {/* Include deleted toggle */}
        <button
          onClick={() => onFiltersChange({ includeDeleted: !filters.includeDeleted })}
          className={`flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs transition-colors ${
            filters.includeDeleted
              ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
              : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
          }`}
        >
          {filters.includeDeleted ? (
            <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
          ) : (
            <EyeOff className="h-3.5 w-3.5" strokeWidth={1.5} />
          )}
          Archivados
        </button>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex h-8 items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-xs text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
          >
            <RotateCcw className="h-3 w-3" strokeWidth={2} />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}