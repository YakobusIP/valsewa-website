"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { loginFormSchema } from "@/types/zod.type"
import { useAuth } from "@/hooks/useAuth"

import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import Image from "next/image"

type LoginFormProps = React.ComponentProps<"div"> & {
  onClose?: () => void
}

export function LoginForm({
  className,
  onClose,
  ...props
}: LoginFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { isLoadingLogin, login } = useAuth()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    await login(values)
  }

  useEffect(() => {
    document.title = "Login | Valsewa"
  }, [])

  return (
    <div
      className={cn(
        "relative w-full h-full bg-black rounded-2xl overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Close */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-neutral-400 hover:text-white text-xl"
        >
          —
        </button>
      )}

      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">
          <Image
            src="/LS/SVG/Loading Screen_VS_Loading_1280x2800px.svg"
            fill
            alt="Login visual"
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center px-10"
        >
          <div className="w-full max-w-sm space-y-6 text-center">
            {/* Header */}
            <div className="space-y-2">
              <p className="text-sm text-yellow-400">
                First Time Here?{" "}
                <span className="underline cursor-pointer">
                  Sign Up
                </span>
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
  )
}
