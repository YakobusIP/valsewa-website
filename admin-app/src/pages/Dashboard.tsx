import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { accountService } from "@/services/account.service";

import AccountDetailModal from "@/components/dashboard/AccountDetailModal";
import PriceTierDetailModal from "@/components/dashboard/PriceTierDetailModal";
import StatisticsGrid from "@/components/dashboard/StatisticsGrid";
import { accountColumns } from "@/components/data-table/AccountTableColumns";
import DataTable from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useToast } from "@/hooks/useToast";

import { AccountEntity } from "@/types/account.type";
import { PaginationMetadata } from "@/types/api.type";

import { CirclePlusIcon, SearchIcon } from "lucide-react";

export default function Dashboard() {
  const toast = useToast();
  const toastRef = useRef(toast.toast);

  const [openPriceTierDetail, setOpenPriceTierDetail] = useState(false);
  const [openAccountDetail, setOpenAccountDetail] = useState(false);

  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const [accountList, setAccountList] = useState<AccountEntity[]>([]);
  const [accountMetadata, setAccountMetadata] = useState<PaginationMetadata>();
  const [selectedAccountRows, setSelectedAccountRows] = useState({});
  const [accountListPage, setAccountListPage] = useState(1);

  const [isLoadingDeleteAccount, setIsLoadingDeleteAccount] = useState(false);

  const fetchAllAccounts = useCallback(async () => {
    setIsLoadingAccount(true);
    try {
      const [accountResponse, metadataResponse] =
        await accountService.fetchAll();
      setAccountList(accountResponse);
      setAccountMetadata(metadataResponse);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toastRef.current({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingAccount(false);
    }
  }, []);

  const deleteManyAccounts = async () => {
    setIsLoadingDeleteAccount(true);
    const deletedIds = Object.keys(selectedAccountRows);
    try {
      await accountService.deleteMany(deletedIds);
      fetchAllAccounts();
      toastRef.current({
        title: "All set!",
        description: `${deletedIds.length} account(s) deleted successfully`
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toastRef.current({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setSelectedAccountRows({});
      setIsLoadingDeleteAccount(false);
    }
  };

  useEffect(() => {
    fetchAllAccounts();
  }, [fetchAllAccounts]);

  return (
    <Fragment>
      <main className="container flex flex-col mx-auto min-h-[100dvh] p-4 xl:p-8 gap-4">
        <h1>Dashboard</h1>
        <StatisticsGrid />
        <DataTable
          columns={accountColumns(fetchAllAccounts)}
          data={accountList}
          rowSelection={selectedAccountRows}
          setRowSelection={setSelectedAccountRows}
          isLoadingData={isLoadingAccount}
          deleteData={deleteManyAccounts}
          isLoadingDeleteData={isLoadingDeleteAccount}
          page={accountListPage}
          setPage={setAccountListPage}
          metadata={accountMetadata}
          leftSideComponent={
            <Input
              startIcon={
                <SearchIcon size={18} className="text-muted-foreground" />
              }
              placeholder="Search account..."
              parentClassName="w-full xl:w-2/5"
            />
          }
          rightSideComponent={
            <div className="flex flex-col xl:flex-row items-center justify-center gap-2 w-full xl:w-fit">
              <Button
                className="w-full xl:w-fit"
                onClick={() => setOpenPriceTierDetail(true)}
              >
                <CirclePlusIcon />
                Add New Price Tier
              </Button>
              <Button
                className="w-full xl:w-fit"
                onClick={() => setOpenAccountDetail(true)}
              >
                <CirclePlusIcon />
                Add New Account
              </Button>
            </div>
          }
        />
      </main>
      <PriceTierDetailModal
        open={openPriceTierDetail}
        onOpenChange={setOpenPriceTierDetail}
        mode="add"
      />
      <AccountDetailModal
        open={openAccountDetail}
        onOpenChange={setOpenAccountDetail}
        mode="add"
        resetParent={fetchAllAccounts}
      />
    </Fragment>
  );
}
