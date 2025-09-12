"use server";

import { API_BASE_URL } from "@/lib/constants";
import { ProjectForm, projectFormSchema } from "@/types";

export async function generate(data: ProjectForm): Promise<{
  success: boolean;
  status: number;
  data: ProjectForm | null;
  message: string;
}> {
  const { success, data: parsedData } = projectFormSchema.safeParse(data);
  if (!success) {
    console.error("Validation errors:", parsedData);
    throw new Error("Invalid data");
  }
  console.log("Parsed data:", parsedData);

  try {
    const res = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData),
    });
    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        data: null,
        message: res.statusText || "Failed to generate project",
      };
    }
    return res.json();
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: null,
      message:
        error instanceof Error ? error.message : "Failed to generate project",
    };
  }
}
