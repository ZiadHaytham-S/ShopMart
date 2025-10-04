"use client";

import LoadingScreen from "@/app/loading";
import Checkout from "@/components/checkout/checkout";
import { CartContext } from "@/components/Context/CartContext";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/formatPrice";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { clearCartAction } from "./_action/clearCart.action";
import { removeCartItem } from "./_action/removeCartItem.action";
import { updateCartItemAction } from "./_action/updateCartItem.action";
import Image from "next/image";

export default function Cart() {
  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [clearing, setClearing] = useState<boolean>(false);

  if (typeof cartData?.data?.products[0]?.product == "string" || cartData == null) {
    getCart();
  }

  async function removingCartItem(productId: string) {
    setRemovingId(productId);
    const data = await removeCartItem(productId);
    if (data.status == "success") {
      toast.success("Removing this Product");
      setCartData(data);
    } else {
      toast.error("Don't Removing");
    }
    setRemovingId(null);
  }

  async function clearingCartItem() {
    setClearing(true);
    const data = await clearCartAction();
    if (data.message == "success") {
      setCartData(data);
    }
    setClearing(false);
  }

  async function updateCartItem(productId: string, count: number) {
    setUpdateId(productId);
    const data = await updateCartItemAction(productId, count);
    if (data.status == "success") {
      toast.success("Update this Product");
      setCartData(data);
    } else {
      toast.error("Don't Removing");
    }
    setUpdateId(null);
  }

  return (
    <>
      {isLoading || typeof cartData?.data?.products[0]?.product == "string" ? (
        <LoadingScreen />
      ) : (cartData?.numOfCartItems ?? 0) > 0 ? (
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">
            {cartData?.numOfCartItems} items in your cart
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            <div className="lg:col-span-2 space-y-4">
              {cartData?.data.products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
                >
                  <Image
                    width={100}
                    height={100}
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="rounded-lg object-cover md:w-28 md:h-28"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.brand.name} . {item.product.category.name}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartItem(item.product._id, item.count - 1)}
                          disabled={item.count == 1}
                          aria-label="decrease"
                          className="size-8 rounded-lg border hover:bg-accent"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-medium">
                          {updateId == item.product._id ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            item.count
                          )}
                        </span>
                        <button
                          onClick={() => updateCartItem(item.product._id, item.count + 1)}
                          aria-label="increase"
                          className="size-8 rounded-lg border hover:bg-accent"
                        >
                          +
                        </button>
                      </div>
                      <button
                        aria-label="remove"
                        disabled={removingId == item.product.id}
                        className="text-destructive hover:underline text-sm cursor-pointer flex gap-1"
                        onClick={() => removingCartItem(item.product.id)}
                      >
                        {removingId == item.product.id && (
                          <Loader2 className="animate-spin" />
                        )}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 sticky top-18">
              <div className="rounded-xl border p-5 shadow-sm">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Subtotal ({cartData?.numOfCartItems ?? 0} items)
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(cartData?.data.totalCartPrice ?? 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                </div>
                <div className="my-4 h-px w-full bg-gray-200"></div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    {formatCurrency(cartData?.data.totalCartPrice ?? 0)}
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  <Checkout cartId={cartData?.cartId} />
                  <Link href={"/products"}>
                    <Button className="w-full rounded-md border border-gray-300 bg-white cursor-pointer hover:bg-black hover:text-white py-3 text-black font-medium">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
              <Button
                onClick={clearingCartItem}
                variant={"outline"}
                className="mt-2 block ms-auto flex cursor-pointer text-destructive hover:text-destructive"
              >
                {clearing ? <Loader2 className="animate-spin" /> : <Trash2 />} Clear
                Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[60vh] flex justify-center items-center flex-col">
          <h2 className="mb-3 text-3xl font-bold">Your Cart Is Empty</h2>
          <Link href={"/products"}>
            <Button>Add Products.</Button>
          </Link>
        </div>
      )}
    </>
  );
}
