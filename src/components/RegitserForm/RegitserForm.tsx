"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schema/register";
import { useRouter } from "next/navigation";
import { registerUser } from "./_action/register";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

function FormField({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {children}
      <p className="text-sm text-red-500 min-h-[18px]">{error}</p>
    </div>
  );
}

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  async function signUp(data: RegisterFormData) {
    setLoading(true);
    setApiError(null);

    const result = await registerUser(data);

    if (!result.success) {
      setApiError(result.message);
    } else {
      router.push("/login");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white shadow-2xl py-10 px-6 min-w-md">
      <h2 className="text-2xl mb-4 text-center">Register Now</h2>

      <form
        onSubmit={handleSubmit(signUp)}
        className="flex flex-col gap-6"
        noValidate
      >
        <FormField error={errors.name?.message}>
          <Input type="text" placeholder="Name" {...register("name")} />
        </FormField>

        <FormField error={errors.email?.message}>
          <Input type="email" placeholder="Email" {...register("email")} />
        </FormField>

        <FormField error={errors.password?.message}>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </FormField>

        <FormField error={errors.rePassword?.message}>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("rePassword")}
          />
        </FormField>

        <FormField error={errors.phone?.message}>
          <Input type="text" placeholder="Phone" {...register("phone")} />
        </FormField>

        <Button disabled={loading} type="submit">
          {loading ? "Loading..." : "Register"}
        </Button>

        <div className="text-center">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-blue-500 hover:text-blue-800 hover:duration-500"
          >
            Sign in
          </Link>
        </div>

        {apiError && (
          <span className="text-center text-red-500">{apiError}</span>
        )}
      </form>
    </div>
  );
}
