import axiosInstance from '@/lib/axios';
import { getSession } from "next-auth/react";
import { ApiResponse, Business } from "@/types/business";

export const businessService = {
  getAll: async (): Promise<Business[]> => {
    const session = await getSession();
    const ownerId = session?.user?.id as string;

    if (!ownerId) {
      throw new Error("No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.");
    }

    const { data } = await axiosInstance.get<ApiResponse<Business[]>>(`/business/owner/${ownerId}`);
    return data.data;
  },

  getById: async (businessId: string): Promise<Business> => {
    const { data } = await axiosInstance.get<ApiResponse<Business>>(`/business/${businessId}`);
    return data.data;
  },

  create: async (businessData: { name: string; guests: string[]; ownerId: string }): Promise<Business> => {
    const { data } = await axiosInstance.post<ApiResponse<Business>>(`/business`, businessData);
    return data.data;
  },

  update: async (businessId: string, businessData: Partial<Business>): Promise<Business> => {
    const { data } = await axiosInstance.put<ApiResponse<Business>>(`/business/${businessId}`, businessData);
    return data.data;
  },

  delete: async (businessId: string): Promise<void> => {
    await axiosInstance.delete(`/business/${businessId}`);
  },
};