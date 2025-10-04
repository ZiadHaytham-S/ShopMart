"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SubcategoryI } from "@/interfaces/subcategories";



export default function SubCategoriesPage() {
  const [subs, setSubs] = useState<SubcategoryI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubs() {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories");
        const data = await res.json();
        setSubs(data.data);
      } catch (err) {
        console.error("Error fetching subcategories", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubs();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))
      ) : (
        subs.map((sub) => (
          <Link key={sub._id} href={`/subcategories/${sub._id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-lg">{sub.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
