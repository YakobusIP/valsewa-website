import { useEffect, useState } from "react";

import { customerService } from "@/services/customer.service";

import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Customer } from "@/types/customer.type";

type User = Customer;

type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onOpenCreateUser: () => void;
};

export default function UserListModal({
  open,
  onOpenChange,
  onOpenCreateUser
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await customerService.fetchAll();
        setUsers(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [open]);

  const openChangePassword = (user: User) => {
    setSelectedUser(user);
    setShowChangePassword(true);
  };

  const closeChangePassword = () => {
    setSelectedUser(null);
    setShowChangePassword(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:w-3/5 max-h-[100dvh] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle>User List</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Manage registered users
          </p>
        </DialogHeader>

        {/* TABLE CONTAINER */}
        <div className="mt-4 border rounded-lg overflow-hidden bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 text-left w-[60px]">#</th>
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Created At</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-muted-foreground"
                  >
                    Loading users...
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-destructive">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && users.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-muted-foreground"
                  >
                    No users found
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-b-0 hover:bg-muted transition-colors"
                  >
                    <td className="px-4 py-3">{index + 1}</td>

                    <td className="px-4 py-3 font-medium">{user.username}</td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openChangePassword(user)}
                      >
                        Change Password
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end mt-4">
          <Button onClick={onOpenCreateUser}>+ Create User</Button>
        </div>
      </DialogContent>

      <ChangePasswordModal
        open={showChangePassword}
        user={selectedUser}
        onClose={closeChangePassword}
      />
    </Dialog>
  );
}
