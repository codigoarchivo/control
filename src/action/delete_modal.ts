"use server";

import axiosInstance from "@/lib/axios";

interface Idelete_modal {
  [k: string]: FormDataEntryValue;
}

export const delete_modal = async (register: Idelete_modal) => {
  try {
    const response = await axiosInstance.delete(register.path.toString(), {
      headers: { Authorization: `Bearer ${register.token}` },
    });

    if (response.status === 204) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
      };
    }
  } catch (error) {
    console.log("Error fetching data:", (error as { message: string }).message);
    return {
      ok: false,
    };
  }
};
