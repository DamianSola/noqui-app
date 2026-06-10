import { useState, useCallback, useEffect, useRef } from 'react';
import { productService } from '@/services/productService';
import {
  Product,
  ProductFilters,
  PaginatedProducts,
  ProductStats,
  CreateProductDto,
  UpdateProductDto,
} from '@/types/product';

interface UseProductsReturn {
  products: Product[];
  stats: ProductStats | null;
  pagination: PaginatedProducts['pagination'] | null;
  loading: boolean;
  statsLoading: boolean;
  error: string | null;
  filters: ProductFilters;
  page: number;
  setPage: (p: number) => void;
  setFilters: (f: Partial<ProductFilters>) => void;
  resetFilters: () => void;
  refetch: () => void;
  createProduct: (dto: CreateProductDto) => Promise<Product>;
  updateProduct: (id: string, dto: UpdateProductDto) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  restoreProduct: (id: string) => Promise<void>;
}

const DEFAULT_FILTERS: ProductFilters = {
  search: '',
  includeDeleted: false,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const LOW_STOCK_THRESHOLD = 5;

export function useProducts(limit = 12): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [pagination, setPagination] = useState<PaginatedProducts['pagination'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFiltersState] = useState<ProductFilters>(DEFAULT_FILTERS);

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchProducts = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const result = await productService.getAll(page, limit, filters);
      setProducts(result.data);
      setPagination(result.pagination);
    } catch (err) {
      if ((err as Error).name !== 'CanceledError') {
        setError((err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters]);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const s = await productService.getStats();
      const data: ProductStats = s;
      setStats(data);
    } catch(error) {
      console.warn('Failed to fetch product stats', error);
      // Stats are non-critical; fail silently
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Debounce when search changes
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchProducts();
    }, filters.search ? 350 : 0);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetchProducts, filters.search]);

  // Immediate fetch for non-search filter changes
  useEffect(() => {
    if (!filters.search) fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters.sortBy, filters.sortOrder, filters.includeDeleted, filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const setFilters = useCallback((partial: Partial<ProductFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const createProduct = useCallback(async (dto: CreateProductDto) => {
    const created = await productService.create(dto);
    await Promise.all([fetchProducts(), fetchStats()]);
    return created;
  }, [fetchProducts, fetchStats]);

  const updateProduct = useCallback(async (id: string, dto: UpdateProductDto) => {
    const updated = await productService.update(id, dto);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await productService.softDelete(id);
    await Promise.all([fetchProducts(), fetchStats()]);
  }, [fetchProducts, fetchStats]);

  const restoreProduct = useCallback(async (id: string) => {
    await productService.restore(id);
    await Promise.all([fetchProducts(), fetchStats()]);
  }, [fetchProducts, fetchStats]);

  return {
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
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct,
  };
}