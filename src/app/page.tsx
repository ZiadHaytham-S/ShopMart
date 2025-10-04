import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 text-center mb-3">
        Welcome to ShopMart
      </h1>

    
      <p className="text-base sm:text-lg text-center text-gray-600 max-w-md sm:max-w-2xl mb-8 leading-relaxed">
        Discover the latest technology, fashion, and lifestyle products. Quality
        guaranteed with fast shipping and excellent customer service.
      </p>

      
      <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4 w-full sm:w-auto">
        <Link href="/products" passHref>
          <Button className="w-full sm:w-auto px-5 py-3 text-white bg-gray-900 rounded-xl shadow hover:bg-gray-800 transition-all duration-200">
            Shop Now
          </Button>
        </Link>

        <Link href="/categories">
          <Button className="w-full sm:w-auto px-5 py-3 text-gray-900 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition-all duration-200">
            Browse Categories
          </Button>
        </Link>
      </div>
    </div>
  );
}
