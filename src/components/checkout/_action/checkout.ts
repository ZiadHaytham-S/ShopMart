"use server";

import { getUserToken } from "@/Helpers/getUserToken";
import { cookies } from "next/headers";

export async function checkoutSession(cartId: string, shippingAddress: any) {
  const token = await getUserToken()
  const res = await fetch(
    `${process.env.URL_API}/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_BASE_URL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify({ shippingAddress }),
    }
  );

  return await res.json();
}

export async function checkoutCash(cartId: string, shippingAddress: any) {
  const token = await getUserToken()

  const res = await fetch(`${process.env.URL_API}/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token || "",
    },
    body: JSON.stringify({ shippingAddress }),
  });

  return await res.json();
}
