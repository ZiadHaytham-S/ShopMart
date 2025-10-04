'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/Context/CartContext";

export default function Provider({children} : {children : ReactNode}) {
  return <>
  
    <SessionProvider>
        <CartContextProvider>
          <Navbar />
          <div className="container py-4">
            <Toaster />
            {children}
          </div>
          <Footer />
        </CartContextProvider>
    </SessionProvider>
  </>
}
