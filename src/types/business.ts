import {BusinessRawResult} from "@/types/dashboard";
import { ApiOrder, ApiExpense, ApiInventoryItem, ApiSupplier, ApiCustomer, ApiUser } from "@/types/dashboard";

export interface BusinessCount {
  customers: number;
  products: number;
  orders: number;
  inventory: number;
  suppliers: number;
  supplyOrders: number;
  calendarEvents: number;
  reports: number;
  tags: number;
  expenses: number;
}



export interface Business {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  guests: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  _count: BusinessCount;
  length?: number; // Agrega esta propiedad opcional
  BusinessRawResult?: BusinessRawResult; // Agrega esta propiedad opcional
}

export type BusinessTab = "overview" | "team" | "activity";

export interface ActivityEvent {
  action: string;
  detail: string;
  time: string;
  dot: string;
}

// En tu archivo types/api.ts
import { AxiosRequestConfig } from 'axios';

// export interface ApiResponse<Business> {
//   config: AxiosRequestConfig;
//   data: {
//     success: boolean;
//     data: Business;
//     length?: number; // Agrega esta propiedad opcional si esperas un array
//     map: any;
//     forEach: any;
//   };
//   headers: Record<string, string>;
//   request: any;
//   status: number;
//   statusText: string;
// }

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Para usar con tus datos específicos
export interface ProductStatsResponse {
  total: number;
  activos: number;
  inactivos: number;
}

// Ejemplo de uso
// const response: ApiResponse<ProductStatsResponse> = await api.get('/products/stats');
// const stats = response.data.data; // ProductStatsResponse
// const isSuccess = response.data.success; // boolean