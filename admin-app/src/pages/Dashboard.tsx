import {
  ChangeEventHandler,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useState
} from "react";

import { accountService } from "@/services/account.service";
import { statisticService } from "@/services/statistic.service";

import AccountDetailModal from "@/components/dashboard/AccountDetailModal";
import LogoutButton from "@/components/dashboard/LogoutButton";
import NotificationsModal from "@/components/dashboard/NotificationsModal";
import SortComponent from "@/components/dashboard/SortComponent";
import StatisticsGrid from "@/components/dashboard/StatisticsGrid";
import VirtualizedDataTable from "@/components/data-table/VirtualizedDataTable";
import { accountColumns } from "@/components/data-table/table-columns/AccountTableColumns";
import PriceTierModal from "@/components/pricetier-management/PriceTierModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "@/hooks/useToast";

import { AccountEntity, FailedJobs, ResetLogs } from "@/types/account.type";
import { MetadataResponse } from "@/types/api.type";
import { StatisticResponse } from "@/types/statistic.type";

import { SORT_ORDER } from "@/lib/enums";

import { CirclePlusIcon, SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";

const PAGINATION_SIZE = 100;

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

export default function Dashboard() {
  const [openAccountDetail, setOpenAccountDetail] = useState(false);

  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
  const [statistics, setStatistics] = useState<StatisticResponse>();

  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const [accountList, setAccountList] = useState<AccountEntity[]>([]);
  const [accountMetadata, setAccountMetadata] = useState<MetadataResponse>();
  const [selectedAccountRows, setSelectedAccountRows] = useState({});
  const [accountListPage, setAccountListPage] = useState(1);

  const [isLoadingDeleteAccount, setIsLoadingDeleteAccount] = useState(false);

  const [failedJobs, setFailedJobs] = useState<FailedJobs[]>([]);
  const [resetLogs, setResetLogs] = useState<ResetLogs[]>([]);

  const [searchAccount, setSearchAccount] = useState("");
  const [sortBy, setSortBy] = useState("id_tier");
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASCENDING);
  const [debouncedSearch] = useDebounce(searchAccount, 1000);

  const handleSort = (key: string) => {
    setSortBy(key);
    setSortOrder((prev) =>
      sortBy === key
        ? prev === SORT_ORDER.ASCENDING
          ? SORT_ORDER.DESCENDING
          : SORT_ORDER.ASCENDING
        : SORT_ORDER.ASCENDING
    );
  };

  const fetchStatistics = useCallback(async () => {
    setIsLoadingStatistics(true);
    try {
      const data = await statisticService.fetchAll();
      setStatistics(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingStatistics(false);
    }
  }, []);

  const fetchAllAccounts = useCallback(async () => {
    setIsLoadingAccount(true);
    try {
      const response = await accountService.fetchAll(
        accountListPage,
        PAGINATION_SIZE,
        debouncedSearch,
        sortBy,
        sortOrder
      );
      setAccountList(response.data);
      setAccountMetadata(response.metadata);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingAccount(false);
    }
  }, [accountListPage, debouncedSearch, sortBy, sortOrder]);

  const deleteManyAccounts = async () => {
    setIsLoadingDeleteAccount(true);
    const deletedIds = Object.keys(selectedAccountRows).map((id) =>
      parseInt(id)
    );
    try {
      await accountService.deleteMany(deletedIds);
      fetchAllAccounts();
      toast({
        title: "All set!",
        description: `${deletedIds.length} account(s) deleted successfully`
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
      setSelectedAccountRows({});
      setIsLoadingDeleteAccount(false);
    }
  };

  const fetchFailedJobs = async () => {
    try {
      const response = await accountService.fetchFailedJobs();
      setFailedJobs(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setSelectedAccountRows({});
      setIsLoadingDeleteAccount(false);
    }
  };

  const fetchResetLogs = useCallback(async () => {
    try {
      const response = await accountService.fetchResetLogs();
      setResetLogs(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setSelectedAccountRows({});
      setIsLoadingDeleteAccount(false);
    }
  }, []);

  const resetParent = useCallback(async () => {
    await fetchAllAccounts();
    await fetchStatistics();
  }, [fetchAllAccounts, fetchStatistics]);

  const resetFetchLogsParent = useCallback(async () => {
    await fetchResetLogs();
    await fetchAllAccounts();
  }, [fetchResetLogs, fetchAllAccounts]);

  useEffect(() => {
    fetchStatistics();
    fetchAllAccounts();
  }, [fetchStatistics, fetchAllAccounts]);

  useEffect(() => {
    fetchFailedJobs();
  }, []);

  useEffect(() => {
    fetchResetLogs();
  }, [fetchResetLogs]);

  useEffect(() => {
    document.title = "Dashboard | Valsewa Admin";
  }, []);

  return (
    <Fragment>
      <main className="relative min-h-[100dvh]">
        <div className="container flex flex-col mx-auto p-4 xl:p-8 gap-4">
          <h1>Dashboard</h1>
          <StatisticsGrid
            statistics={statistics}
            isLoadingStatistics={isLoadingStatistics}
          />
          <VirtualizedDataTable
            columns={accountColumns(resetParent)}
            data={accountList}
            rowSelection={selectedAccountRows}
            setRowSelection={setSelectedAccountRows}
            deleteData={deleteManyAccounts}
            isLoadingData={isLoadingAccount}
            isLoadingDeleteData={isLoadingDeleteAccount}
            page={accountListPage}
            setPage={setAccountListPage}
            metadata={accountMetadata}
            height="550px"
            leftSideComponent={
              <SearchInput
                value={searchAccount}
                onChange={(e) => setSearchAccount(e.target.value)}
              />
            }
            rightSideComponent={
              <Fragment>
                <SortComponent
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />
                <PriceTierModal />
                <Button
                  className="w-full xl:w-fit"
                  onClick={() => setOpenAccountDetail(true)}
                >
                  <CirclePlusIcon />
                  Add New Account
                </Button>
              </Fragment>
            }
          />
        </div>
        <div className="absolute top-4 right-4 flex items-center justify-center gap-4">
          <NotificationsModal
            failedJobs={failedJobs}
            resetLogs={resetLogs}
            resetParent={resetFetchLogsParent}
          />
          <LogoutButton />
        </div>
      </main>
      <AccountDetailModal
        open={openAccountDetail}
        onOpenChange={setOpenAccountDetail}
        mode="add"
        resetParent={resetParent}
      />
    </Fragment>
  );
}
