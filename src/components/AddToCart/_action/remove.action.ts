'use server'

import { getUserToken } from "@/Helpers/getUserToken";

export async function removeProductAction(productId:string) {
  const token = await getUserToken()

  const response = await fetch(
    `${process.env.URL_API}/wishlist/${productId}`,
    {
      method: 'DELETE',
      headers: {
        token : token+'',
        'Content-Type': 'application/json'
      }
    }
  )
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}
