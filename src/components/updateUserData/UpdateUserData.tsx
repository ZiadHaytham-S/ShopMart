"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateUserAction } from "@/app/(pages)/profile/_action/UpdateUserData";

export default function UpdateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 
  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");


    if (!nameRegex.test(name)) {
      setMessage("❌ Name must be at least 3 letters and only contain letters/spaces");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setMessage("❌ Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!phoneRegex.test(phone)) {
      setMessage("❌ Phone must be a valid Egyptian number (11 digits starts with 01)");
      setLoading(false);
      return;
    }

    const res = await updateUserAction(name, email, phone);

    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage(res.success || "User updated ✅");
    }

    setLoading(false);
  }

  return (
    <Card className="max-w-md mx-auto mt-6 shadow-lg">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Profile"}
          </Button>

          {message && (
            <p
              className={`text-sm mt-2 ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
