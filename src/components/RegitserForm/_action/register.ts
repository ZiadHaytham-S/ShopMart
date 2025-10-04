"use server";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) {
  try {
    const response = await fetch(
      `${process.env.URL_API}/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return { success: true, data: result };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
