"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/useAuth";

import { loginFormSchema } from "@/types/zod.type";

import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormProps = React.ComponentProps<"div"> & {
  onClose?: () => void;
};

export function LoginForm({ className, onClose, ...props }: LoginFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isLoadingLogin, login, isAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    await login(values);
  };

  useEffect(() => {
    document.title = "Login | Valsewa";
  }, []);

  useEffect(() => {
    if (isAuthenticated && onClose) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  return (
    <div
      className={cn(
        "relative w-full h-full bg-black overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Close */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute z-[999] right-6 top-6 text-neutral-400 hover:text-white text-xl"
        >
          —
        </button>
      )}

      <div className="relative h-full md:grid md:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="absolute top-0 left-0 w-full h-[35vh] md:relative md:h-full">
          <Image
            src="/login/Login Page Interface.png"
            fill
            alt="Login visual"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black md:hidden" />
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
    relative z-10
            flex items-center justify-center
            min-h-screen
            px-6
            md:px-10
            md:min-h-full
          "
        >
          <div className="w-full max-w-sm space-y-6 text-center">
            {/* Header */}
            <div className="space-y-2">
              <p className="text-sm text-yellow-400">
                First Time Here?{" "}
                <span className="underline cursor-pointer">Sign Up</span>
              </p>

              <h1 className="text-3xl font-semibold text-white">
                Welcome Back
              </h1>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label className="sr-only">Username</Label>
              <Input
                placeholder="Username"
                {...form.register("username")}
                className="
                  h-11 rounded-lg
                  bg-neutral-700
                  border-none
                  text-white
                  placeholder:text-neutral-300
                "
              />
            </div>

            {/* Password */}
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  {...form.register("password")}
                  className="
                    h-11 rounded-lg
                    bg-neutral-700
                    border-none
                    text-white
                    placeholder:text-neutral-300
                    pr-10
                  "
                />

                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300"
                >
                  {passwordVisible ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Forget + Login Row */}
              <div className="flex items-center justify-between gap-4">
                <a
                  href="https://wa.me/6285175343447?text=Halo Admin aku lupa password nih min"
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Forget Password
                </a>

                <Button
                  type="submit"
                  disabled={isLoadingLogin}
                  className="
                    h-11 px-8
                    bg-red-600 hover:bg-red-700
                    rounded-full
                    text-white font-medium
                    flex items-center gap-2
                  "
                >
                  {isLoadingLogin && (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  )}
                  Log In →
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
