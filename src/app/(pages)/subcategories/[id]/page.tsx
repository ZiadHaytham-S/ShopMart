"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export default function SubCategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products?subcategory=${id}`
        );
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProducts();
  }, [id]);

  return ( <> <div className="flex items-center justify-center">
       <Link className="" href={'/subcategories'}><Button className=" cursor-pointer text-center ">Back SubCategories</Button></Link>
  </div>

   <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))
      ) : products.length > 0 ? (
        products.map((product) => (
          <Card key={product._id} className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-lg">{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image width={400} height={400}
                src={product.imageCover}
                alt={product.title}
                className=" object-cover rounded-md mb-2"
              />
              <p className="text-green-600 font-semibold">${product.price}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products found for this subcategory.
        </p>
      )}
    </div>
 
 </> );
}
