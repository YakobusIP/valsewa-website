"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { loginFormSchema } from "@/types/zod.type"
import { useAuth } from "@/hooks/useAuth"

import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react"
import Image from "next/image";

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
    <div className={cn("flex flex-col gap-6 h-full", className)} {...props}>
      <Card className="relative w-full h-full overflow-hidden">
  {/* Close Button (Top Right) */}
  {onClose && (
    <button
      type="button"
      onClick={onClose}
      className="absolute right-4 top-4 text-muted-foreground hover:text-foreground text-xl"
    >
      ✕
    </button>
  )}

  <CardContent className="grid h-full p-0 md:grid-cols-2">
    
    {/* LEFT – IMAGE */}
    <div className="relative hidden md:block h-full w-full">
          <Image
            src="/LS/SVG/Loading Screen_VS_Loading_1280x2800px.svg"
            fill
            alt="Hero"
            className="object-cover object-bottom"
          />
    </div>

    {/* RIGHT – FORM */}
    <form className="flex items-center justify-center p-8" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="w-full max-w-sm flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Login to your account
          </p>
        </div>

        {/* Username */}
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="username"
            {...form.register("username")}
          />
          {form.formState.errors.username && (
            <p className="text-sm text-red-500">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2 relative">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="https://wa.me/6285175343447?text=Halo Admin aku lupa password nih min"
              className="ml-auto text-sm underline hover:underline-offset-2"
            >
              Forgot?
            </a>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter password"
              {...form.register("password")}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={isLoadingLogin}>
          {isLoadingLogin && (
            <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
          )}
          Login
        </Button>

        {/* Footer */}
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>

      </div>
    </form>
  </CardContent>
</Card>

      
    </div>
  )
}
