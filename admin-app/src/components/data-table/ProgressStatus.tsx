import { Dispatch, SetStateAction, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { useToast } from "@/hooks/useToast";

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
    availabilityStatus: AVAILABILITY_STATUS
  ) => Promise<void>;
};

export default function ProgressStatus({
  id,
  availabilityStatus,
  setAvailabilityStatus,
  serviceFn
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState(availabilityStatus);
  const toast = useToast();

  const selectedStatusColor =
    availabilityStatuses.find((option) => option.value === selectedStatus)
      ?.color || "bg-white";

  const debouncedSubmit = useDebouncedCallback(async () => {
    if (serviceFn) {
      const response = await serviceFn(
        id,
        selectedStatus as AVAILABILITY_STATUS
      );

      // if (response.success) {
      //   toast.toast({
      //     title: "All set!",
      //     description: response.data.message
      //   });
      // } else {
      //   toast.toast({
      //     variant: "destructive",
      //     title: "Uh oh! Something went wrong",
      //     description: response.error
      //   });
      // }
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
      <SelectTrigger className={cn("w-[180px]", selectedStatusColor)}>
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
