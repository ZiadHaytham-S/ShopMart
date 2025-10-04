import Image from "next/image";
import Link from "next/link";

// Brand interface
interface Brand {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default async function BrandsPage() {
  // Fetch brands data from the API
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }

  const { data }: { data: Brand[] } = await res.json();

  return (
    <main className="px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Brands</h1>
        <p className="text-gray-500 text-sm">
          Explore the top brands available in our store.
        </p>
      </header>

      {/* Brands Grid */}
      {data?.length ? (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {data.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`} // navigate to brand details
              className="group flex flex-col items-center bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={96}
                  height={96}
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </section>
      ) : (
        <p className="text-center text-gray-500">No brands available.</p>
      )}
    </main>
  );
}
