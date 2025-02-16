import { Skeleton } from "@/components/ui/skeleton";

import { StatisticResponse } from "@/types/statistic.type";

type Props = {
  statistics?: StatisticResponse;
  isLoadingStatistics: boolean;
};

export default function StatisticsGrid({
  statistics,
  isLoadingStatistics
}: Props) {
  const data = [
    {
      title: "Currently Rented Ratio",
      value: `${statistics?.rentedRatio.toFixed(2)}%`
    },
    {
      title: "Available Accounts",
      value: statistics?.availableAccounts
    },
    {
      title: "Rented Accounts",
      value: statistics?.inUseAccounts
    },
    {
      title: "Total Accounts",
      value: statistics?.totalAccounts
    }
  ];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 grid-rows-2 xl:grid-rows-1 gap-2">
      {data.map((stats) => (
        <div className="flex flex-col border rounded-md p-4" key={stats.title}>
          <p className="font-bold text-sm xl:text-base">{stats.title}</p>
          {isLoadingStatistics ? (
            <Skeleton className="h-10 w-[150px]" />
          ) : (
            <p className="font-bold text-2xl xl:text-4xl">{stats.value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
