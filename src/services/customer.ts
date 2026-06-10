import axios from "axios";
import axiosInstance from "@/lib/axios";
import { getSession } from "next-auth/react";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getCustomerbyOwner = async (ownerId: string) => {
//   console.log(`${API}/customer/owner/${ownerId}`);
  // const config = token ? {
  //     headers: { Authorization: `Bearer ${token}` }
  //   } : {};

  const { data } = await axiosInstance.get(
    `${API}/customers/owner/${ownerId}` //MODIFICAR LUEGO ESTA RUTA
  );

  console.log("Fetched customers:", data);
  return data;
};


export const addCustomer = async (businessData: { 
  name: string, businessId:string, phone:string | null, email:string, ownerId: string }) => {
 
  const { data } = await axiosInstance.post(
    `${API}/customers`, //MODIFICAR LUEGO ESTA RUTA
    businessData
  );

  console.log("Create customer response:", data);

  return data.data;
} 


export const getBusinessById = async (bussinesId: string) => {
  try {
    const response = await axiosInstance.get(`${API}/customer/${bussinesId}`);
    
    console.log("Fetched business:", response.data); // Debug log
    
    return response.data;

  } catch (error) {
    console.error("Error fetching business:", error);
    
  }
}

export const editBusiness = async () => {
  
}
 

    