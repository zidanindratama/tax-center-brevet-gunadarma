"use client";

import React from "react";
import { useGetData } from "@/hooks/use-get-data";
import { TBatchMeeting } from "./_types/kelas-pertemuan-type";
import { TUser } from "../profile/_types/user-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookCheck, BookOpen, ListChecks } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Pertemuan</h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-24 ml-auto" />
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

            const type = meeting.meeting_type;
            const label =
              type === "basic" ? "Biasa" : type === "exam" ? "Ujian" : type;
            const colorVariant =
              type === "basic"
                ? "secondary"
                : type === "exam"
                  ? "destructive"
                  : "outline";
            const bgColor =
              type === "basic"
                ? "bg-gray-50"
                : type === "exam"
                  ? "bg-red-50"
                  : "bg-white";

            return (
              <Card
                key={meeting.id}
                className={`transition-all duration-300 hover:shadow-lg hover:border-primary ${bgColor}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-semibold">
                      {meeting.title}
                    </CardTitle>
                    <Badge variant={colorVariant}>{label}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground md:max-w-2xl">
                    {meeting.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <BookCheck className="h-4 w-4 text-orange-500" />
                      Materi
                    </h4>

                    {meeting.materials.length > 0 ? (
                      <ul className="space-y-2">
                        {meeting.materials.map((material, index) => {
                          const fileExt =
                            material.url.split(".").pop()?.toLowerCase() ??
                            "file";
                          return (
                            <li
                              key={material.id}
                              className="p-3 border rounded-md bg-muted/30 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div>
                                <p className="text-sm font-medium">
                                  {material.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {material.description}
                                </p>
                              </div>
                              <Link
                                href={material.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 sm:mt-0 text-sm text-blue-600 hover:underline"
                              >
                                materi-{index + 1}.{fileExt.toUpperCase()}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Belum ada materi pada pertemuan ini.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-orange-500" />
                      Daftar Tugas
                    </h4>

                    {meeting.assignments.length > 0 ? (
                      <ul className="space-y-4">
                        {meeting.assignments.map((assignment, index) => {
                          const now = new Date();
                          const endDate = new Date(assignment.end_at);
                          const startDate = new Date(assignment.start_at);
                          const isLate = now > endDate;

                          return (
                            <li
                              key={assignment.id}
                              className="p-4 border rounded-xl bg-muted/30 space-y-3"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <p className="text-sm font-semibold">
                                    {assignment.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {format(startDate, "dd MMM yyyy", {
                                      locale: id,
                                    })}{" "}
                                    -{" "}
                                    {format(endDate, "dd MMM yyyy", {
                                      locale: id,
                                    })}
                                  </p>
                                </div>
                                <span className="text-xs text-muted-foreground mt-2 sm:mt-0">
                                  {assignment.assignment_files.length} file
                                </span>
                              </div>

                              {assignment.assignment_files.length > 0 && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-wrap gap-2">
                                    {assignment.assignment_files.map((file) => {
                                      const fileExt =
                                        file.file_url
                                          .split(".")
                                          .pop()
                                          ?.toLowerCase() ?? "file";
                                      const fileName = `tugas-${index + 1}.${fileExt}`;
                                      const isImage = [
                                        "png",
                                        "jpg",
                                        "jpeg",
                                        "webp",
                                      ].includes(fileExt);
                                      const isPDF = fileExt === "pdf";

                                      return (
                                        <Link
                                          key={file.id}
                                          href={file.file_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-2 text-sm bg-white border rounded-full px-3 py-1 hover:bg-blue-50 transition"
                                        >
                                          <span
                                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                              isPDF
                                                ? "bg-red-100 text-red-600"
                                                : isImage
                                                  ? "bg-green-100 text-green-600"
                                                  : "bg-gray-100 text-gray-600"
                                            }`}
                                          >
                                            {fileExt.toUpperCase()}
                                          </span>
                                          <span className="text-blue-600 hover:underline">
                                            {fileName}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                  {user?.role_type === "siswa" && (
                                    <div className="w-full mt-1">
                                      {isLate ? (
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          disabled
                                          className="w-full sm:w-fit text-white"
                                        >
                                          Terlambat
                                        </Button>
                                      ) : (
                                        <Button
                                          size="sm"
                                          variant="purple"
                                          asChild
                                          className="w-full sm:w-fit"
                                        >
                                          <Link
                                            href={`/dashboard/program-saya/tugas/${assignment.id}/kerjakan`}
                                          >
                                            Kerjakan Tugas
                                          </Link>
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Belum ada tugas pada pertemuan ini.
                      </p>
                    )}
                  </div>

                  {isTeacher && (
                    <div className="pt-2 flex flex-row gap-2">
                      <Button size="sm" variant="orange" asChild>
                        <Link
                          href={`/dashboard/kelas/${batchSlug}/materi?${meeting.id}`}
                        >
                          <BookCheck className="w-4 h-4 mr-2" />
                          Kelola Materi
                        </Link>
                      </Button>
                      <Button size="sm" variant="orange" asChild>
                        <Link
                          href={`/dashboard/kelas/${batchSlug}/tugas?${meeting.id}`}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Kelola Tugas
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KelasPertemuan;
