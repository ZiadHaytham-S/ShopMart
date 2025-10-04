"use client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Address {
  _id: string;
  name: string;
  details: string;
  city: string;
  phone: string;
}

const BASE = "https://ecommerce.routemisr.com/api/v1";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4MTIxMzg3LCJleHAiOjE3NjU4OTczODd9.zyRVF_7RmcSeJKcl0S8VqIp3o2NV_SpodSi_3yGQkXg";

async function api<T>(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      token: TOKEN,
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`${options?.method || "GET"} ${path} failed`);
  return res.json() as Promise<T>;
}

function AddressForm({ onAdded }: { onAdded: (addresses: Address[]) => void }) {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = { name, details, phone, city };
      await api("/addresses", {
        method: "POST",
        body: JSON.stringify(body),
      });
      toast.success("Address added!");

      const data = await api<{ status: string; data: Address[] }>("/addresses");
      onAdded(data.data);

      setName("");
      setDetails("");
      setPhone("");
      setCity("");
    } catch (err) {
      toast.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow space-y-3">
      <h2 className="text-lg font-semibold">Add Address</h2>
      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <textarea
        className="w-full border p-2 rounded resize-none"
        placeholder="Details" rows={4} 
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Address | null>(null);
  const [deletingIds, setDeletingIds] = useState<string[]>([]); // لودينج لكل زر حذف

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const data = await api<{ status: string; data: Address[] }>("/addresses");
      setAddresses(data.data);
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleAdded = (newAddresses: Address[]) => {
    setAddresses(newAddresses);
  };

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => [...prev, id]);
    try {
      await api(`/addresses/${id}`, { method: "DELETE" });
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      toast("Address deleted!", { icon: "🗑️" });
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleView = async (id: string) => {
    try {
      const data = await api<{ status: string; data: Address }>(`/addresses/${id}`);
      setSelected(data.data);
    } catch {
      toast.error("Failed to get address");
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Addresses</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <AddressForm onAdded={handleAdded} />
        <div>
          <h2 className="text-lg font-semibold mb-2">Saved Addresses</h2>
          {loading ? (
            <p><Loader2 className="animate-spin text-destructive"/></p>
          ) : addresses.length === 0 ? (
            <p className="text-gray-500">No addresses yet</p>
          ) : (
            <ul className="space-y-3">
              {addresses.map((a) => (
                <li key={a._id} className="p-4 border rounded-lg bg-gray-50 shadow flex justify-between">
                  <div>
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-sm">{a.details}</p>
                    <p className="text-sm">{a.city}</p>
                    <p className="text-sm text-gray-600">{a.phone}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleView(a._id)} className="px-3 py-1 border rounded">
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded flex items-center justify-center gap-2"
                      disabled={deletingIds.includes(a._id)}
                    >
                      {deletingIds.includes(a._id) && <Loader2 className="animate-spin h-4 w-4" />}
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h3 className="font-bold text-lg mb-2">Address Details</h3>
            <p>
              <strong>Name:</strong> {selected.name}
            </p>
            <p>
              <strong>City:</strong> {selected.city}
            </p>
            <p>
              <strong>Phone:</strong> {selected.phone}
            </p>
            <p>
              <strong>Details:</strong> {selected.details}
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
