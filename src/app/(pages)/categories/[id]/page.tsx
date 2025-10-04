import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

async function getCategory(id: string): Promise<Category> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch category");
  const { data } = await res.json();
  return data;
}

async function getCategoryProducts(id: string): Promise<Product[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const { data } = await res.json();
  return data;
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id);
  const products = await getCategoryProducts(params.id);

  return (
    <main className="px-4 py-8 max-w-7xl mx-auto">
      <header className="flex flex-col items-center mb-8">
        <div className="w-28 h-28 rounded-xl overflow-hidden shadow mb-4 bg-gray-50 flex items-center justify-center">
          <Image
            src={category.image}
            alt={category.name}
            width={112}
            height={112}
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold">{category.name}</h1>
      </header>

      {products?.length ? (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                {product.title}
              </h3>
              <span className="text-green-600 font-semibold">
                {product.price} EGP
              </span>
            </div>
          ))}
        </section>
      ) : (
        <p className="text-center text-gray-500">
          No products found for this category.
        </p>
      )}
    </main>
  );
}
