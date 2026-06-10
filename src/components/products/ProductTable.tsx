'use client';

import { Product } from '@/types/product';
import { MoreHorizontal, Edit2, Trash2, RotateCcw, Tag, Package } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ProductTableProps {
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

function ActionMenu({
  product,
  onEdit,
  onDelete,
  onRestore,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onRestore: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isDeleted = !!product.deletedAt;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
      >
        <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-50 min-w-[160px] rounded-lg border border-zinc-800 bg-zinc-950 py-1 shadow-xl">
          {!isDeleted && (
            <button
              onClick={() => { onEdit(); setOpen(false); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              <Edit2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              Editar
            </button>
          )}
          {isDeleted ? (
            <button
              onClick={() => { onRestore(); setOpen(false); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Restaurar
            </button>
          ) : (
            <button
              onClick={() => { onDelete(); setOpen(false); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              Archivar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const SkeletonRow = () => (
  <tr className="border-b border-zinc-800/60">
    {[...Array(7)].map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 rounded bg-zinc-800 animate-pulse" style={{ width: `${50 + Math.random() * 50}%` }} />
      </td>
    ))}
  </tr>
);

export function ProductTable({ products, loading, onEdit, onDelete, onRestore }: ProductTableProps) {
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
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/80">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Producto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                SKU
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-zinc-500">
                Precio
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-zinc-500">
                IVA
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-zinc-500">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Tags
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Estado
              </th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 bg-zinc-950">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
              : products.map((product) => {
                  const stock = getTotalStock(product);
                  const isDeleted = !!product.deletedAt;
                  const isLowStock = stock !== null && stock < 5;

                  return (
                    <tr
                      key={product.id}
                      className={`group transition-colors hover:bg-zinc-900/60 ${isDeleted ? 'opacity-50' : ''}`}
                    >
                      {/* Name + description */}
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-zinc-100">{product.name}</p>
                          {product.description && (
                            <p className="mt-0.5 max-w-[220px] truncate text-xs text-zinc-500">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-4 py-3">
                        {product.sku ? (
                          <span className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400">
                            {product.sku}
                          </span>
                        ) : (
                          <span className="text-zinc-700">—</span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3 text-right tabular-nums text-zinc-200">
                        {formatCurrency(product.price)}
                      </td>

                      {/* Tax rate */}
                      <td className="px-4 py-3 text-right tabular-nums">
                        {product.taxRate > 0 ? (
                          <span className="text-zinc-400">{product.taxRate}%</span>
                        ) : (
                          <span className="text-zinc-700">—</span>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-3 text-right tabular-nums">
                        {stock === null ? (
                          <span className="text-zinc-700">—</span>
                        ) : (
                          <span
                            className={`font-medium ${
                              isLowStock
                                ? 'text-amber-400'
                                : stock === 0
                                ? 'text-red-400'
                                : 'text-zinc-300'
                            }`}
                          >
                            {stock}
                            {isLowStock && (
                              <span className="ml-1 text-[10px] text-amber-500">↓</span>
                            )}
                          </span>
                        )}
                      </td>

                      {/* Tags */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {product.productTags?.length ? (
                            product.productTags.slice(0, 3).map(({ tag }) => (
                              <span
                                key={tag.id}
                                className="flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
                              >
                                <Tag className="h-2.5 w-2.5" strokeWidth={2} />
                                {tag.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-zinc-700">—</span>
                          )}
                          {(product.productTags?.length ?? 0) > 3 && (
                            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-500">
                              +{product.productTags!.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        {isDeleted ? (
                          <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-500">
                            Archivado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Activo
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <ActionMenu
                          product={product}
                          onEdit={() => onEdit(product)}
                          onDelete={() => onDelete(product)}
                          onRestore={() => onRestore(product)}
                        />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}