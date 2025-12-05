import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { customerService, CustomerEntity } from "@/services/customer.service";
import { toast } from "@/hooks/useToast";

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

      setPassword("");
      onClose();
      onSuccess?.();
      toast({
        title: "Password Updated!",
        description: "Password " + user.username + " successfully updated"
      });
    } catch (err) {
      console.error(err);
      alert("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Change Password — {user?.username}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3  border border-zinc-700 rounded focus:outline-none"
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading || !password}
            >
              {loading ? "Saving..." : "Update"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
