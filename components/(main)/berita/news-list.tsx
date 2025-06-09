"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { newsData } from "@/lib/data/news";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NotFoundContent from "../not-found-content";
import { Button } from "@/components/ui/button";

const NewsList = () => {
  const [sort, setSort] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("semua");
  const [search, setSearch] = useState("");

  const filteredPosts = newsData
    .filter((post) => {
      const matchCategory =
        categoryFilter === "semua" ||
        post.category.toLowerCase() === categoryFilter;

      const matchSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "latest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sort === "popular") return b.views - a.views;
      return 0;
    });

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

        <Select defaultValue={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Terbaru</SelectItem>
            <SelectItem value="popular">Paling Populer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Select defaultValue="semua" onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="semua">Semua Kategori</SelectItem>
              <SelectItem value="perpajakan">Perpajakan</SelectItem>
              <SelectItem value="regulasi">Regulasi</SelectItem>
              <SelectItem value="edukasi">Edukasi</SelectItem>
              <SelectItem value="psak">PSAK</SelectItem>
              <SelectItem value="audit">Audit</SelectItem>
              <SelectItem value="teknologi">Teknologi</SelectItem>
              <SelectItem value="tutorial">Tutorial</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Cari judul berita..."
          className="w-full md:w-3/4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <NotFoundContent message="Tidak ada berita yang ditemukan." />
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="h-full">
              <div className="rounded-xl bg-white dark:bg-muted border shadow-sm h-full flex flex-col transition-colors hover:shadow-md">
                <div className="relative w-full h-48 md:h-56">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 text-muted-foreground dark:text-muted">
                  <Badge variant="outline" className="w-fit mb-3 capitalize">
                    {post.category}
                  </Badge>
                  <h4 className="text-lg font-semibold truncate text-foreground dark:text-white mb-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Button variant={"purple"} className="mt-6 w-fit" asChild>
                    <Link href={`/berita/${post.slug}`}>
                      Baca Selengkapnya{" "}
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
