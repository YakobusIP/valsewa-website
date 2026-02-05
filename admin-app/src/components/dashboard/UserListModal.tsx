import { useEffect, useState } from "react";

import { customerService } from "@/services/customer.service";

import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { Customer } from "@/types/customer.type";

import { PlusIcon } from "lucide-react";

import { Badge } from "../ui/badge";

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
      <DialogContent className="flex flex-col w-full xl:w-3/5 max-h-[100dvh] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle>Customer List</DialogTitle>
          <DialogDescription>Manage registered customers</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-6 text-center text-muted-foreground"
                  >
                    Loading customers...
                  </TableCell>
                </TableRow>
              )}

              {error && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-6 text-center text-destructive"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              )}

              {!loading && !error && users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-6 text-center text-muted-foreground"
                  >
                    No customers found
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                !error &&
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-b last:border-b-0 hover:bg-muted transition-colors"
                  >
                    <TableCell className="px-4 py-3">{user.id}</TableCell>

                    <TableCell className="px-4 py-3 font-medium">
                      {user.username}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <Badge
                        className={
                          user.isActive
                            ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                            : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        }
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openChangePassword(user)}
                      >
                        Change Password
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end mt-4">
          <Button onClick={onOpenCreateUser}>
            <PlusIcon /> Create User
          </Button>
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
