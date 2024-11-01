"use server";

import { IActionModelo } from "@/interfaces/modelo";
import axiosInstance from "@/lib/axios";

export const action_modelo = async (register: IActionModelo) => {
  try {
    // Decide el método HTTP basado en si 'id' está presente
    const method = register.id ? "put" : "post";

    const data = register.id
      ? {
          id: register.id,
          version: register.version,
          platform: register.platform,
        }
      : {
          version: register.version,
          platform: register.platform,
        };

    // Hace la solicitud HTTP usando axiosInstance
    const response = await axiosInstance[method](`${register.base}`, data, {
      headers: { Authorization: `Bearer ${register.token}` },
    });

    // Verifica si la respuesta contiene datos y un id
    if (response.data && response.data.id) {
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
    // Manejo de errores
    console.log("Error fetching data:", (error as { message: string }).message);
    return {
      ok: false,
    };
  }
};
