"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation"; 

const emailSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
});
type EmailForm = z.infer<typeof emailSchema>;

const codeSchema = z.object({
  resetCode: z.string().length(6, "Code must be 6 digits"),
});
type CodeForm = z.infer<typeof codeSchema>;

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});
type PasswordForm = z.infer<typeof passwordSchema>;

export default function ForgetPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "reset">("email");
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const router = useRouter(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors },
  } = useForm<CodeForm>({
    resolver: zodResolver(codeSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  async function onSubmitEmail(data: EmailForm) {
    setLoading(true);
    setApiMessage(null);
    try {
      const res = await fetch(
        `${process.env.URL_API}/auth/forgotPasswords`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setApiMessage("✅ Check your email for the reset code.");
      setStep("code");
    } catch (err: any) {
      setApiMessage(err.message || "❌ Failed to send email");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmitCode(data: CodeForm) {
    setLoading(true);
    setApiMessage(null);
    try {
      const res = await fetch(
        `${process.env.URL_API}/auth/verifyResetCode`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: data.resetCode }),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setApiMessage("✅ Code verified! Please enter your new password.");
      setStep("reset");
    } catch (err: any) {
      setApiMessage(err.message || "❌ Invalid code");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmitPassword(data: PasswordForm) {
    setLoading(true);
    setApiMessage(null);
    try {
      const res = await fetch(
        `${process.env.URL_API}/auth/resetPassword`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword: data.newPassword }),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setApiMessage("✅ Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setApiMessage(err.message || "❌ Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Forget Password</CardTitle>
        </CardHeader>
        <CardContent>
          {step === "email" && (
            <form
              onSubmit={handleSubmit(onSubmitEmail)}
              className="flex flex-col gap-4"
            >
              <Input placeholder="Enter your email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Code"}
              </Button>
            </form>
          )}

          {step === "code" && (
            <form
              onSubmit={handleSubmitCode(onSubmitCode)}
              className="flex flex-col gap-4"
            >
              <Input
                placeholder="Enter reset code"
                {...registerCode("resetCode")}
              />
              {codeErrors.resetCode && (
                <p className="text-sm text-red-500">
                  {codeErrors.resetCode.message}
                </p>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          )}

          {step === "reset" && (
            <form
              onSubmit={handleSubmitPassword(onSubmitPassword)}
              className="flex flex-col gap-4"
            >
              <Input
                type="password"
                placeholder="Enter new password"
                {...registerPassword("newPassword")}
              />
              {passwordErrors.newPassword && (
                <p className="text-sm text-red-500">
                  {passwordErrors.newPassword.message}
                </p>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}

          {apiMessage && (
            <p
              className={`text-center text-sm mt-4 ${
                apiMessage.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {apiMessage}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
