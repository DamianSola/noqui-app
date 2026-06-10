'use client';

import { Product } from '@/types/product';
import { Edit2, Trash2, RotateCcw, Tag, Package } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onRestore: (product: Product) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);

const getTotalStock = (product: Product) =>
  product.inventory?.reduce((sum, i) => sum + i.quantity, 0) ?? null;

const SkeletonCard = () => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 animate-pulse space-y-3">
    <div className="h-4 w-3/4 rounded bg-zinc-800" />
    <div className="h-3 w-1/2 rounded bg-zinc-800" />
    <div className="h-px bg-zinc-800" />
    <div className="flex justify-between">
      <div className="h-6 w-20 rounded bg-zinc-800" />
      <div className="h-6 w-12 rounded bg-zinc-800" />
    </div>
  </div>
);

export function ProductGrid({ products, loading, onEdit, onDelete, onRestore }: ProductGridProps) {
  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 py-16">
        <Package className="mb-3 h-12 w-12 text-zinc-700" strokeWidth={1} />
        <p className="text-sm font-medium text-zinc-500">Sin productos</p>
        <p className="mt-1 text-xs text-zinc-600">Ajustá los filtros o creá un nuevo producto</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        : products.map((product) => {
            const stock = getTotalStock(product);
            const isDeleted = !!product.deletedAt;
            const isLowStock = stock !== null && stock < 5;

            return (
              <div
                key={product.id}
                className={`group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-200 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/20 ${
                  isDeleted ? 'opacity-50' : ''
                }`}
              >
                {/* Status dot */}
                <div className="absolute right-3 top-3">
                  {isDeleted ? (
                    <span className="h-2 w-2 rounded-full bg-zinc-700 block" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-emerald-400 block" />
                  )}
                </div>

                {/* Main info */}
                <div className="flex-1 pr-4">
                  <h3 className="font-medium text-zinc-100 leading-tight">{product.name}</h3>
                  {product.sku && (
                    <span className="mt-1 inline-block rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                      {product.sku}
                    </span>
                  )}
                  {product.description && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Tags */}
                {(product.productTags?.length ?? 0) > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.productTags!.slice(0, 4).map(({ tag }) => (
                      <span
                        key={tag.id}
                        className="flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400"
                      >
                        <Tag className="h-2.5 w-2.5" strokeWidth={2} />
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Divider */}
                <div className="my-3 h-px bg-zinc-800" />

                {/* Price + stock row */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-semibold text-zinc-100">
                      {formatCurrency(product.price)}
                    </p>
                    {product.taxRate > 0 && (
                      <p className="text-[10px] text-zinc-600">+ {product.taxRate}% IVA</p>
                    )}
                  </div>
                  {stock !== null && (
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${
                          stock === 0
                            ? 'text-red-400'
                            : isLowStock
                            ? 'text-amber-400'
                            : 'text-zinc-400'
                        }`}
                      >
                        {stock}
                      </p>
                      <p className="text-[10px] text-zinc-600">en stock</p>
                    </div>
                  )}
                </div>

                {/* Actions — shown on hover */}
                <div className="mt-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  {isDeleted ? (
                    <button
                      onClick={() => onRestore(product)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-1.5 text-xs text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Restaurar
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onEdit(product)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-700 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(product)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-700 text-zinc-500 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
    </div>
  );
}