'use client';

import React, { useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { checkoutCash, checkoutSession } from "./_action/checkout";

export default function Checkout({ cartId }: { cartId: string | undefined }) {
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function handleCheckoutVisa(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const city = cityInput.current?.value?.trim() || "";
    const details = detailsInput.current?.value?.trim() || "";
    const phone = phoneInput.current?.value?.trim() || "";

    if (!city || !details || !phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    const shippingAddress = { details, city, phone };
    const data = await checkoutSession(cartId!, shippingAddress);

    if (data.status === "success") {
      location.href = data.session.url; 
    } else {
      toast.error("Checkout failed");
    }
  }

  async function handleCheckoutCash(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const city = cityInput.current?.value?.trim() || "";
    const details = detailsInput.current?.value?.trim() || "";
    const phone = phoneInput.current?.value?.trim() || "";

    if (!city || !details || !phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    const shippingAddress = { details, city, phone };
    const data = await checkoutCash(cartId!, shippingAddress);

    if (data.status === "success") {
      toast.success("Order placed successfully!");
      router.push("/allorders");
    } else {
      toast.error("Cash order failed");
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full cursor-pointer">
            Proceed to Checkout
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
              Make sure that the data is entered correctly so that the order can be received.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input ref={detailsInput} id="details" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleCheckoutCash} className="cursor-pointer" type="submit">
              Cash
            </Button>
            <Button onClick={handleCheckoutVisa} className="cursor-pointer" type="submit">
              Visa
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
