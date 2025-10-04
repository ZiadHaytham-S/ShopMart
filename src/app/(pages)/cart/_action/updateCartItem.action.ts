'use server';

import { getUserToken } from "@/Helpers/getUserToken";

export async function updateCartItemAction(productId:string , count : number) {
        const token = await getUserToken()
        
        
      
  const response = await fetch(
      `${process.env.URL_API}/cart/` + productId,
      {
        method: "PUT",
        body : JSON.stringify({ count }),
        headers: {
          token: token+'',     
           "Content-Type" : "application/json"
        },
      }
    );
    const data = await response.json();
    return data ;
}