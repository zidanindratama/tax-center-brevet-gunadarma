"use client";

import { useGetData } from "@/hooks/use-get-data";
import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { TMyCourse } from "./_types/my-course-type";
import { MyCourseCard } from "./kelas-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const KelasSayaDatatable = () => {
  const { page, search, filters, updateQuery, resetFilters } =
    useDataTableQueryParams();

  const queryParams = new URLSearchParams({
    ...(search && { search }),
    page: String(page),
    ...filters,
  });
  const queryString = queryParams.toString();

  const { data, isLoading } = useGetData({
    queryKey: ["kelas-saya", queryString],
    dataProtected: `me/batches?${queryString}`,
  });

  const myCourses: TMyCourse[] = data?.data.data ?? [];
  const meta = data?.data.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
  };

  const totalPages = meta.total_pages;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Kelas Saya</h1>

      <div className="flex flex-col md:flex-row gap-2">
        <Input
          placeholder="Cari Nama Kursus"
          value={search}
          onChange={(e) => updateQuery("search", e.target.value)}
          className="w-full text-sm"
        />

        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : myCourses.length === 0 ? (
        <p>Tidak ada kelas yang ditemukan.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {myCourses.map((course) => (
              <MyCourseCard key={course.id} course={course} />
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  aria-label="Go to previous page"
                  size="default"
                  className="gap-1 pl-2.5"
                  onClick={() =>
                    page > 1 && updateQuery("page", String(page - 1))
                  }
                >
                  <ChevronsLeft className="h-4 w-4" />
                  <span>Previous</span>
                </PaginationLink>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === page}
                    onClick={() => updateQuery("page", String(p))}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationLink
                  href="#"
                  aria-label="Go to next page"
                  size="default"
                  className="gap-1 pr-2.5"
                  onClick={() =>
                    page < totalPages && updateQuery("page", String(page + 1))
                  }
                >
                  <span>Next</span>
                  <ChevronsRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default KelasSayaDatatable;
