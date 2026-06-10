'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import { Product } from '@/types/product';

interface DeleteConfirmModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteConfirmModal({
  open,
  product,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) setError(null);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, loading]);

  const handleConfirm = async () => {
    if (!product) return;
    setLoading(true);
    setError(null);
    try {
      await onConfirm(product.id);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !loading && onClose()}
      />
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
              <AlertTriangle className="h-5 w-5 text-amber-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">Archivar producto</h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                ¿Archivar{' '}
                <span className="font-medium text-zinc-300">{product.name}</span>? El
                producto quedará inactivo pero podrás restaurarlo más adelante.
              </p>
            </div>
          </div>
          <button
            onClick={() => !loading && onClose()}
            className="ml-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-600 hover:text-zinc-400 transition-colors"
            disabled={loading}
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {error && (
          <div className="mx-6 mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-zinc-800 px-6 py-4">
          <button
            onClick={() => !loading && onClose()}
            disabled={loading}
            className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-amber-400 active:bg-amber-600 transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Archivar
          </button>
        </div>
      </div>
    </div>
  );
}