"use server";

import { API_BASE_URL } from "@/lib/constants";
import { LoginResponse } from "../login/loginWithEmailPassword";
import { LoginFormData } from "@/types";
import { setCookies } from "@/lib/functions/setCookies";

export async function registerWithEmailPassword(formData: LoginFormData) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      return {
        data: null,
        success: false,
        status: res.status,
        message: res.statusText,
      };
    }

    const resJson: LoginResponse = await res.json();
    if (resJson.success && resJson.data) {
      await setCookies(resJson.data);
    }
    return {
      data: resJson?.data || null,
      success: resJson?.success || false,
      status: resJson?.status || 500,
      message: resJson?.message || "",
    };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
}
