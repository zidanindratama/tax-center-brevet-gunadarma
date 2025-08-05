"use client";

import { useDeleteData } from "@/hooks/use-delete-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Trash2, MoreHorizontal, BookDashed } from "lucide-react";
import Link from "next/link";

type Props = {
  courseId: string;
  courseSlug: string;
};

export function CourseAction({ courseId, courseSlug }: Props) {
  const [open, setOpen] = useState(false);

  const deleteCourse = useDeleteData({
    queryKey: "courses",
    dataProtected: `courses/${courseId}`,
    successMessage: "Kursus berhasil dihapus!",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/program/${courseSlug}`}>Lihat Detail</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/kursus/${courseSlug}/update`}>
              Ubah Data
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/kursus/${courseSlug}/gelombang`}>
              <BookDashed className="mr-2 h-4 w-4 text-purple-600" />
              <span className="text-purple-600">Lihat Gelombang</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4 text-red-600" />
              <span className="text-red-600">Hapus</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogDescription>
            Apakah kamu yakin ingin menghapus kursus ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            className="text-white"
            onClick={() => {
              deleteCourse.mutate();
              setOpen(false);
            }}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
