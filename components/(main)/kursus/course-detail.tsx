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
import { courseDetail } from "@/lib/data/course-detail";
import { Button } from "@/components/ui/button";
import { formatPeriode } from "../jadwal-program/_libs/format-periode";
import { CalendarDays, ListTodo, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";

const CourseDetail = () => {
  return (
    <section className="w-full py-16 dark:bg-background transition-colors">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="pace-y-4">
          <h1 className="text-2xl font-bold">{courseDetail.namaKursus}</h1>

          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src={courseDetail.image}
              alt={courseDetail.namaKursus}
              fill
              className="object-cover"
            />
          </div>

          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: courseDetail.content }}
          />
        </div>
        <div className="border h-fit p-6 rounded">
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
                  {formatPeriode(courseDetail.startDate, courseDetail.endDate)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <ListTodo className="h-4 w-4 text-orange-500" />
                  Hari
                </TableCell>
                <TableCell>Sabtu dan Minggu</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Jam
                </TableCell>
                <TableCell>{courseDetail.waktu} WIB</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  Lokasi/Platform
                </TableCell>
                <TableCell>{courseDetail.lokasi}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground flex items-center gap-2 font-medium">
                  <Users className="h-4 w-4 text-orange-500" />
                  Kapasitas
                </TableCell>
                <TableCell>{courseDetail.kapasitas}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="w-full mt-5" variant={"orange"} asChild>
            <Link href={"/signup"}>Daftar Sekarang</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
