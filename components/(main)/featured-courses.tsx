"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetData } from "@/hooks/use-get-data";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TCourseBatch } from "../(dashboard)/kursus/gelombang/_types/course-batch-type";

export default function FeaturedCoursesCarousel() {
  const { data, isLoading } = useGetData({
    queryKey: ["batches"],
    dataProtected: "batches",
  });

  const batches: TCourseBatch[] = data?.data?.data || [];

  return (
    <section className="w-full py-16 dark:bg-background transition-colors">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight sm:text-center dark:text-white">
          Pilihan Kursus Terpopuler
        </h2>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl w-full" />
            ))}
          </div>
        ) : (
          <Carousel className="w-full mt-12" opts={{ loop: true }}>
            <CarouselContent className="-ml-2">
              {batches.map((course, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:px-4 basis-[90%] md:basis-1/2 lg:basis-1/3 overflow-visible py-6"
                >
                  <Link
                    href={`/kursus/${course.slug}`}
                    className="block h-full"
                  >
                    <div className="rounded-xl bg-white dark:bg-muted border shadow-xs h-full flex flex-col transition-colors hover:shadow-md">
                      <div className="relative w-full h-full">
                        <Image
                          src={course.batch_thumbnail}
                          alt={course.title}
                          width={3000}
                          height={3000}
                          className="object-cover rounded-t-xl"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1 text-muted-foreground dark:text-muted">
                        <h4 className="text-xl font-semibold mb-2 text-foreground dark:text-white">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm mt-auto">
                          <span className="inline-block px-2 py-1 bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 rounded-full text-xs font-medium">
                            {course.course_type === "online"
                              ? "Online"
                              : "Offline"}
                          </span>
                          <span className="text-muted-foreground dark:text-white">
                            Mulai:{" "}
                            {new Date(course.start_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden xl:flex justify-center gap-4 mt-6">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
}
