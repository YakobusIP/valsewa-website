import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  statistics: { completedBookingCount: number; totalIncome: number };
  isLoading: boolean;
};

export default function TransactionStatisticsGrid({
  statistics,
  isLoading
}: Props) {
  const data = [
    {
      title: "Accounts Rented",
      value: statistics?.completedBookingCount
    },
    {
      title: "Total Income",
      value: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(statistics?.totalIncome)
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
      {data.map((stats) => (
        <div
          key={stats.title}
          className="flex flex-col border rounded-md p-4 bg-background"
        >
          <p className="font-bold text-sm xl:text-base">{stats.title}</p>

          {isLoading ? (
            <Skeleton className="h-10 w-[200px] mt-2" />
          ) : (
            <p className="font-bold text-2xl xl:text-4xl mt-2">{stats.value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
