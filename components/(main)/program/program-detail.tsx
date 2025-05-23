"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { programDetail } from "@/lib/data/program-detail";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProgramDetailPage() {
  return (
    <section className="w-full py-16 dark:bg-background transition-colors">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={programDetail.image}
                alt={programDetail.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{programDetail.title}</h1>
              <p className="text-muted-foreground">
                {programDetail.description}
              </p>
            </div>
            <Button variant={"orange"} className="w-full" asChild>
              <Link href="/jadwal-program">Lihat Jadwal Program</Link>
            </Button>
          </div>

          <Tabs defaultValue="tentang" className="w-full">
            <ScrollArea className="w-full overflow-auto whitespace-nowrap">
              <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none mb-4">
                <TabsTrigger
                  value="tentang"
                  className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-b-[3px] border-transparent data-[state=active]:border-primary px-4 py-2 text-sm"
                >
                  Tentang Program
                </TabsTrigger>
                <TabsTrigger
                  value="manfaat"
                  className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-b-[3px] border-transparent data-[state=active]:border-primary px-4 py-2 text-sm"
                >
                  Manfaat
                </TabsTrigger>
                <TabsTrigger
                  value="keunggulan"
                  className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-b-[3px] border-transparent data-[state=active]:border-primary px-4 py-2 text-sm"
                >
                  Keunggulan
                </TabsTrigger>
                <TabsTrigger
                  value="fasilitas"
                  className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-b-[3px] border-transparent data-[state=active]:border-primary px-4 py-2 text-sm"
                >
                  Fasilitas
                </TabsTrigger>
                <TabsTrigger
                  value="materi"
                  className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-b-[3px] border-transparent data-[state=active]:border-primary px-4 py-2 text-sm"
                >
                  Materi
                </TabsTrigger>
                <TabsTrigger
                  value="peserta"
                  className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-b-[3px] border-transparent data-[state=active]:border-primary px-4 py-2 text-sm"
                >
                  Peserta
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value="tentang">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: programDetail.tentang }}
              />
            </TabsContent>
            <TabsContent value="manfaat">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: programDetail.manfaat }}
              />
            </TabsContent>
            <TabsContent value="keunggulan">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: programDetail.keunggulan }}
              />
            </TabsContent>
            <TabsContent value="fasilitas">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: programDetail.fasilitas }}
              />
            </TabsContent>
            <TabsContent value="materi">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: programDetail.materi }}
              />
            </TabsContent>
            <TabsContent value="peserta">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: programDetail.peserta }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
