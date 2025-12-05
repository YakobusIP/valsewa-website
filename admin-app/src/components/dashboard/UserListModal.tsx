import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { customerService } from "@/services/customer.service";
import { Customer } from "@/types/customer.type";
import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal";

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
      <DialogContent className="w-full xl:w-3/5 overflow-y-auto max-h-[100dvh]">
        <DialogHeader>
          <DialogTitle>User List</DialogTitle>
        </DialogHeader>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className=" ">
              <tr>
                <th className="p-3 text-left w-[50px]">#</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={3} className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-red-400">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && users.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center">
                    No users found
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-t border-zinc-800 hover:bg-zinc-300 ${
                      index % 2 === 0 ? "bg-zinc-100" : "bg-zinc-100"
                    }`}
                  >
                  <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">
                      {user.isActive ? (
                        <span className="text-green-400 font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-400 font-medium">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-600 hover:bg-zinc-800 bg-black text-white hover:text-white"
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

        {/* Footer */}
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
