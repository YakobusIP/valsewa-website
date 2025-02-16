import { Dispatch, SetStateAction, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { toast } from "@/hooks/useToast";

import { AccountEntityRequest } from "@/types/account.type";
import { MessageResponse } from "@/types/api.type";

import { availabilityStatuses } from "@/lib/constants";
import { AVAILABILITY_STATUS } from "@/lib/enums";
import { cn } from "@/lib/utils";

import { useDebouncedCallback } from "use-debounce";

type Props = {
  id: number;
  availabilityStatus: string;
  setAvailabilityStatus?: Dispatch<SetStateAction<string>>;
  serviceFn?: (
    id: number,
    data: Partial<AccountEntityRequest>
  ) => Promise<MessageResponse>;
  resetParent: () => Promise<void>;
};

export default function AvailabilityStatus({
  id,
  availabilityStatus,
  setAvailabilityStatus,
  serviceFn,
  resetParent
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState(availabilityStatus);

  const selectedStatusColor =
    availabilityStatuses.find((option) => option.value === selectedStatus)
      ?.color || "bg-white";

  const debouncedSubmit = useDebouncedCallback(async () => {
    if (serviceFn) {
      try {
        const response = await serviceFn(id, {
          availabilityStatus: selectedStatus as AVAILABILITY_STATUS
        });

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
      }
    }
  }, 1000);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);

    if (setAvailabilityStatus) {
      setAvailabilityStatus(value);
    } else {
      debouncedSubmit();
    }
  };

  return (
    <Select
      defaultValue={AVAILABILITY_STATUS.AVAILABLE}
      value={selectedStatus}
      onValueChange={handleStatusChange}
    >
      <SelectTrigger
        className={cn("w-[150px] xl:w-[180px]", selectedStatusColor)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availabilityStatuses.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center">{option.label}</div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
