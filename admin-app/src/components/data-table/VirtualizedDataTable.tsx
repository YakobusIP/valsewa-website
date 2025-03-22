import {
  Dispatch,
  Fragment,
  HTMLAttributes,
  ReactNode,
  SetStateAction
} from "react";

import DataDeleteButton from "@/components/data-table/DataDeleteButton";
import { Button } from "@/components/ui/button";
import {
  TableCell,
  TableComponent,
  TableHead,
  TableRow
} from "@/components/ui/table";

import useWideScreen from "@/hooks/useWideScreen";

import { MetadataResponse } from "@/types/api.type";

import {
  ColumnDef,
  Row,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { TableVirtuoso } from "react-virtuoso";

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
  height: string;
}

const TableRowComponent = <TData,>(rows: Row<TData>[]) =>
  function getTableRow(props: HTMLAttributes<HTMLTableRowElement>) {
    // @ts-expect-error data-index is a valid attribute
    const index = props["data-index"];
    const row = rows[index];

    if (!row) return null;

    return (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        {...props}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    );
  };

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
  metadata,
  height
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

  const { rows } = table.getCoreRowModel();
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
      {isLoadingData ? (
        <div className="flex items-center justify-center gap-2 p-4 border rounded-md bg-muted/20">
          <Loader2Icon className="h-4 w-4 animate-spin text-primary" />
          <p className="text-sm">Loading data...</p>
        </div>
      ) : table.getRowModel().rows?.length === 0 ? (
        <div className="flex items-center justify-center gap-2 p-4 border rounded-md bg-muted/20">
          <AlertCircleIcon className="h-4 w-4 text-destructive" />
          <p className="text-sm">No results!</p>
        </div>
      ) : (
        <Fragment>
          <div className="rounded-md border">
            <TableVirtuoso
              style={{ height }}
              totalCount={rows.length}
              components={{
                Table: TableComponent,
                TableRow: TableRowComponent(rows)
              }}
              fixedHeaderContent={() =>
                table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    className="bg-card hover:bg-muted"
                    key={headerGroup.id}
                  >
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
                ))
              }
            />
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
        </Fragment>
      )}
    </div>
  );
}
