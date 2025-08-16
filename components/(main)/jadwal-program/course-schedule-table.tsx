"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-get-data";
import { Skeleton } from "@/components/ui/skeleton";
import { TCourseBatch } from "@/components/(dashboard)/kursus/gelombang/_types/course-batch-type";
import { formatPeriode } from "../kursus/_libs/format-periode";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { DAY_OPTIONS } from "@/components/(dashboard)/kursus/gelombang/_constants/day-options";

export default function CourseScheduleTable() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [search, setSearch] = React.useState("");
  const [courseType, setCourseType] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const queryParams = new URLSearchParams({
    ...(courseType && courseType !== "semua" && { course_type: courseType }),
    ...(search && { q: search }),
    page: page.toString(),
    limit: limit.toString(),
  });

  const queryString = queryParams.toString();

  const { data, isLoading, isError } = useGetData({
    queryKey: ["batches", slug ?? ""],
    dataProtected: slug
      ? `courses/${slug}/batches?${queryString}`
      : `batches?${queryString}`,
    options: {
      enabled: true,
    },
  });

  const result = data?.data;
  const batches: TCourseBatch[] = result?.data ?? [];
  const totalPages: number = result?.meta?.total_pages ?? 1;

  const handleReset = () => {
    setSearch("");
    setCourseType("");
    setPage(1);
  };

  return (
    <section className="min-h-[calc(80vh-4rem)]">
      <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-2">Jadwal Program</h2>
        <p className="text-muted-foreground md:max-w-2xl">
          Telusuri jadwal kursus berdasarkan kategori kelas atau judul kursus.
        </p>

        <div className="my-4 flex items-start gap-3 rounded-md border border-orange-200 bg-orange-50 p-4 text-sm text-muted-foreground">
          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-orange-600">
              Tanggal mulai bersifat tentatif.
            </strong>{" "}
            Jadwal dapat berubah tergantung pada jumlah peserta yang mendaftar
            pada gelombang ini. Silakan daftar lebih awal untuk mengamankan
            tempat Kamu.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-end">
          <div className="flex-1">
            <Select
              value={courseType || "semua"}
              onValueChange={(val) => {
                setCourseType(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="semua">Semua Kategori</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Input
            type="text"
            placeholder="Cari nama kursus..."
            className="flex-1"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <div className="grid w-full [&>div]:border [&>div]:rounded">
          <Table>
            <TableHeader>
              <TableRow className="sticky top-0 bg-background">
                <TableHead className="pl-4">Nama Kursus</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Hari</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi / Platform</TableHead>
                <TableHead>Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-destructive"
                  >
                    Gagal memuat data. Silakan coba lagi.
                  </TableCell>
                </TableRow>
              ) : batches.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                batches.map((item) => (
                  <TableRow key={item.id} className="odd:bg-muted/50">
                    <TableCell className="pl-4 font-medium">
                      {item.title}
                    </TableCell>
                    <TableCell>
                      {formatPeriode(item.start_at, item.end_at)}
                    </TableCell>
                    <TableCell>
                      {item.days
                        .map((d) => {
                          const indo = DAY_OPTIONS.find(
                            (opt) => opt.value === d.day
                          );
                          return indo?.label || d.day;
                        })
                        .join(" & ")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="capitalize text-xs font-medium"
                      >
                        {item.course_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.course_type === "online"
                        ? "Online (Zoom/Google Meet)"
                        : item.room}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="purple"
                        size="sm"
                        className="text-xs"
                        asChild
                      >
                        <Link href={`/kursus/${item.slug}`}>Lihat Detail</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <Pagination className="mt-8 justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.max(p - 1, 1));
                  }}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                const isActive = pageNumber === page;
                if (
                  pageNumber !== 1 &&
                  pageNumber !== totalPages &&
                  Math.abs(pageNumber - page) > 1
                ) {
                  if (
                    (pageNumber === page - 2 && page > 3) ||
                    (pageNumber === page + 2 && page < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                }

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={isActive}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.min(p + 1, totalPages));
                  }}
                  className={
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
}
