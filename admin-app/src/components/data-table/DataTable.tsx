import { Dispatch, ReactNode, SetStateAction } from "react";

import DataDeleteButton from "@/components/data-table/DataDeleteButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import useWideScreen from "@/hooks/useWideScreen";

import { MetadataResponse } from "@/types/api.type";

import {
  ColumnDef,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Loader2Icon } from "lucide-react";

interface Identifiable {
  id: number;
}

interface DataTableProps<TData extends Identifiable, TValue> {
  title?: string;
  leftSideComponent?: ReactNode;
  rightSideComponent?: ReactNode;
  filterSortComponent?: ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  deleteData: () => Promise<void>;
  isLoadingData: boolean;
  isLoadingDeleteData: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  metadata?: MetadataResponse;
}

export default function DataTable<TData extends Identifiable, TValue>({
  leftSideComponent,
  rightSideComponent,
  columns,
  data,
  rowSelection,
  setRowSelection,
  deleteData,
  isLoadingData,
  isLoadingDeleteData,
  page,
  setPage,
  metadata
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      pagination: {
        pageIndex: page - 1,
        pageSize: metadata?.limit || 10
      }
    },
    manualPagination: true,
    pageCount: metadata?.pageCount || 0,
    rowCount: metadata?.total || 0
  });

  const isWideScreen = useWideScreen();

  return (
    <div>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-2">
          <div className="flex gap-2 w-full xl:w-fit">{leftSideComponent}</div>
          <div className="flex flex-col xl:flex-row gap-2 items-end w-full xl:w-fit justify-end xl:justify-normal">
            {rightSideComponent}
            <DataDeleteButton
              rowSelection={rowSelection}
              deleteData={deleteData}
              isLoadingDeleteData={isLoadingDeleteData}
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        minWidth: header.column.columnDef.size,
                        maxWidth: header.column.columnDef.size
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoadingData ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="inline-flex items-center justify-center gap-2">
                    <Loader2Icon className="w-4 h-4 animate-spin" /> Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        minWidth: cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.size
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {Object.keys(rowSelection).length} of {metadata?.total} row(s)
          selected.
        </div>
        <div className="flex items-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="inline-flex items-center border border-input rounded-md px-3 h-9 text-sm font-medium">
            {page} {isWideScreen && `/ ${metadata?.pageCount || 0}`}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
