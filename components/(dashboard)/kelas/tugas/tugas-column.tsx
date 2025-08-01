"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TugasAction } from "./tugas-action";
import { trimWords } from "@/lib/utils";
import { TAssignment } from "./_types/tugas-type";

export const assignmentColumns: ColumnDef<TAssignment>[] = [
  {
    accessorKey: "title",
    header: "Judul Tugas",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => (
      <div className="line-clamp-2">
        {trimWords(row.original.description, 8)}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Tipe",
    cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
  },
  {
    accessorKey: "start_at",
    header: "Mulai",
    cell: ({ row }) => {
      const date = new Date(row.original.start_at).toLocaleDateString("id-ID", {
        dateStyle: "medium",
      });
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "end_at",
    header: "Berakhir",
    cell: ({ row }) => {
      const date = new Date(row.original.end_at).toLocaleDateString("id-ID", {
        dateStyle: "medium",
      });
      return <span>{date}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <TugasAction assignmentId={row.original.id} />,
  },
];
