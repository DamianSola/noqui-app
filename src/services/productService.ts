import axiosInstance from '@/lib/axios';
import { getSession } from 'next-auth/react';

import {
  Product,
  CreateProductDto,
  UpdateProductDto,
  PaginatedProducts,
  ProductFilters,
  ProductStats,
  StatsResponse,
} from '@/types/product';

const API = process.env.NEXT_PUBLIC_API_URL;

 const session = await getSession();

  const businessId = session?.user?.id;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const cleanFilters = (filters?: ProductFilters) => {
  if (!filters) return {};
  return Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== '')
  );
};

// ─── Service ──────────────────────────────────────────────────────────────────

export const productService = {
  /**
   * Obtener listado paginado de productos.
   * El token se inyecta automáticamente via el interceptor de lib/axios.ts
   */
  getAll: async (
    page = 1,
    limit = 12,
    filters?: ProductFilters
  ): Promise<PaginatedProducts> => {

   

    const { data } = await axiosInstance.get<PaginatedProducts>(`${API}/products`, {
      params: { page, limit, ...cleanFilters(filters) },
    });
    console.log('Fetched products:', data);
    return data;
  },

  /**
   * Obtener stats del módulo (total, activos, eliminados, stock bajo)
   */
  getStats: async (): Promise<ProductStats> => {
    const { data } = await axiosInstance.get<StatsResponse>('/products/stats'); //// revisar endpoint
    return data.data;
  },

  /**
   * Obtener producto por ID (incluye inventory y tags)
   */
  getById: async (id: string): Promise<Product> => {
    const { data } = await axiosInstance.get<Product>(`/products/${id}`);
    return data;
  },

  /**
   * Crear nuevo producto
   */
  create: async (payload: CreateProductDto): Promise<Product> => {

    const { data } = await axiosInstance.post<Product>(`${API}/products`, { ...payload });
    return data;
  },

  /**
   * Actualizar producto
   */
  update: async (id: string, payload: UpdateProductDto): Promise<Product> => {
    const { data } = await axiosInstance.patch<Product>(`${API}/products/${id}`, payload);
    return data;
  },

  /**
   * Soft delete (establece deletedAt)
   */
  softDelete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`);
  },

  /**
   * Restaurar producto eliminado
   */
  restore: async (id: string): Promise<Product> => {
    const { data } = await axiosInstance.patch<Product>(`/products/${id}/restore`);
    return data;
  },

  /**
   * Eliminar permanentemente
   */
  hardDelete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/products/${id}/hard`);
  },
};