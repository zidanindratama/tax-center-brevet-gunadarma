"use client";

import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ListTodo,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import { useGetData } from "@/hooks/use-get-data";
import { useParams } from "next/navigation";
import Link from "next/link";
import { TCourseBatch } from "@/components/(dashboard)/kursus/gelombang/_types/course-batch-type";
import { formatPeriode } from "./_libs/format-periode";
import { DAY_OPTIONS } from "@/components/(dashboard)/kursus/gelombang/_constants/day-options";
import { Skeleton } from "@/components/ui/skeleton";
import NotFoundContent from "../not-found-content";

export default function CourseDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data, isLoading, isError } = useGetData({
    queryKey: ["batches", slug],
    dataProtected: `batches/${slug}`,
  });

  const batch: TCourseBatch | undefined = data?.data?.data;

  if (isLoading || !batch) {
    return (
      <section className="w-full py-16 dark:bg-background transition-colors">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3 rounded" />
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/6" />
            </div>
          </div>

          <div className="h-fit p-6 border rounded bg-background shadow-sm space-y-4">
            <Skeleton className="h-6 w-1/3 rounded" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !batch) {
    return (
      <div className="max-w-screen-md mx-auto py-16 px-6">
        <NotFoundContent message="Gagal memuat data kursus. Silakan coba lagi." />
      </div>
    );
  }

  return (
    <section className="w-full py-16 dark:bg-background transition-colors">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{batch.title}</h1>

          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={batch.batch_thumbnail}
              alt={batch.title}
              width={3000}
              height={3000}
              className="object-cover"
            />
          </div>

          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: batch.description }}
          />
        </div>

        <div className="md:sticky md:top-20 h-fit p-6 border rounded bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  colSpan={2}
                  className="text-2xl font-semibold text-primary"
                >
                  Informasi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <CalendarDays className="h-4 w-4 text-orange-500" />
                  Tanggal
                </TableCell>
                <TableCell>
                  {formatPeriode(batch.start_at, batch.end_at)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <ListTodo className="h-4 w-4 text-orange-500" />
                  Hari
                </TableCell>
                <TableCell>
                  {batch.days
                    .map((d) => {
                      const indo = DAY_OPTIONS.find(
                        (opt) => opt.value === d.day
                      );
                      return indo?.label || d.day;
                    })
                    .join(" & ")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Jam
                </TableCell>
                <TableCell>
                  {batch.start_time.slice(0, 5).replace(":", ".")} -{" "}
                  {batch.end_time.slice(0, 5).replace(":", ".")} WIB
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  Lokasi/Platform
                </TableCell>
                <TableCell>
                  {batch.course_type === "online"
                    ? "Online (Zoom/Google Meet)"
                    : batch.room}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <Users className="h-4 w-4 text-orange-500" />
                  Kapasitas
                </TableCell>
                <TableCell>{batch.quota} Peserta</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <UserCheck className="h-4 w-4 text-orange-500" />
                  Jenis Peserta
                </TableCell>
                <TableCell>
                  <div className="flex flex-row gap-1">
                    {batch.batch_groups.map((group) => {
                      const label =
                        group.group_type === "mahasiswa_gunadarma"
                          ? "Mahasiswa Gunadarma"
                          : group.group_type === "mahasiswa_non_gunadarma"
                            ? "Mahasiswa Non-Gunadarma"
                            : "Umum";
                      return (
                        <span
                          key={group.id}
                          className="px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700"
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button className="w-full mt-5" variant="orange" asChild>
            <Link href={`/pembayaran/${batch.slug}`}>Daftar Sekarang</Link>
          </Button>

          <div className="mt-4 flex items-start gap-3 rounded-md border border-orange-200 bg-orange-50 p-4 text-sm text-muted-foreground">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
            <p className="leading-relaxed">
              <strong className="text-orange-600">
                Tanggal mulai bersifat tentatif.
              </strong>{" "}
              Jadwal dapat berubah tergantung pada jumlah peserta yang mendaftar
              pada gelombang ini. Silakan daftar lebih awal untuk mengamankan
              tempat Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
