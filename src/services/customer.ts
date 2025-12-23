import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getCustomerbyOwner = async (ownerId: string, token?: string) => {
//   console.log(`${API}/customer/owner/${ownerId}`);
  const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {};

  const { data } = await axios.get(
    `${API}/customers/owner/${ownerId}` , //MODIFICAR LUEGO ESTA RUTA
    config
  );

  console.log("Fetched customers:", data);
  return data;
};


export const createBusiness = async (businessData: { name: string; guests: string[], ownerId: string }, token: string) => {
  console.log("Creating business with data:", businessData);
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const { data } = await axios.post(
    `${API}/customer`, //MODIFICAR LUEGO ESTA RUTA
    businessData,
    config
  );
  return data;
} 


export const getBusinessById = async (bussinesId: string) => {
  try {
    const response = await axios.get(`${API}/customer/${bussinesId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching business:", error);
    
  }
}

export const editBusiness = async () => {
  
}
 

    