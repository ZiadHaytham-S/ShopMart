import { ProductI } from "@/interfaces/products";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import StarIcons from "@/components/starsIcons/sratIcons";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";

export default async function Products() {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products`
  );
  const { data: products }: { data: ProductI[] } = await response.json();

  return (
    <>
      <div className="flex flex-wrap">
        {products.map((product) => <div key={product.id} className="p-1 w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <Card className="group cursor-pointer rounded-xl bg-white p-4 shadow transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
        <Link href={'/products/' + product.id}>
        <div >
          <Image src={product.imageCover} className="w-full" alt="" width={300} height={400} />
          <CardHeader>
            <CardTitle>{product.title.split(' ' , 2)}</CardTitle>
            <CardDescription>{product.category.name}</CardDescription>
            <CardAction>{product.brand.name}</CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
          <div className="flex">
                <StarIcons/>
                <StarIcons/>
                <StarIcons/>
                <StarIcons/>
          </div>

              <p>{product.ratingsAverage}</p>
            </div>
            <p className="pt-2">Price : <span className=" font-semibold"> {product.price} </span> </p>
          </CardContent>
        </div>
        </Link>
          <AddToCart productId={product.id}/>
        </Card>
      </div> )}
      </div>
    </>
  );
}
