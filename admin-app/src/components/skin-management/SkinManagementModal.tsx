import { useEffect, useState } from "react";

import { skinService } from "@/services/skin.service";

import DataTable from "@/components/data-table/DataTable";
import { skinColumns } from "@/components/data-table/table-columns/SkinTableColumns";
import SkinDetailModal from "@/components/skin-management/SkinDetailModal";
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

import { useSkin } from "@/hooks/useSkin";
import { toast } from "@/hooks/useToast";

import { Paintbrush, SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";

export default function SkinManagementModal() {
  const {
    skinList,
    skinMetadata,
    isLoadingSkin,
    skinListPage,
    setSkinListPage,
    setSkinSearch,
    refetchSkin
  } = useSkin();

  const [isLoadingDeleteSkin, setIsLoadingDeleteSkin] = useState(false);
  const [selectedSkinRows, setSelectedSkinRows] = useState({});

  const [localSearch, setLocalSearch] = useState("");
  const [debouncedSearch] = useDebounce(localSearch, 1000);

  const deleteManySkins = async () => {
    setIsLoadingDeleteSkin(true);
    const deletedIds = Object.keys(selectedSkinRows).map((id) => parseInt(id));
    try {
      await skinService.deleteMany(deletedIds);
      refetchSkin();
      toast({
        title: "All set!",
        description: `${deletedIds.length} skin deleted successfully`
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
      setSelectedSkinRows({});
      setIsLoadingDeleteSkin(false);
    }
  };

  useEffect(() => {
    setSkinSearch(debouncedSearch);
    setSkinListPage(1);
  }, [debouncedSearch, setSkinSearch, setSkinListPage]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full xl:w-fit">
          <Paintbrush className="w-4 h-4" />
          Skin Management
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full xl:w-2/5 overflow-y-auto max-h-[100dvh]">
        <DialogHeader>
          <DialogTitle>Skin Management</DialogTitle>
          <DialogDescription>Manage all skins</DialogDescription>
        </DialogHeader>
        <DataTable
          columns={skinColumns}
          data={skinList}
          rowSelection={selectedSkinRows}
          setRowSelection={setSelectedSkinRows}
          isLoadingData={isLoadingSkin}
          deleteData={deleteManySkins}
          isLoadingDeleteData={isLoadingDeleteSkin}
          page={skinListPage}
          setPage={setSkinListPage}
          metadata={skinMetadata}
          leftSideComponent={
            <Input
              startIcon={
                <SearchIcon size={18} className="text-muted-foreground" />
              }
              placeholder="Search skin..."
              parentClassName="w-full xl:w-64"
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          }
          rightSideComponent={<SkinDetailModal mode="add" />}
        />
      </DialogContent>
    </Dialog>
  );
}
