'use server' ;
import { getUserToken } from "@/Helpers/getUserToken";

 
export async function removeCartItem(productId:string) {
    const token = await getUserToken()
     const response = await fetch(
      `${process.env.URL_API}/cart/` + productId,
      {
        method: "DELETE",
        headers: { token: token+'' ,   
           "Content-Type" : 'application/json'
        },
      }
    );
    const data = await response.json();
    return data ; 
}