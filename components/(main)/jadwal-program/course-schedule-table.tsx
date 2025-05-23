"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { courseSchedules } from "@/lib/data/course-schedules";
import { formatPeriode } from "./_libs/format-periode";
import Link from "next/link";
import * as React from "react";
import { Badge } from "@/components/ui/badge";

export default function CourseScheduleTable() {
  const [programFilter, setProgramFilter] = React.useState("");
  const [kategoriFilter, setKategoriFilter] = React.useState("");
  const [monthFilter, setMonthFilter] = React.useState("");
  const [search, setSearch] = React.useState("");

  const filteredData = courseSchedules.filter((item) => {
    const matchesProgram =
      programFilter === "" ||
      programFilter === "semua" ||
      item.program === programFilter;

    const matchesKategori =
      kategoriFilter === "" ||
      kategoriFilter === "semua" ||
      item.kategori === kategoriFilter;

    const matchesMonth =
      monthFilter === "" ||
      monthFilter === "semua" ||
      new Date(item.startDate).getMonth().toString() === monthFilter;

    const matchesSearch = item.jenisKelas
      .toLowerCase()
      .includes(search.toLowerCase());

    return (
      matchesProgram &&
      matchesKategori &&
      matchesMonth &&
      matchesSearch &&
      item.program !== "workshop"
    );
  });

  return (
    <section className="min-h-[calc(80vh-4rem)]">
      <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-2">Daftar Jadwal Program</h2>
        <p className="text-muted-foreground md:max-w-2xl mb-6">
          Temukan informasi lengkap mengenai jadwal program yang tersedia
          seperti Brevet, BFA, dan pelatihan lainnya. Gunakan filter untuk
          mempermudah pencarian.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select onValueChange={setMonthFilter}>
            <SelectTrigger className="w-full md:w-1/4">
              <SelectValue placeholder="Filter Bulan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="semua">Semua Bulan</SelectItem>
                <SelectItem value="0">Januari</SelectItem>
                <SelectItem value="1">Februari</SelectItem>
                <SelectItem value="2">Maret</SelectItem>
                <SelectItem value="3">April</SelectItem>
                <SelectItem value="4">Mei</SelectItem>
                <SelectItem value="5">Juni</SelectItem>
                <SelectItem value="6">Juli</SelectItem>
                <SelectItem value="7">Agustus</SelectItem>
                <SelectItem value="8">September</SelectItem>
                <SelectItem value="9">Oktober</SelectItem>
                <SelectItem value="10">November</SelectItem>
                <SelectItem value="11">Desember</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setProgramFilter}>
            <SelectTrigger className="w-full md:w-1/4">
              <SelectValue placeholder="Filter Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="semua">Semua Program</SelectItem>
                <SelectItem value="brevet-a-b">Kursus Brevet A & B</SelectItem>
                <SelectItem value="brevet-c">Kursus Brevet C</SelectItem>
                <SelectItem value="basic-accounting">
                  Basic Financial Accounting
                </SelectItem>
                <SelectItem value="psak">PSAK for Professional</SelectItem>
                <SelectItem value="uskp">Kelas Persiapan USKP</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setKategoriFilter}>
            <SelectTrigger className="w-full md:w-1/4">
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

          <Input
            type="text"
            placeholder="Cari jenis kelas..."
            className="w-full md:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid w-full [&>div]:border [&>div]:rounded">
          <Table>
            <TableHeader>
              <TableRow className="sticky top-0 bg-background">
                <TableHead className="pl-4">Nama Kursus</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Jenis Kelas</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi / Platform</TableHead>
                <TableHead>Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id} className="odd:bg-muted/50">
                    <TableCell className="pl-4">{item.namaKursus}</TableCell>
                    <TableCell>
                      <Badge
                        variant={"outline"}
                        className="text-xs font-medium capitalize"
                      >
                        {item.program.replace(/-/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatPeriode(item.startDate, item.endDate)}
                    </TableCell>
                    <TableCell>{item.jenisKelas}</TableCell>
                    <TableCell>{item.waktu}</TableCell>
                    <TableCell>{item.kategori}</TableCell>
                    <TableCell>{item.lokasi}</TableCell>
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
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
