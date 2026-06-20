import { Skeleton } from "@/components/ui/skeleton";

import { VoucherUsageSummary } from "@/types/voucher.type";

import { formatNumeric } from "@/utils/formatCurrency";

type Props = {
  summary: VoucherUsageSummary | null;
  isLoading: boolean;
};

export default function VoucherStatisticsGrid({ summary, isLoading }: Props) {
  const data = [
    {
      title: "Total Usage",
      value: summary?.totalUsage ?? 0
    },
    {
      title: "Total GMV",
      value: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(summary?.totalGmv ?? 0)
    },
    {
      title: "Total Discount Given",
      value: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(summary?.totalDiscountGiven ?? 0)
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {data.map((stats) => (
        <div
          key={stats.title}
          className="flex flex-col border rounded-md p-4 bg-background"
        >
          <p className="font-bold text-sm xl:text-base">{stats.title}</p>

          {isLoading ? (
            <Skeleton className="h-10 w-[200px] mt-2" />
          ) : (
            <p className="font-bold text-2xl xl:text-3xl mt-2">{stats.value}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function formatQuotaDisplay(
  usageCount: number,
  maxGlobalUsage: number | null | undefined
) {
  if (maxGlobalUsage == null) {
    return `${formatNumeric(usageCount)} / Unlimited`;
  }

  return `${formatNumeric(usageCount)} / ${formatNumeric(maxGlobalUsage)}`;
}
