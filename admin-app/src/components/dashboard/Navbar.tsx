import { ChangeEventHandler, memo, useEffect, useState } from "react";

import LogoutButton from "@/components/dashboard/LogoutButton";
import { Input } from "@/components/ui/input";

import { FailedJobs, ResetLogs } from "@/types/account.type";

import { SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";

import NotificationsModal from "./NotificationsModal";

type Props = {
  onDebounced: (q: string) => void;
  failedJobs: FailedJobs[];
  resetLogs: ResetLogs[];
  resetParent: () => Promise<void>;
};

const SearchInput = memo(
  ({
    value,
    onChange
  }: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  }) => (
    <Input
      startIcon={<SearchIcon size={18} className="text-muted-foreground" />}
      placeholder="Search account..."
      parentClassName="w-full xl:w-[32rem]"
      value={value}
      onChange={onChange}
    />
  )
);

export default function Navbar({
  onDebounced,
  failedJobs,
  resetLogs,
  resetParent
}: Props) {
  const [raw, setRaw] = useState("");
  const [debounced] = useDebounce(raw, 1000);

  useEffect(() => {
    onDebounced(debounced);
  }, [debounced, onDebounced]);

  return (
    <div className="flex items-center top-0 sticky justify-between p-4 border-b bg-background z-50 gap-4">
      <SearchInput value={raw} onChange={(e) => setRaw(e.target.value)} />
      <div className="flex items-center gap-4">
        <NotificationsModal
          failedJobs={failedJobs}
          resetLogs={resetLogs}
          resetParent={resetParent}
        />
        <LogoutButton />
      </div>
    </div>
  );
}
