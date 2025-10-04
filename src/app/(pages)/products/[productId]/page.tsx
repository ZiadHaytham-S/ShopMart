import { ProductI } from "@/interfaces/products";
import { Params } from "next/dist/server/request/params";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import StarIcons from "@/components/starsIcons/sratIcons";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import ProductSlider from "@/components/productSlider/ProductSlider";
import AddToCart from "@/components/AddToCart/AddToCart";


export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;

  const respone = await fetch(
    `${process.env.URL_API}/products/` + productId
  );
  const { data: product }: { data: ProductI } = await respone.json();

  return (
    <>
      <Card className="grid md:grid-cols-3 items-center">
        <div className="col-span-1">
            <ProductSlider images={product.images} altContent={product.title}/>
        </div>

        <div className="md:col-span-2 w-full space-y-4 p-4">
          <CardHeader>
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle className="text-2xl">{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <CardDescription>{product.category.name}</CardDescription>
            <div className="flex justify-between  items-center mt-3">
              <p className="flex gap-1 ">
                {" "}
                <StarIcons /> <span>{product.ratingsAverage}</span>
              </p>
              <p className="">
                {" "}
                Remaining <span>{product.ratingsQuantity}</span>
              </p>
            </div>
            <div className="flex justify-between gap-6 items-center mt-3">
              <p className="">
                {" "}
                Quantity: <span>{product.quantity}</span>
              </p>
              <p className="flex gap-1  items-center">
                {" "}
                EGP {" "}
                <span className="text-xl font-semibold">{product.price}</span>
              </p>
            </div>
          </CardContent>

         <AddToCart productId={product.id}/>
        </div>
      </Card>
    </>
  );
}
