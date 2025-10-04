"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function ProductSlider({images , altContent} : {images : string[] , altContent : string}) {
  return <>
  <Carousel opts={{loop : true}} plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}>
            <CarouselContent>
            {images.map((img , index) =>   <CarouselItem key={index}> <Image  src={img} alt={altContent} width={600} height={600} className="w-full"/>  </CarouselItem>
            )}
            </CarouselContent>
          </Carousel>
  </>
}