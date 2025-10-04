'use server' ;
import { getUserToken } from "@/Helpers/getUserToken";

 
export async function addToWishListAction(productId:string) {
const token = await getUserToken()
    const response = await fetch(`${process.env.URL_API}/wishlist`, {
          method: 'POST',
          body: JSON.stringify({ productId }),
          headers: {
            token : token+'',
            'Content-Type': 'application/json'
          }
        })
        return response.json()
}