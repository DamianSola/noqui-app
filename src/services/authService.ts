import axiosInstance from '@/lib/axios';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  accessToken?: string;
}

// class AuthService {
//   // async login(loginData: LoginData): Promise<User> {
//   //   const { data } = await axiosInstance.post('/api/auth/login', loginData);
//   //   return data;
//   // }

//   // async register(registerData: RegisterData): Promise<User> {
//   //   const { data } = await axiosInstance.post('/api/auth/register', registerData);
//   //   return data;
//   // }

//   async getCurrentUser(): Promise<User> {
    
//     
//   }

//   // async logout(): Promise<void> {
//   //   // Si tu backend tiene endpoint de logout
//   //   try {
//   //     await axiosInstance.post('/auth/logout');
//   //   } catch (error) {
//   //     console.log('Logout from backend failed, continuing with client logout');
//   //   }
//   // }
// }

// export const authService = new AuthService();

import { getSession } from "next-auth/react";

export async function getCurrentUser() {
        try {
            const { data } = await axiosInstance.get('/auth/me');
            const user = data.data.user; // Ajusta según la estructura de tu respuesta
            return user;
        

           
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
}