import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getCompanyByOwnerId = async (ownerId: string, token?: string) => {
  console.log(`${API}/business/owner/${ownerId}`);
  const config = token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {};

  const { data } = await axios.get(
    `${API}/business/owner/${ownerId}` , //MODIFICAR LUEGO ESTA RUTA
    config
  );
  return data;
};


export const createBusiness = async (businessData: { name: string; guests: string[] }, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const { data } = await axios.post(
    `${API}/business`, //MODIFICAR LUEGO ESTA RUTA
    businessData,
    config
  );
  return data;
} 
