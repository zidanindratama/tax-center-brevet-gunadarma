"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { NewsAction } from "./news-action";
import { TNews } from "./_types/news-type";

export const newsColumns: ColumnDef<TNews>[] = [
  {
    accessorKey: "title",
    header: "Judul Berita",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => row.original.category,
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={
            status === "PUBLISH"
              ? "text-green-500 border-green-500"
              : "text-yellow-500 border-yellow-500"
          }
          variant="outline"
        >
          {status === "PUBLISH" ? "Dipublikasikan" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <NewsAction newsId={row.original.id} />;
    },
  },
];
