"use client";

import React from "react";
import { useGetData } from "@/hooks/use-get-data";
import { TBatchMeeting } from "./_types/kelas-pertemuan-type";
import { TUser } from "../profile/_types/user-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpenText,
  MessageCircle,
  ListChecks,
  BookOpen,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

type Props = {
  batchSlug: string;
};

const KelasPertemuan = ({ batchSlug }: Props) => {
  const { data: myProfileData } = useGetData({
    queryKey: ["me"],
    dataProtected: "users/me",
  });

  const user: TUser | undefined = myProfileData?.data?.data;

  const { data, isLoading } = useGetData({
    queryKey: ["meetings"],
    dataProtected: `batches/${batchSlug}/meetings?limit=30&sort=created_at&order=asc`,
  });

  const meetings: TBatchMeeting[] = data?.data.data ?? [];

  const mockMateri = [
    "Slide: Pengantar Pajak",
    "Video: Jenis Pajak di Indonesia",
    "PDF: UU Pajak Penghasilan",
  ];

  const mockKuis = [
    "Kuis 1: Dasar Hukum Pajak",
    "Kuis 2: Jenis-jenis Pajak",
    "Kuis 3: Wajib Pajak & NPWP",
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Pertemuan Kelas</h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent className="flex gap-4 pt-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16 ml-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : meetings.length === 0 ? (
        <p className="text-muted-foreground">Belum ada pertemuan tersedia.</p>
      ) : (
        <div className="space-y-4">
          {meetings.map((meeting) => {
            const isTeacher = meeting.teachers.some(
              (teacher) => teacher.id === user?.id
            );

            return (
              <Card
                key={meeting.id}
                className="transition-all duration-300 hover:shadow-lg hover:border-primary"
              >
                <CardHeader className="pb-2 relative">
                  <CardTitle className="text-base font-semibold">
                    {meeting.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground md:max-w-2xl">
                    {meeting.description}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-wrap items-start gap-4 pt-2 sm:flex-nowrap sm:items-center">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                        <BookOpenText className="h-4 w-4 text-primary" />
                        <span>Materi</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64">
                      <h4 className="text-sm font-semibold mb-2">
                        Daftar Materi
                      </h4>
                      <ul className="text-sm list-disc pl-4 space-y-1">
                        {mockMateri.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </HoverCardContent>
                  </HoverCard>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <span>Forum</span>
                  </div>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                        <ListChecks className="h-4 w-4 text-orange-500" />
                        <span>Kuis</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64">
                      <h4 className="text-sm font-semibold mb-2">
                        Daftar Kuis
                      </h4>
                      <ul className="text-sm list-disc pl-4 space-y-1">
                        {mockKuis.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </HoverCardContent>
                  </HoverCard>

                  {(() => {
                    const type = meeting.meeting_type;
                    const label =
                      type === "basic"
                        ? "Biasa"
                        : type === "exam"
                          ? "Ujian"
                          : type;
                    const colorVariant =
                      type === "basic"
                        ? "secondary"
                        : type === "exam"
                          ? "destructive"
                          : "outline";

                    return (
                      <Badge variant={colorVariant} className="ml-auto">
                        {label}
                      </Badge>
                    );
                  })()}
                </CardContent>

                {isTeacher && (
                  <CardContent>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm" variant="orange">
                          Pengaturan Pertemuan
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2 space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left text-sm gap-2"
                        >
                          <BookOpen className="w-4 h-4" />
                          Kelola Materi
                        </Button>
                        <Button variant="ghost" asChild>
                          <Link
                            href={`/dashboard/kelas/${batchSlug}/tugas?${meeting.id}`}
                            className="w-full justify-start text-left text-sm gap-2"
                          >
                            <ListChecks className="w-4 h-4" />
                            Kelola Tugas
                          </Link>
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KelasPertemuan;
