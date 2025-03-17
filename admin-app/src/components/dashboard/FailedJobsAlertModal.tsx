import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { FailedJobs } from "@/types/account.type";

import { BellIcon } from "lucide-react";

type Props = {
  failedJobs: FailedJobs[];
};

export default function FailedJobsAlertModal({ failedJobs }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative hover:cursor-pointer">
          {failedJobs.length > 0 ? (
            <span className="absolute right-0 animate-pulse w-2 h-2 bg-destructive rounded-full" />
          ) : null}
          <BellIcon className="w-6 h-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="w-full xl:w-4/5 overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Failed Update Rank Jobs List</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Daftar akun yang gagal diperbarui rank-nya karena error saat jadwal
          update otomatis terakhir.
        </DialogDescription>
        <Table>
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
      </DialogContent>
    </Dialog>
  );
}
