"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { Skeleton } from "@/components/ui/skeleton";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filterOptions?: Record<
    string,
    {
      placeholder: string;
      options: { label: string; value: string }[];
    }
  >;
  searchPlaceholder?: string;
  isLoading?: boolean;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  filterOptions,
  searchPlaceholder = "Cari...",
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const { page, search, filters, updateQuery, resetFilters } =
    useDataTableQueryParams();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: meta.totalPages,
  });
  const isLastPage = page === meta.totalPages || data.length === 0;
  const isFirstPage = page === 1;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => updateQuery("search", e.target.value)}
          className="w-full text-sm"
        />

        {filterOptions &&
          Object.entries(filterOptions).map(([key, config]) => (
            <Select
              key={key}
              value={filters?.[key] || ""}
              onValueChange={(val) => updateQuery(key, val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={config.placeholder || `Filter ${key}`}
                />
              </SelectTrigger>
              <SelectContent>
                {config.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full md:w-fit"
        >
          Reset
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(meta.limit)].map((_, idx) => (
                <TableRow key={`skeleton-${idx}`}>
                  {columns.map((_, colIdx) => (
                    <TableCell key={colIdx}>
                      <Skeleton className="h-4 w-full rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                <TableCell colSpan={columns.length} className="text-center">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-row justify-between items-center mt-5">
        <h1 className="text-sm">
          Halaman {page} dari {meta.totalPages}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuery("page", String(page - 1))}
            disabled={isFirstPage}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuery("page", String(page + 1))}
            disabled={isLastPage}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
