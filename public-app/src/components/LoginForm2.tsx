import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/hooks/useAuth";

import { loginFormSchema } from "@/types/zod.type";

import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormProps = React.ComponentProps<"div"> & {
  onClose?: () => void;
};

export function LoginForm({ className, onClose, ...props }: LoginFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isLoadingLogin, login } = useAuth();

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

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="relative">
        {/* Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        )}

        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your username and password</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Username */}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
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
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    target="_blank"
                    href="https://wa.me/6285175343447?text=Halo Admin aku lupa password nih min"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter password here"
                    {...form.register("password")}
                    className="pr-10"
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <EyeOffIcon size={16} />
                    ) : (
                      <EyeIcon size={16} />
                    )}
                  </button>
                </div>

                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </Field>

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoadingLogin}
                >
                  {isLoadingLogin && (
                    <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Login
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a
                    target="_blank"
                    href="https://wa.me/6285175343447?text=Halo Admin aku mau bikin akun di Valsewa nih min"
                    className="underline"
                  >
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
