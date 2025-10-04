"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changePasswordAction } from "./_action/changePassword";
import UpdateUserForm from "@/components/updateUserData/UpdateUserData";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!passwordRegex.test(currentPassword)) {
      setMessage("❌ Current password must be at least 8 chars, include uppercase, lowercase & number");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setMessage("❌ New password must be at least 8 chars, include uppercase, lowercase & number");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      setLoading(false);
      return;
    }

    const res = await changePasswordAction(currentPassword, newPassword);

    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage("Password changed successfully ✅");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    setLoading(false);
  }

  return (
    <>
      <UpdateUserForm />
      <Card className="max-w-md mx-auto mt-6 shadow-lg">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Changing..." : "Change Password"}
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
    </>
  );
}
