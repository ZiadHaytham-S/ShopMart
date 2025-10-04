'use client'
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader2, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '../Context/CartContext'
import { AddToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { removeProductAction } from './_action/remove.action'
import { addToWishListAction } from './_action/addToWishList.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)
  const [wishLoading, setWishLoading] = useState(false)
  const { setCartData } = useContext(CartContext)
const router = useRouter()
const session = useSession()
  async function addToCart() {
   if (session.status == 'authenticated') {
     setIsLoading(true)
    try {
     
      const data = await AddToCartAction(productId)
      setCartData(data)

      if (data.status === 'success') {
        toast.success(data.message || 'Product added to cart successfully')
      } else {
        toast.error(data.message || 'Failed to add product to cart')
      }
    } catch (err) {
      toast.error('An error occurred while adding to cart')
    } finally {
      setIsLoading(false)
    }
   }else {
    router.push('/login')
   }
  }

  async function addToWishlist(productId: string) {
   if (session.status == 'authenticated') {
    const data = await addToWishListAction(productId);
   return data
   }else {
    router.push('/login')
   }
  }

    async function removeFromWishlist(productId: string) {
      
     if (session.status == 'authenticated') {
       const data = await removeProductAction(productId)
      return data
     }else{
      router.push('/login')
     }
    }

  async function toggleWishlist() {
  if (session.status == 'authenticated') {
      if (wishLoading) return
    setWishLoading(true)
    try {
      if (!inWishlist) {
        await addToWishlist(productId)
        setInWishlist(true)
        toast.success('Added to wishlist')
      } else {
        await removeFromWishlist(productId)
        setInWishlist(false)
        toast('Removed from wishlist', { icon: '🗑️' })
      }
    } catch (err) {
      toast.error('An error occurred while updating wishlist')
    } finally {
      setWishLoading(false)
    }
  }else{
    router.push('/login')
  }
  }

  return (
    <CardFooter className="gap-1">
      <Button onClick={addToCart} className="grow cursor-pointer">
        {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingCartIcon />} Add To Cart
      </Button>

      <button onClick={toggleWishlist} disabled={wishLoading}>
        <HeartIcon
          className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
            inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        />
      </button>
    </CardFooter>
  )
}
