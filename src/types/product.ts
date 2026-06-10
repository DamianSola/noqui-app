export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface ProductTag {
  id: string;
  tagId: string;
  productId: string;
  tag: Tag;
}

export interface StatsResponse {
  data: ProductStats;
  success: boolean;
}
export interface ProductStats {
  total: number;
  active: number;
  deleted: number;
  totalInventoryValue: number;
  lowStockCount: number;
}

export interface InventoryItem {
  id: string;
  quantity: number;
  locationId?: string;
  location?: { name: string };
}

export interface StockMovement {
  id: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  createdAt: string;
}

export interface Product {
  id: string;
  sku?: string | null;
  name: string;
  description?: string | null;
  price: number;
  taxRate: number;
  businessId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  productTags?: ProductTag[];
  inventory?: InventoryItem[];
  stockMovements?: StockMovement[];
}

export interface CreateProductDto {
  sku?: string;
  name: string;
  description?: string;
  price: number;
  taxRate?: number;
  businessId: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  tagId?: string;
  includeDeleted?: boolean;
  sortBy?: 'name' | 'price' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedProducts {
  data: Product[];
  pagination: Pagination;
}

export interface ProductStats {
  total: number;
  active: number;
  deleted: number;
  totalInventoryValue: number;
  lowStockCount: number;
}

export type ViewMode = 'table' | 'grid';

export type SortField = 'name' | 'price' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

// export interface Business {
//   id: string;
//   name: string;
//   description?: string | null;
// }