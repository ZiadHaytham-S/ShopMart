'use client'
import { CartResponse } from "@/interfaces/Cart";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";


export const CartContext = createContext<{
  cartData : CartResponse | null , 
  setCartData : (value : CartResponse| null) => void ,
  isLoading : boolean ,
  setIsLoading : (value : boolean)=> void,
  getCart : ()=> void
}>({
   cartData :  null , 
  setCartData : () => {} ,
  isLoading : false ,
  setIsLoading : ()=> {},
  getCart() {},
})


export default function CartContextProvider({children} : {children : ReactNode}) {
  const [cartData, setCartData] = useState<CartResponse|null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [_userId, _setUserId] = useState<string>('');
  const session = useSession()

  async function getCart() {
    
    const response = await fetch(`http://localhost:3000/api/get-cart`)
   
    const data: CartResponse = await response.json()
    
    
    setCartData(data)
    if (cartData?.data.cartOwner) {
      localStorage.setItem('userId' , cartData?.data.cartOwner)
    }
    
    setIsLoading(false)
  }
  useEffect(()=> {
      if (session.status == 'authenticated') {
        
        getCart()
      }
  } , [session.status])
  return <CartContext.Provider value={{cartData , setCartData , isLoading , setIsLoading, getCart}}>
    {children}
  </CartContext.Provider>
  
}