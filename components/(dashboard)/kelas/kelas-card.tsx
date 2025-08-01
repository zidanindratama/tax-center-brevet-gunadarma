"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { TMyCourse } from "../kelas-saya/_types/my-course-type";

const dayLabels: Record<string, string> = {
  monday: "Senin",
  tuesday: "Selasa",
  wednesday: "Rabu",
  thursday: "Kamis",
  friday: "Jumat",
  saturday: "Sabtu",
  sunday: "Minggu",
};

type Props = {
  course: TMyCourse;
};

export function MyCourseCard({ course }: Props) {
  return (
    <div className="group transition-all duration-300 border border-muted rounded-xl shadow-md hover:shadow-lg bg-background overflow-hidden">
      <div className="relative w-full h-40 bg-muted/50">
        {course.batch_thumbnail ? (
          <Image
            src={course.batch_thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
            Tidak ada gambar
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground">
          {course.title}
        </h3>

        <p className="text-xs text-muted-foreground">
          {format(new Date(course.start_at), "dd MMM yyyy", { locale: id })} –{" "}
          {format(new Date(course.end_at), "dd MMM yyyy", { locale: id })}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-y-1">
          <div className="flex flex-wrap gap-1">
            {course.days.map((d) => (
              <Badge key={d.id} variant="outline">
                {dayLabels[d.day] || d.day}
              </Badge>
            ))}
          </div>
          <Badge variant="secondary" className="whitespace-nowrap">
            {course.course_type.toUpperCase()}
          </Badge>
        </div>

        <Link href={`/dashboard/kelas/${course.slug}`} className="mt-3">
          <Button className="w-full text-xs" variant="orange">
            Lihat Detail
          </Button>
        </Link>
      </div>
    </div>
  );
}
