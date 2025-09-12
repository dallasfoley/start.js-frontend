import { cookies } from "next/headers";

export async function setCookies(data: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", data.accessToken || "", {
    path: "/",
    maxAge: 60 * 60, // 1 hour
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  cookieStore.set("refreshToken", data.refreshToken || "", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
