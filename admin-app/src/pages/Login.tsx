import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/hooks/useAuth";

import { loginFormSchema } from "@/types/zod.type";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isLoadingLogin, login } = useAuth();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" }
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    await login(values);
  };

  useEffect(() => {
    document.title = "Login | Valsewa Admin";
  }, []);

  return (
    <main className="container flex items-center justify-center mx-auto min-h-[100dvh]">
      <Card className="w-4/5 xl:w-1/4">
        <CardHeader>
          <CardTitle className="text-center font-bold text-4xl">
            Valsewa Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter password here"
                        {...field}
                        endIcon={
                          passwordVisible ? (
                            <EyeOffIcon
                              size={16}
                              className="text-muted-foreground"
                              onClick={() => setPasswordVisible(false)}
                            />
                          ) : (
                            <EyeIcon
                              size={16}
                              className="text-muted-foreground"
                              onClick={() => setPasswordVisible(true)}
                            />
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isLoadingLogin && (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                )}
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
