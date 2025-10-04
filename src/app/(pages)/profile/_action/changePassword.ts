"use server";

import { getUserToken } from "@/Helpers/getUserToken";


export async function changePasswordAction( currentPassword: string, newPassword: string) {
  const token = await getUserToken();
    try {
   

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token+'',
        },
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
          rePassword: newPassword, 
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to change password");
    }

    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
