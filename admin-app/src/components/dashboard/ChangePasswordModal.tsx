import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { publicUserService, PublicUserEntity } from "@/services/publicUser.service";

type Props = {
  open: boolean;
  user: PublicUserEntity | null;
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

      await publicUserService.updatePassword(user.id, password);

      setPassword("");
      onClose();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>
            Change Password — {user?.username}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none"
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
