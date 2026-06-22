import { useEffect, useState } from "react";

import { customerService } from "@/services/customer.service";

import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { toast } from "@/hooks/useToast";

import { Customer } from "@/types/customer.type";

import { Loader2, PlusIcon } from "lucide-react";
import { useDebounce } from "use-debounce";

import { Badge } from "../ui/badge";

type User = Customer;

type PendingStatusChange = {
  user: User;
  nextActive: boolean;
};

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
  const [pendingStatusChange, setPendingStatusChange] =
    useState<PendingStatusChange | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [hideInactive, setHideInactive] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await customerService.fetchAll(
          undefined,
          undefined,
          debouncedSearch || undefined
        );
        setUsers(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [open, debouncedSearch]);

  const openChangePassword = (user: User) => {
    setSelectedUser(user);
    setShowChangePassword(true);
  };

  const closeChangePassword = () => {
    setSelectedUser(null);
    setShowChangePassword(false);
  };

  const requestStatusChange = (user: User) => {
    setPendingStatusChange({ user, nextActive: !user.isActive });
  };

  const confirmStatusChange = async () => {
    if (!pendingStatusChange) return;

    const { user, nextActive } = pendingStatusChange;
    setIsUpdatingStatus(true);

    try {
      await customerService.setActiveStatus(user.id, nextActive);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, isActive: nextActive } : u))
      );
      toast({
        title: nextActive ? "Activated" : "Deactivated",
        description: nextActive
          ? "Customer can log in again"
          : "Customer can no longer log in"
      });
      setPendingStatusChange(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update customer status";
      toast({
        variant: "destructive",
        title: "Update failed",
        description: message
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const visibleUsers = hideInactive
    ? users.filter((user) => user.isActive)
    : users;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen && (pendingStatusChange !== null || isUpdatingStatus)) {
            return;
          }
          onOpenChange(nextOpen);
        }}
      >
        <DialogContent
          className="flex flex-col w-full xl:w-3/5 max-h-[100dvh] overflow-y-auto"
          onInteractOutside={(e) => {
            if (pendingStatusChange !== null || isUpdatingStatus) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader className="space-y-1">
            <DialogTitle>Customer List</DialogTitle>
            <DialogDescription>Manage registered customers</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <Input
              placeholder="Search username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <Checkbox
                id="hide-inactive-customers"
                checked={hideInactive}
                onCheckedChange={(checked) => setHideInactive(checked === true)}
              />
              <Label
                htmlFor="hide-inactive-customers"
                className="text-sm font-normal cursor-pointer"
              >
                Hide deactivated customers
              </Label>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Streak</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-6 text-center text-muted-foreground"
                    >
                      Loading customers...
                    </TableCell>
                  </TableRow>
                )}

                {error && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-6 text-center text-destructive"
                    >
                      {error}
                    </TableCell>
                  </TableRow>
                )}

                {!loading && !error && visibleUsers.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-6 text-center text-muted-foreground"
                    >
                      {debouncedSearch
                        ? "No customers found for this username"
                        : hideInactive && users.some((u) => !u.isActive)
                          ? "No active customers found"
                          : "No customers found"}
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  !error &&
                  visibleUsers.map((user) => (
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

                      <TableCell className="px-4 py-3">
                        {user.currentStreak}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openChangePassword(user)}
                          >
                            Change Password
                          </Button>
                          <Button
                            size="sm"
                            variant={user.isActive ? "secondary" : "default"}
                            onClick={() => requestStatusChange(user)}
                            disabled={
                              isUpdatingStatus &&
                              pendingStatusChange?.user.id === user.id
                            }
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={onOpenCreateUser}>
              <PlusIcon /> Create User
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ChangePasswordModal
        open={showChangePassword}
        user={selectedUser}
        onClose={closeChangePassword}
      />

      <AlertDialog
        open={pendingStatusChange !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen && !isUpdatingStatus) {
            setPendingStatusChange(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingStatusChange?.nextActive
                ? "Activate customer?"
                : "Deactivate customer?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingStatusChange?.nextActive
                ? `"${pendingStatusChange.user.username}" will be able to log in again.`
                : `"${pendingStatusChange?.user.username}" will no longer be able to log in. Their bookings are unchanged.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatingStatus}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isUpdatingStatus}
              onClick={(e) => {
                e.preventDefault();
                void confirmStatusChange();
              }}
            >
              {isUpdatingStatus && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {pendingStatusChange?.nextActive ? "Activate" : "Deactivate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
