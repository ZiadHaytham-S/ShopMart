'use client';

import LoadingScreen from '@/app/loading';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Order {
  id: string;
  cartItems: {
    product: {
      id: string;
      title: string;
      imageCover: string;
      price: number;
    };
    count: number;
  }[];
  totalOrderPrice: number;
  createdAt: string;
}

export default function Allorders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function getOrders() {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}api/get-orders?userId=${userId}`
      );
      const data = await response.json();
      
      const sortedOrders = [...data].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

      setOrders(sortedOrders);
    } catch (error) {
      console.error('Failed to load orders', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <LoadingScreen/>
    );
  }

  if (!orders.length) {
    return <p className="text-center text-gray-500 mt-10">No orders found.</p>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 text-sm">
                Order ID: <span className="font-medium">{order.id}</span>
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.cartItems.map((item , index) => (
                <div
                  key={`${order.id}-${item.product.id}-${index}`}
                  className="border rounded-xl p-3 flex flex-col items-center bg-gray-50 hover:bg-gray-100 transition"
                >
                  <Image
                  width={100} height={100}
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-28 h-28 object-cover rounded-lg mb-3"
                  />
                  <h2 className="text-center font-semibold text-sm mb-1">
                    {item.product.title}
                  </h2>
                  <p className="text-green-600 font-medium mb-1">
                    {item.product.price} EGP
                  </p>
                  <span className="text-gray-500 text-xs">
                    Qty: {item.count}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-right mt-4 font-bold text-lg text-green-700">
              Total: {order.totalOrderPrice} EGP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
