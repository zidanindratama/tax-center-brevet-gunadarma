"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import NotFoundContent from "../not-found-content";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { workshopSchedules } from "@/lib/data/workshop-schedule";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const WorkshopSchedule = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [search, setSearch] = useState("");

  const filteredWorkshops = workshopSchedules.filter((course) => {
    const matchesCategory =
      categoryFilter === "" ||
      categoryFilter === "semua" ||
      course.category.toLowerCase() === categoryFilter;

    const matchesMethod =
      methodFilter === "" ||
      methodFilter === "semua" ||
      course.method === methodFilter;

    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesMethod && matchesSearch;
  });

  return (
    <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
      <h2 className="text-2xl font-bold mb-2">Informasi Jadwal Workshop</h2>
      <p className="text-muted-foreground md:max-w-2xl mb-6">
        Temukan berbagai jadwal workshop terkini yang relevan dengan akuntansi,
        perpajakan, audit, dan topik profesional lainnya.
      </p>
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <Select onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="semua">Semua Kategori</SelectItem>
              <SelectItem value="perpajakan">Perpajakan</SelectItem>
              <SelectItem value="akuntansi keuangan">
                Akuntansi Keuangan
              </SelectItem>
              <SelectItem value="psak">PSAK</SelectItem>
              <SelectItem value="audit">Audit</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={setMethodFilter}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter Metode" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="semua">Semua Metode</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Cari judul workshop..."
          className="w-full md:w-2/4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkshops.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <NotFoundContent message="Tidak ada workshop yang ditemukan." />
          </div>
        ) : (
          filteredWorkshops.map((course) => (
            <Link
              key={course.id}
              href={`/workshop/${course.slug}`}
              className="block h-full"
            >
              <div className="rounded-xl bg-white dark:bg-muted border shadow-sm h-full flex flex-col transition-colors hover:shadow-md">
                <div className="relative w-full h-48 md:h-56">
                  <Image
                    src="/placeholder.svg"
                    alt={course.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 text-muted-foreground dark:text-muted">
                  <Badge variant="outline" className="w-fit mb-3">
                    {course.category}
                  </Badge>
                  <h4 className="text-lg truncate font-semibold text-foreground dark:text-white mb-3">
                    {course.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {format(new Date(course.date), "EEEE, dd MMMM yyyy", {
                      locale: id,
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {course.method === "online" ? "Online" : "Offline"},{" "}
                    {course.platform}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkshopSchedule;
