import { useEffect, useState } from "react";

import { priceTierService } from "@/services/pricetier.service";

import DataTable from "@/components/data-table/DataTable";
import { priceTierColumns } from "@/components/data-table/table-columns/PriceTierTableColumns";
import PriceTierDetailModal from "@/components/pricetier-management/PriceTierDetailModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { usePriceTier } from "@/hooks/usePriceTier";
import { toast } from "@/hooks/useToast";

import { SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";

export default function PriceTierModal({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    priceTierList,
    priceTierMetadata,
    isLoadingPriceTier,
    priceTierListPage,
    setPriceTierListPage,
    setPriceTierSearch,
    refetchPriceTier
  } = usePriceTier();

  const [isLoadingDeletePriceTier, setIsLoadingDeletePriceTier] =
    useState(false);
  const [selectedPriceTierRows, setSelectedPriceTierRows] = useState({});

  const [localSearch, setLocalSearch] = useState("");
  const [debouncedSearch] = useDebounce(localSearch, 1000);

  useEffect(() => {
    if (!open) return;
    setPriceTierSearch(debouncedSearch);
    setPriceTierListPage(1);
  }, [debouncedSearch, setPriceTierSearch, setPriceTierListPage, open]);

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setLocalSearch("");
      setPriceTierSearch("");
      setPriceTierListPage(1);
      setSelectedPriceTierRows({});
    }
  };

  const deleteManyPriceTiers = async () => {
    setIsLoadingDeletePriceTier(true);
    const deletedIds = Object.keys(selectedPriceTierRows).map((id) =>
      parseInt(id)
    );
    try {
      await priceTierService.deleteMany(deletedIds);
      refetchPriceTier();
      toast({
        title: "All set!",
        description: `${deletedIds.length} price tier(s) deleted successfully`
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
      setSelectedPriceTierRows({});
      setIsLoadingDeletePriceTier(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex flex-col w-full xl:w-2/5 overflow-y-auto max-h-[100dvh]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Price Tiers</DialogTitle>
          <DialogDescription>Manage price tiers</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <DataTable
            columns={priceTierColumns}
            data={priceTierList}
            rowSelection={selectedPriceTierRows}
            setRowSelection={setSelectedPriceTierRows}
            isLoadingData={isLoadingPriceTier}
            deleteData={deleteManyPriceTiers}
            isLoadingDeleteData={isLoadingDeletePriceTier}
            page={priceTierListPage}
            setPage={setPriceTierListPage}
            metadata={priceTierMetadata}
            leftSideComponent={
              <Input
                startIcon={
                  <SearchIcon size={18} className="text-muted-foreground" />
                }
                placeholder="Search price tier..."
                parentClassName="w-full xl:w-64"
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            }
            rightSideComponent={<PriceTierDetailModal mode="add" />}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
