"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import LoadingScreen from "@/app/loading";
import { removeProductAction } from "@/components/AddToCart/_action/remove.action";

interface WishlistItem {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);


  async function fetchWishlist() {
      try {
const response = await fetch(`${process.env.NEXTAUTH_URL}api/get-WishList`);
        if (!response.ok) throw new Error("Failed to fetch wishlist");
        const { data } = await response.json();
        setItems(data);
      } catch (err) {
        toast.error("Could not load wishlist");
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    
    fetchWishlist();
  }, []);

  async function removeFromWishlist(productId: string) {
    if (removingId) return;
    setRemovingId(productId);
    try {
      const response = await removeProductAction(productId);
      if (!response.ok) throw new Error("Failed to remove item");
      setItems((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Error removing item");
    } finally {
      setRemovingId(null);
    }
  }

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500">
        <LoadingScreen/>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {items.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center"
            >
              <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                <Image
                  src={item.imageCover}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                {item.title}
              </h3>
              <p className="text-green-600 font-semibold mb-3">
                {item.price} EGP
              </p>
              <button
                onClick={() => removeFromWishlist(item._id)}
                disabled={removingId === item._id}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {removingId === item._id ? "Removing..." : "Remove"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Your wishlist is empty.</p>
      )}
    </main>
  );
}
