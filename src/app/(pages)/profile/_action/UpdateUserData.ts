
"use server";

import { getUserToken } from "@/Helpers/getUserToken";

export async function updateUserAction(name: string, email: string, phone: string) {
  try {
    const token = await getUserToken()
    if (!token) return { error: "You are not logged in" };

    const res = await fetch(`${process.env.URL_API}/users/updateMe/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token+'',
      },
      body: JSON.stringify({ name, email, phone }),
    });

    const data = await res.json();
    if (!res.ok) return { error: data.message || "Failed to update user data" };

    return { success: "User updated successfully ✅", data };
  } catch (err: any) {
    return { error: err.message };
  }
}
