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
import { formatPeriode } from "../jadwal-program/_libs/format-periode";
import { workshopDetail } from "@/lib/data/workshop-detail";
import { CalendarDays, Clock, MapPin, LayoutGrid, Users } from "lucide-react";
import Link from "next/link";

const WorkshopDetail = () => {
  return (
    <section className="w-full py-16 dark:bg-background transition-colors">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{workshopDetail.title}</h1>

          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src={workshopDetail.image}
              alt={workshopDetail.title}
              fill
              className="object-cover"
            />
          </div>

          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: workshopDetail.content }}
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
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium text-xs">
                  <CalendarDays className="h-4 w-4 text-orange-500" />
                  Tanggal
                </TableCell>
                <TableCell>
                  {formatPeriode(
                    workshopDetail.startDate,
                    workshopDetail.endDate
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium text-xs">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Jam
                </TableCell>
                <TableCell>{workshopDetail.waktu} WIB</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium text-xs">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  Lokasi/Platform
                </TableCell>
                <TableCell>{workshopDetail.lokasi}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium text-xs">
                  <LayoutGrid className="h-4 w-4 text-orange-500" />
                  Ruangan
                </TableCell>
                <TableCell>{workshopDetail.ruangan}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium text-xs">
                  <Users className="h-4 w-4 text-orange-500" />
                  Sisa Kapasitas
                </TableCell>
                <TableCell>{workshopDetail.sisaKapasitas}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button className="w-full mt-5" variant="orange" asChild>
            <Link href="/signup">Daftar Sekarang</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkshopDetail;
