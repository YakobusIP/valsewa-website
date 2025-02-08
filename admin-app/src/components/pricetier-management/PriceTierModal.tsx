import { useEffect, useState } from "react";

import { priceTierService } from "@/services/pricetier.service";

import DataTable from "@/components/data-table/DataTable";
import { priceTierColumns } from "@/components/data-table/table-columns/PriceTierTableColumns";
import PriceTierDetailModal from "@/components/pricetier-management/PriceTierDetailModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { usePriceTier } from "@/hooks/usePriceTier";
import { toast } from "@/hooks/useToast";

import { CircleDollarSignIcon, SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";

export default function PriceTierModal() {
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

  useEffect(() => {
    setPriceTierSearch(debouncedSearch);
  }, [debouncedSearch, setPriceTierSearch]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full xl:w-fit">
          <CircleDollarSignIcon className="w-4 h-4" />
          Price Tiers
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full xl:w-2/5">
        <DialogHeader>
          <DialogTitle>Price Tiers</DialogTitle>
          <DialogDescription>Manage price tiers</DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
