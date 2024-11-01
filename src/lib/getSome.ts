import { cache } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  // Configuración base de Axios, por ejemplo:
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

interface IfetchData {
  base: string;
  params: string;
  token: string;
  id: string | number;
}

const fetchData = async (register: IfetchData) => {
  try {
    const response = await axiosInstance.get(
      `${register.base}/${register.id}`,
      {
        headers: { Authorization: `Bearer ${register.token}` },
      }
    );
    
    if (response) {
      return {
        ok: true,
        data: response.data,
      };
    } else {
      return {
        ok: false,
      };
    }
  } catch (error) {
    console.log('Error fetching data:', (error as Error).message);
    return {
      ok: false,
    };
  }
};

export const getSome = cache(fetchData);
