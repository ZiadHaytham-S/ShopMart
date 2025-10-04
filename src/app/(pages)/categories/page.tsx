import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { CategoryI } from "@/interfaces/categories";

export default async function Categories() {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories`
  );
  const { data: categories }: { data: CategoryI[] } = await response.json();

  const sliderItems = [...categories, ...categories];

  const css = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); } 
  }

  .slider { overflow: hidden; }

  .slider-track {
    display: flex;
    gap: 1rem;
    align-items: center;
    width: max-content;
    animation: marquee 20s linear infinite;
    will-change: transform;
  }

  .slider-track:hover {
    animation-play-state: paused;
  }

  .slider-item {
    flex: 0 0 auto;
    width: 15rem; /* 15rem = 240px */
  }

  .slider-item .card-image {
    position: relative;
    width: 100%;
    height: 10rem; 
    overflow: hidden;
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  return (
    <div className="px-4 py-6">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="slider mb-8">
        <div className="slider-track no-scrollbar">
          {sliderItems.map((category, i) => (
            <div key={`${category._id}-${i}`} className="slider-item">
              <Link href={`/categories/${category._id}`}>
                <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                  <div className="card-image">
                    <Image
                      src={category.image ?? "/placeholder.png"}
                      alt={category.name ?? "Category"}
                      fill
                      sizes="500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-2 text-center">
                    <CardTitle className="text-sm font-semibold truncate">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Shop By Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link key={category._id} href={`/categories/${category._id}`}>
            <Card className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-40 sm:h-48">
                <Image
                  src={category.image ?? "/placeholder.png"} // ✅ fallback
                  alt={category.name ?? "Category"}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={300}
                />
              </div>
              <CardHeader className="text-center p-3">
                <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                  {category.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
