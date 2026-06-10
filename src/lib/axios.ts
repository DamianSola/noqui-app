import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getSession, signIn, signOut } from 'next-auth/react';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const session = await getSession();
    
    // if (process.env.NODE_ENV === 'development') {
      //   console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, {
        //     hasToken: !!session?.accessToken,
        //   });
        // }

     
        
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }else{
          console.warn('No access token found in session. Request will be sent without Authorization header.');
          
        }

        return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      // console.log(`📥 ${response.config.url} - ${response.status}`);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await signOut({ redirect: false });
        if (typeof window !== 'undefined') {
          signIn();
        }
      } catch (signOutError) {
        console.error('Error during sign out:', signOutError);
      }
    } /// chequear que funcione

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await getSession();

        if (session) {
          originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
          return axiosInstance(originalRequest);
        } else {
          if (typeof window !== 'undefined') {
            signIn();
          }
        }
      } catch (refreshError) {
        console.error('Error refreshing session:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;