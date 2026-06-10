
'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { StatsBar } from '@/components/products/StatsBar';
import { ProductFiltersBar } from '@/components/products/ProductFiltersBar';
import { ProductTable } from '@/components/products/ProductTable';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFormModal } from '@/components/products/ProductFormModal';
import { DeleteConfirmModal } from '@/components/products/DeleteConfirmModal';
import { Pagination } from '@/components/products/Pagination';
import { Product, ViewMode } from '@/types/product';
import { AlertCircle, RefreshCw } from 'lucide-react';

const PAGE_SIZE = 12;

export default function ProductosPage() {
  const {
    products,
    stats,
    pagination,
    loading,
    statsLoading,
    error,
    filters,
    page,
    setPage,
    setFilters,
    resetFilters,
    refetch,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct,
  } = useProducts(PAGE_SIZE);

  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // Modals
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    setDeletingProduct(product);
  };

  const handleRestore = async (product: Product) => {
    await restoreProduct(product.id);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteClose = () => {
    setDeletingProduct(null);
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* Page header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
                Productos
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Administrá tu catálogo, precios y stock
              </p>
            </div>
          </div>

          {/* Stats */}
          <StatsBar stats={stats} loading={statsLoading} />

          {/* Error banner */}
          {error && (
            <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" strokeWidth={1.5} />
                <p className="text-sm text-red-300">{error}</p>
              </div>
              <button
                onClick={refetch}
                className="flex items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <RefreshCw className="h-3 w-3" strokeWidth={2} />
                Reintentar
              </button>
            </div>
          )}

          {/* Filters */}
          <ProductFiltersBar
            filters={filters}
            viewMode={viewMode}
            onFiltersChange={setFilters}
            onReset={resetFilters}
            onViewModeChange={setViewMode}
            onAddNew={handleAddNew}
            
            
          />

          {/* Product list */}
          {viewMode === 'table' ? (
            <ProductTable
              products={products}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRestore={handleRestore}
            />
          ) : (
            <ProductGrid
              products={products}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRestore={handleRestore}
            />
          )}

          {/* Pagination */}
          {pagination && !loading && (
            <Pagination
              page={page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={PAGE_SIZE}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

      {/* Modals — rendered outside the scroll container */}
      <ProductFormModal
        open={formOpen}
        product={editingProduct}
        onClose={handleFormClose}
        onCreate={createProduct}
        onUpdate={updateProduct}
      />

      <DeleteConfirmModal
        open={!!deletingProduct}
        product={deletingProduct}
        onClose={handleDeleteClose}
        onConfirm={deleteProduct}
      />
    </>
  );
}
