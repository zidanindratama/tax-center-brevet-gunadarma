"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TMyCourse } from "./_types/my-course-type";
import { MyCourseAction } from "./kelas-action";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const dayLabels: Record<string, string> = {
  monday: "Senin",
  tuesday: "Selasa",
  wednesday: "Rabu",
  thursday: "Kamis",
  friday: "Jumat",
  saturday: "Sabtu",
  sunday: "Minggu",
};

export const myCourseColumns: ColumnDef<TMyCourse>[] = [
  {
    accessorKey: "batch_thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const thumbnail = row.original.batch_thumbnail;
      return thumbnail ? (
        <img
          src={thumbnail}
          alt={row.original.title}
          className="h-16 w-24 object-cover rounded-md border"
        />
      ) : (
        <div className="h-16 w-24 flex items-center justify-center rounded-md border text-xs text-gray-500">
          Tidak ada gambar
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Judul Kursus",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "room",
    header: "Ruangan",
    cell: ({ row }) => <span>{row.original.room}</span>,
  },
  {
    accessorKey: "start_at",
    header: "Jadwal",
    cell: ({ row }) => {
      const start = format(new Date(row.original.start_at), "dd MMM yyyy", {
        locale: id,
      });
      const end = format(new Date(row.original.end_at), "dd MMM yyyy", {
        locale: id,
      });
      return (
        <div className="text-sm text-muted-foreground">
          {start} - {end}
        </div>
      );
    },
  },
  {
    accessorKey: "days",
    header: "Hari",
    cell: ({ row }) => {
      const days = row.original.days || [];
      if (days.length === 0) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <div className="flex flex-wrap gap-1">
          {days.map((d) => (
            <Badge key={d.id}>{dayLabels[d.day] || d.day}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "course_type",
    header: "Tipe",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.course_type === "offline" ? "Offline" : "Online"}
      </Badge>
    ),
  },
  {
    accessorKey: "quota",
    header: "Kuota",
    cell: ({ row }) => <span>{row.original.quota} peserta</span>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <MyCourseAction batchId={row.original.id} />,
  },
];
