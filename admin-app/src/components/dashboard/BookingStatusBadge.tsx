import { Badge } from "@/components/ui/badge";

import { BOOKING_STATUS } from "@/types/booking.type";

const statusClassMap: Record<BOOKING_STATUS, string> = {
  HOLD: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
  RESERVED: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
  EXPIRED: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
  FAILED: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  COMPLETED: "bg-green-500/10 text-green-600 hover:bg-green-500/20"
};

type BookingStatusBadgeProps = {
  status: BOOKING_STATUS | string;
};

export default function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const className =
    statusClassMap[status as BOOKING_STATUS] ??
    "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";

  return <Badge className={className}>{status}</Badge>;
}
