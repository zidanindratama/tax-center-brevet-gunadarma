"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetData } from "@/hooks/use-get-data";
import { useEffect } from "react";
import { usePutData } from "@/hooks/use-put-data";
import { TMember } from "@/components/(dashboard)/member/_types/member-type";
import { TMeeting } from "../pertemuan/_types/meeting-type";
import Image from "next/image";
import { TAttendance } from "./_types/absensi-type";
import { Skeleton } from "@/components/ui/skeleton";
import { AbsensiFormData, absensiSchema } from "./_schemas/absensi-schema";

type Props = {
  batchSlug: string;
};

export function AbsensiDatatable({ batchSlug }: Props) {
  const { data: attendatncesData, isLoading: isLoadingAttendance } = useGetData(
    {
      queryKey: ["attendances"],
      dataProtected: `batches/${batchSlug}/attendances?limit=200`,
    }
  );

  const { data: studentsData, isLoading: isLoadingStudent } = useGetData({
    queryKey: ["students"],
    dataProtected: `batches/${batchSlug}/students?limit=200`,
  });

  const { data: meetingsData, isLoading: isLoadingMeeting } = useGetData({
    queryKey: ["meetings"],
    dataProtected: `batches/${batchSlug}/meetings?limit=30`,
  });

  const students: TMember[] = studentsData?.data.data ?? [];
  const meetings: TMeeting[] = meetingsData?.data.data ?? [];
  const attendances: TAttendance[] = attendatncesData?.data.data ?? [];

  const form = useForm<AbsensiFormData>({
    resolver: zodResolver(absensiSchema),
    defaultValues: { data: [] },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "data",
  });

  const putAbsensi = usePutData({
    queryKey: "attendances",
    dataProtected: `batches/${meetings[0]?.batch_id}/attendances/bulk`,
    successMessage: "Absensi berhasil disimpan!",
  });

  useEffect(() => {
    if (students.length > 0 && meetings.length > 0 && attendances.length > 0) {
      const dynamicData: AbsensiFormData["data"] = students.map((student) => {
        const pertemuan = meetings.map((meeting) => {
          const attendance = attendances.find(
            (att) => att.user_id === student.id && att.meeting_id === meeting.id
          );
          return attendance?.is_present ?? false;
        });

        return {
          id: student.id,
          pertemuan,
        };
      });

      form.reset({ data: dynamicData });
    }
  }, [students, meetings, attendances, form]);

  const onSubmit = (values: AbsensiFormData) => {
    const attendances = values.data.flatMap((mhs) =>
      meetings.map((meeting, idx) => ({
        user_id: mhs.id,
        meeting_id: meeting.id,
        is_present: mhs.pertemuan[idx],
        note: mhs.pertemuan[idx] ? "Hadir" : "Tidak hadir",
      }))
    );

    putAbsensi.mutate({ attendances });
  };

  if (isLoadingStudent || isLoadingMeeting || isLoadingAttendance) {
    return (
      <Card className="w-full overflow-x-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold">
            Memuat Absensi Peserta...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-[60%]" />
                <Skeleton className="h-4 w-[40%]" />
              </div>
              <div className="flex space-x-2 ml-auto">
                {[...Array(4)].map((__, i) => (
                  <Skeleton key={i} className="h-5 w-5 rounded" />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-x-auto">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-semibold">
          Absensi Peserta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[50px] text-center">No</TableHead>
                  <TableHead className="min-w-[250px]">Identitas</TableHead>
                  {meetings.map((_, idx) => (
                    <TableHead key={idx} className="text-center">
                      {idx + 1}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((mhsField, idx) => {
                  const student = students[idx];
                  const nimNik =
                    student.profile.nim || student.profile.nik || "-";

                  return (
                    <TableRow
                      key={mhsField.id}
                      className="hover:bg-muted/50 transition"
                    >
                      <TableCell className="text-center align-middle">
                        {idx + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Image
                            width={1200}
                            height={1200}
                            src={student.avatar}
                            alt={student.name}
                            className="h-12 w-12 rounded-full object-cover border"
                          />
                          <div>
                            <p className="font-semibold">{student.name}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              <Badge variant="outline">{nimNik}</Badge>
                              <Badge variant="secondary">
                                {student.profile.institution}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      {mhsField.pertemuan.map((_, i) => (
                        <TableCell key={i} className="text-center align-middle">
                          <Checkbox
                            checked={form.watch(`data.${idx}.pertemuan.${i}`)}
                            onCheckedChange={(checked) =>
                              form.setValue(
                                `data.${idx}.pertemuan.${i}`,
                                !!checked
                              )
                            }
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 text-left">
            <Button
              type="submit"
              variant="orange"
              disabled={putAbsensi.isPending}
            >
              {putAbsensi.isPending ? "Menyimpan..." : "Simpan Absensi"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
