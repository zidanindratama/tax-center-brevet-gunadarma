"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TCourseBatch } from "./_types/course-batch-type";
import { trimWords } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { BatchAction } from "./batch-action";

export const batchColumns: ColumnDef<TCourseBatch>[] = [
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
    header: "Judul Batch",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => (
      <div className="line-clamp-2">
        {trimWords(row.original.description, 10)}
      </div>
    ),
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
    cell: ({ row }) => (
      <BatchAction batchId={row.original.id} batchSlug={row.original.slug} />
    ),
  },
];
