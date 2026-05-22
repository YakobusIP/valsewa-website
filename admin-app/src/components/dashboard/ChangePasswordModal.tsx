import { useState } from "react";

import { CustomerEntity, customerService } from "@/services/customer.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { toast } from "@/hooks/useToast";

import { generatePassword } from "@/lib/utils";

import { CopyIcon, LockIcon } from "lucide-react";

type Props = {
  open: boolean;
  user: CustomerEntity | null;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function ChangePasswordModal({
  open,
  user,
  onClose,
  onSuccess
}: Props) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !password) return;

    try {
      setLoading(true);

      await customerService.updatePassword(user.id, password);

      toast({
        title: "Password Updated",
        description: `Password for ${user.username} updated successfully`
      });

      setPassword("");
      onClose();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed",
        description: "Failed to change password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAndSetPassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
  };

  const copyPreviewToClipboard = async () => {
    if (!user || !password) return;

    await navigator.clipboard.writeText(
      `Username: ${user.username}\nPassword: ${password}`
    );

    toast({
      title: "Copied",
      description: "Username & password copied to clipboard"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password — {user?.username}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* PASSWORD INPUT */}
          <input
            type="text"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border border-zinc-700 focus:outline-none"
          />

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

          {/* PREVIEW */}
          {(user?.username || password) && (
            <div className="relative border rounded-md p-3 bg-muted text-sm">
              <p>
                <b>Username:</b> {user?.username || "-"}
              </p>
              <p>
                <b>Password:</b> {password || "-"}
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

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>

            <Button onClick={handleSubmit} disabled={loading || !password}>
              {loading ? "Saving..." : "Update Password"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
