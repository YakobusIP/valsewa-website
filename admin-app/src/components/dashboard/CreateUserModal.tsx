import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { customerService } from "@/services/customer.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { generatePassword } from "@/lib/utils";
import { LockIcon, CopyIcon } from "lucide-react";

const schema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter")
});

type FormData = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateUserModal({ open, onOpenChange }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = form;

  const { toast } = useToast();

  const usernameValue = watch("username");
  const passwordValue = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      await customerService.create(data);

      toast({
        title: "Success",
        description: "User created successfully ✅"
      });

      reset();
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Username telah digunakan";

      toast({
        title: "Failed to create user ❌",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const generateAndSetPassword = () => {
    const newPassword = generatePassword();
    setValue("password", newPassword, { shouldValidate: true });
  };

  const copyPreviewToClipboard = async () => {
    if (!usernameValue || !passwordValue) return;

    await navigator.clipboard.writeText(
      `Username: ${usernameValue}\nPassword: ${passwordValue}`
    );

    toast({
      title: "Copied",
      description: "Username & password copied to clipboard"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* USERNAME */}
          <div>
            <input
              {...register("username")}
              placeholder="Username"
              className="w-full px-4 py-2 rounded border border-zinc-700"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="text"
              {...register("password")}
              placeholder="Password"
              className="w-full px-4 py-2 rounded border border-zinc-700"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* GENERATE PASSWORD */}
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={generateAndSetPassword}
          >
            <LockIcon className="w-4 h-4 mr-2" />
            Generate New Password
          </Button>

          {/* PREVIEW FIELD */}
          {(usernameValue || passwordValue) && (
            <div className="relative border rounded-md p-3 bg-muted text-sm">
              <p>
                <b>Username:</b> {usernameValue || "-"}
              </p>
              <p>
                <b>Password:</b> {passwordValue || "-"}
              </p>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={copyPreviewToClipboard}
              >
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-zinc-800"
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
