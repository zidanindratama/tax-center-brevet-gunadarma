"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useGetData } from "@/hooks/use-get-data";
import { TCourse } from "@/components/(dashboard)/kursus/_types/couurse-type";
import { Skeleton } from "../ui/skeleton";

const FeaturedPrograms = () => {
  const { data, isLoading, isError } = useGetData({
    queryKey: ["featured-programs"],
    dataProtected: "courses?limit=6",
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const courses: TCourse[] = data?.data?.data ?? [];

  console.log(courses);

  return (
    <div className="w-full bg-muted">
      <div
        id="features"
        className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6"
      >
        <h2 className="text-3xl xs:text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight sm:max-w-xl sm:text-center sm:mx-auto">
          Program Unggulan dari Tax Center
        </h2>

        {isLoading && (
          <div className="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className="flex flex-col border rounded-xl overflow-hidden shadow-none"
              >
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
                <div className="mt-auto px-0 pb-0">
                  <Skeleton className="w-full h-48 rounded-tl-xl" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center h-40">
            <p className="text-destructive">Gagal memuat data kursus.</p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="flex flex-col border rounded-xl overflow-hidden shadow-none hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/program/${course.slug}`}
                  className="flex flex-col h-full no-underline"
                >
                  <CardHeader>
                    <h4 className="text-xl font-bold tracking-tight">
                      {course.title}
                    </h4>
                    <p className="mt-2 text-muted-foreground text-sm xs:text-[17px] line-clamp-3">
                      {course.short_description}
                    </p>
                  </CardHeader>
                  <CardContent className="mt-auto px-0 pb-0">
                    <div className="bg-muted h-96 ml-6 rounded-tl-xl relative overflow-hidden">
                      <Image
                        src={
                          course.course_images?.[0]?.image_url ||
                          "/placeholder.svg"
                        }
                        alt={course.title}
                        fill
                        className="object-cover rounded-tl-xl"
                      />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPrograms;
