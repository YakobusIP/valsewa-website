import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { accountService } from "@/services/account.service";
import { statisticService } from "@/services/statistic.service";

import CarouselManagementModal from "@/components/carousel-management/CarouselManagementModal";
import AccountDetailModal from "@/components/dashboard/AccountDetailModal";
import Navbar from "@/components/dashboard/Navbar";
import SortComponent from "@/components/dashboard/SortComponent";
import StatisticsGrid from "@/components/dashboard/StatisticsGrid";
import DataTable from "@/components/data-table/DataTable";
import { accountColumns } from "@/components/data-table/table-columns/AccountTableColumns";
import PriceTierModal from "@/components/pricetier-management/PriceTierModal";
import SkinManagementModal from "@/components/skin-management/SkinManagementModal";
import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/useToast";

import { AccountEntity, FailedJobs, ResetLogs } from "@/types/account.type";
import { MetadataResponse } from "@/types/api.type";
import { StatisticResponse } from "@/types/statistic.type";

import { SORT_ORDER } from "@/lib/enums";

import { SkinProvider } from "@/contexts/SkinContext";
import { CirclePlusIcon } from "lucide-react";

const PAGINATION_SIZE = 100;

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
        searchAccount,
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
  }, [accountListPage, searchAccount, sortBy, sortOrder]);

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
    await fetchResetLogs();
  }, [fetchAllAccounts, fetchStatistics, fetchResetLogs]);

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

  const columns = useMemo(() => accountColumns(resetParent), [resetParent]);

  return (
    <Fragment>
      <main className="min-h-[100dvh]">
        <Navbar
          onDebounced={(q) => setSearchAccount(q)}
          failedJobs={failedJobs}
          resetLogs={resetLogs}
          resetParent={resetParent}
        />
        <div className="container flex flex-col mx-auto p-4 xl:p-8 gap-4">
          <h1>Dashboard</h1>
          <StatisticsGrid
            statistics={statistics}
            isLoadingStatistics={isLoadingStatistics}
          />
          <DataTable
            columns={columns}
            data={accountList}
            rowSelection={selectedAccountRows}
            setRowSelection={setSelectedAccountRows}
            deleteData={deleteManyAccounts}
            isLoadingData={isLoadingAccount}
            isLoadingDeleteData={isLoadingDeleteAccount}
            page={accountListPage}
            setPage={setAccountListPage}
            metadata={accountMetadata}
            rightSideComponent={
              <Fragment>
                <SortComponent
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />
                <SkinProvider>
                  <SkinManagementModal />
                </SkinProvider>
                <PriceTierModal />
                <CarouselManagementModal />
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
