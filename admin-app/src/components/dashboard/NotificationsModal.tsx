import { useState } from "react";

import { accountService } from "@/services/account.service";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { toast } from "@/hooks/useToast";

import {
  DeleteResetLogRequest,
  FailedJobs,
  ResetLogs,
  UpdateResetLogRequest
} from "@/types/account.type";

import { generatePassword } from "@/lib/utils";

import { format } from "date-fns";
import { BellIcon, CopyIcon, XIcon } from "lucide-react";

import { Button } from "../ui/button";

type Props = {
  failedJobs: FailedJobs[];
  resetLogs: ResetLogs[];
  resetParent: () => Promise<void>;
};

export default function NotificationsModal({
  failedJobs,
  resetLogs,
  resetParent
}: Props) {
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [passwords, setPasswords] = useState<{ [id: number]: string }>({});

  const copyToClipboard = async (value: string) => {
    if (value) {
      await navigator.clipboard.writeText(value);
      toast({
        title: "All set!",
        description: "Copied to clipboard!"
      });
    }
  };

  const generateAndSetPassword = (id: number) => {
    const newPassword = generatePassword();
    setPasswords((prev) => ({ ...prev, [id]: newPassword }));
    copyToClipboard(newPassword);
  };

  const saveResetLogs = async (id: number, accountId: number) => {
    const password = passwords[id] || "";
    const payload: UpdateResetLogRequest = {
      accountId,
      password,
      passwordResetRequired: false
    };

    setIsLoadingSave(true);
    try {
      const response = await accountService.updateResetLogs(id, payload);
      await resetParent();

      toast({
        title: "All set!",
        description: response.message
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingSave(false);
    }
  };

  const deleteResetLogs = async (id: number, accountId: number) => {
    const payload: DeleteResetLogRequest = { accountId };

    setIsLoadingDelete(true);
    try {
      const response = await accountService.deleteResetLogs(id, payload);
      await resetParent();
      setPasswords((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      toast({
        title: "All set!",
        description: response.message
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const displayResetLogsDate = (raw: unknown) => {
    let date: Date | null = null;

    if (raw instanceof Date) {
      date = raw;
    } else if (typeof raw === "string" || typeof raw === "number") {
      const parsed = new Date(raw);
      if (!isNaN(parsed.getTime())) {
        date = parsed;
      }
    }

    if (!date) {
      return "-";
    }

    return format(date, "dd MMMM yyyy 'at' HH:mm");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative hover:cursor-pointer">
          {failedJobs.length > 0 || resetLogs.length > 0 ? (
            <span className="absolute right-0 animate-pulse w-2 h-2 bg-destructive rounded-full" />
          ) : null}
          <BellIcon className="w-6 h-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full xl:w-3/5 overflow-y-auto max-h-[100dvh]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Notifications</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center xl:text-left">
          Pusat notifikasi terkait update otomatis
        </DialogDescription>

        <div className="flex-1 overflow-auto">
          <Table>
            <TableCaption style={{ captionSide: "top" }}>
              Daftar akun yang gagal diperbarui rank-nya karena error saat
              jadwal update otomatis terakhir.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Account Code</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Nickname</TableHead>
                <TableHead>Failure Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {failedJobs.length > 0 ? (
                failedJobs.map((job, index) => (
                  <TableRow key={job.data.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{job.accountCode}</TableCell>
                    <TableCell>{job.username}</TableCell>
                    <TableCell>{job.data.nickname}</TableCell>
                    <TableCell>{job.failedReason}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No failed jobs during the last execution
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Separator />

          <Table>
            <TableCaption style={{ captionSide: "top" }}>
              Daftar akun yang sudah expire
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Account Code</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Expired At</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resetLogs.length > 0 ? (
                resetLogs.map((log, index) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{log.account.accountCode}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {log.account.username}
                        <CopyIcon
                          size={16}
                          className="text-muted-foreground hover:cursor-pointer"
                          aria-label="Copy username to clipboard"
                          onClick={() => copyToClipboard(log.account.username)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => generateAndSetPassword(log.id)}>
                        Generate Password
                      </Button>
                    </TableCell>
                    <TableCell>
                      {displayResetLogsDate(log.previousExpireAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => saveResetLogs(log.id, log.accountId)}
                          disabled={!passwords[log.id] || isLoadingSave}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          aria-label="Delete reset log"
                          onClick={() => deleteResetLogs(log.id, log.accountId)}
                          disabled={isLoadingDelete}
                        >
                          <XIcon />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No account expired within the last 2 days
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
