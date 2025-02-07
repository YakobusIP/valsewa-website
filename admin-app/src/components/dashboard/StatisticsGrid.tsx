export default function StatisticsGrid() {
  const statistics = [
    {
      title: "Currently Rented Ratio",
      value: "31.32%"
    },
    {
      title: "Available Accounts",
      value: "57"
    },
    {
      title: "Rented Accounts",
      value: "26"
    },
    {
      title: "Total Accounts",
      value: "83"
    }
  ];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 grid-rows-2 xl:grid-rows-1 gap-2">
      {statistics.map((stats) => (
        <div className="flex flex-col border rounded-md p-4" key={stats.title}>
          <p className="font-bold text-sm xl:text-base">{stats.title}</p>
          <p className="font-bold text-2xl xl:text-4xl">{stats.value}</p>
        </div>
      ))}
    </div>
  );
}
