import { Fragment, useCallback, useEffect, useState } from "react";

import { accountService } from "@/services/account.service";

import AccountDetailModal from "@/components/dashboard/AccountDetailModal";
import StatisticsGrid from "@/components/dashboard/StatisticsGrid";
import DataTable from "@/components/data-table/DataTable";
import { accountColumns } from "@/components/data-table/table-columns/AccountTableColumns";
import PriceTierModal from "@/components/pricetier-management/PriceTierModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "@/hooks/useToast";

import { AccountEntity } from "@/types/account.type";
import { MetadataResponse } from "@/types/api.type";

import { CirclePlusIcon, SearchIcon } from "lucide-react";

export default function Dashboard() {
  const [openAccountDetail, setOpenAccountDetail] = useState(false);

  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const [accountList, setAccountList] = useState<AccountEntity[]>([]);
  const [accountMetadata, setAccountMetadata] = useState<MetadataResponse>();
  const [selectedAccountRows, setSelectedAccountRows] = useState({});
  const [accountListPage, setAccountListPage] = useState(1);

  const [isLoadingDeleteAccount, setIsLoadingDeleteAccount] = useState(false);

  const fetchAllAccounts = useCallback(async () => {
    setIsLoadingAccount(true);
    try {
      const response = await accountService.fetchAll(1);
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
  }, []);

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
              <PriceTierModal />
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
      <AccountDetailModal
        open={openAccountDetail}
        onOpenChange={setOpenAccountDetail}
        mode="add"
        resetParent={fetchAllAccounts}
      />
    </Fragment>
  );
}
