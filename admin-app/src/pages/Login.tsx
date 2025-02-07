import { useState } from "react";

import { authService } from "@/services/auth.service";

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

import { useToast } from "@/hooks/useToast";

import { setAccessToken } from "@/lib/axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  identifier: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required")
});

export default function Login() {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { identifier: "", password: "" }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoadingLogin(true);
    try {
      const response = await authService.login(values);
      setAccessToken(response.jwt);
      navigate("/dashboard");

      toast.toast({
        title: "All set!",
        description: "Login successful"
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast.toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingLogin(false);
    }
  };

  return (
    <main className="container flex items-center justify-center mx-auto min-h-[100dvh]">
      <Card className="w-1/4">
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
                name="identifier"
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
                        type="password"
                        placeholder="Enter password here"
                        {...field}
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
