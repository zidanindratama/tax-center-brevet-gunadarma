"use client";

import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NotFoundContent from "../not-found-content";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-get-data";
import { Skeleton } from "@/components/ui/skeleton";
import { TNews } from "@/components/(dashboard)/berita/_types/news-type";

const NewsList = () => {
  const [search, setSearch] = useState("");

  const queryParams = new URLSearchParams({
    ...(search && { q: search }),
  });

  const queryString = queryParams.toString();

  const { data, isLoading } = useGetData({
    queryKey: ["blogs", queryString],
    dataProtected: `blogs?${queryString}`,
  });

  const posts: TNews[] = data?.data?.data ?? [];

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Berita & Artikel Pajak
          </h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Dapatkan informasi terbaru seputar perpajakan, regulasi, dan edukasi
            dari Tax Center.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          placeholder="Cari judul berita..."
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [...Array(6)].map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="rounded-xl bg-white dark:bg-muted border shadow-sm h-[400px] flex flex-col p-6"
            >
              <Skeleton className="w-full h-40 rounded-md mb-4" />
              <Skeleton className="w-1/2 h-4 rounded mb-2" />
              <Skeleton className="w-full h-4 rounded mb-2" />
              <Skeleton className="w-full h-4 rounded" />
            </div>
          ))
        ) : posts.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <NotFoundContent message="Tidak ada berita yang ditemukan." />
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="flex flex-col h-full">
              <div className="rounded-xl bg-white dark:bg-muted border shadow-sm flex flex-col h-full transition hover:shadow-md">
                <div className="relative w-full h-48 md:h-56">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 text-muted-foreground dark:text-muted">
                  <h4 className="text-lg font-semibold mb-2 text-foreground dark:text-white line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                  <Button variant="purple" className="mt-6 w-fit" asChild>
                    <Link href={`/berita/${post.slug}`}>
                      Baca Selengkapnya
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsList;
