"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { featuredCourses } from "@/lib/data/featured-courses";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function FeaturedCoursesCarousel() {
  return (
    <section className="w-full py-16 dark:bg-background transition-colors">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight sm:text-center dark:text-white">
          Pilihan Kursus Terpopuler
        </h2>

        <Carousel className="w-full mt-12" opts={{ loop: true }}>
          <CarouselContent className="-ml-2">
            {featuredCourses.map((course, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:px-4 basis-[90%] md:basis-1/2 lg:basis-1/3 overflow-visible py-6"
              >
                <Link href={`/kursus/${course.link}`} className="block h-full">
                  <div className="rounded-xl bg-white dark:bg-muted border shadow-xs h-full flex flex-col transition-colors hover:shadow-md">
                    <div className="relative w-full h-48 md:h-64">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1 text-muted-foreground dark:text-muted">
                      <h4 className="text-xl font-semibold mb-2 text-foreground dark:text-white">
                        {course.title}
                      </h4>
                      <p className="text-sm dark:text-white">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:flex justify-center gap-4 mt-6">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
