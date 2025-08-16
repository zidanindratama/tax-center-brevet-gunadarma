"use client";

import { useGetData } from "@/hooks/use-get-data";
import { usePostData } from "@/hooks/use-post-data";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TCourseBatch } from "@/components/(dashboard)/kursus/gelombang/_types/course-batch-type";
import NotFoundContent from "../not-found-content";
import { DAY_OPTIONS } from "@/components/(dashboard)/kursus/gelombang/_constants/day-options";

type Props = {
  batchSlug: string;
};

export default function Purchase({ batchSlug }: Props) {
  const { data, isLoading, isError } = useGetData({
    queryKey: ["batch", batchSlug],
    dataProtected: `batches/${batchSlug}`,
  });

  const batch: TCourseBatch = data?.data?.data;

  const { mutate: purchaseCourse, isPending } = usePostData({
    queryKey: "purchases",
    dataProtected: "me/purchases",
    successMessage: "Berhasil mendaftar!",
    backUrl: "/dashboard/pembayaran",
  });

  const handlePurchase = () => {
    if (!batch?.id) return toast.error("Batch tidak ditemukan.");
    purchaseCourse({ batch_id: batch.id });
  };

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !batch) {
    return (
      <div className="max-w-screen-md mx-auto py-16 px-6">
        <NotFoundContent message="Gelombang tidak ditemukan." />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full bg-background py-6 md:py-10">
        <div className="relative mx-auto max-w-screen-xl rounded-xl overflow-hidden">
          <Image
            src={batch.batch_thumbnail || "/placeholder.svg"}
            alt={batch.title}
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="mt-6 px-6 max-w-screen-xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            {batch.title}
          </h1>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Detail Gelombang
            </h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong>Periode:</strong>{" "}
                {new Date(batch.start_at).toLocaleDateString()} -{" "}
                {new Date(batch.end_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Hari:</strong>{" "}
                {batch.days
                  .map((d) => {
                    const indo = DAY_OPTIONS.find((opt) => opt.value === d.day);
                    return indo?.label || d.day;
                  })
                  .join(" & ")}
              </p>
              <p>
                <strong>Kategori:</strong>{" "}
                {batch.course_type === "online" ? "Online" : "Offline"}
              </p>
              {batch.course_type === "offline" && (
                <p>
                  <strong>Tempat:</strong> {batch.room}
                </p>
              )}
            </div>
          </div>

          <div className="border rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border-blue-300 dark:border-blue-700 p-5 text-sm">
            Dengan menekan tombol <strong>Bayar</strong>, Kamu akan otomatis
            terdaftar pada gelombang ini. Pastikan data Kamu benar dan aktif.
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-md p-6 space-y-4 h-fit">
          <h2 className="text-lg font-semibold text-foreground">
            Konfirmasi Pendaftaran
          </h2>
          <div className="text-sm text-muted-foreground">
            <p>Jumlah Peserta Maksimal: {batch.quota}</p>
            <p>Tersedia: Tidak tersedia real-time</p>
          </div>
          <Button
            variant="orange"
            onClick={handlePurchase}
            disabled={isPending}
            size="lg"
            className="w-full"
          >
            {isPending ? "Memproses..." : "Bayar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
