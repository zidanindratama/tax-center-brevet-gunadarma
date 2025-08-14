"use client";

import { useGetData } from "@/hooks/use-get-data";
import React from "react";
import { TAssignment } from "../../kelas/tugas/_types/tugas-type";
import PengumpulanEssay from "./pengumpulan-essay";
import PengumpulanFile from "./pengumpulan-file";

type Props = {
  batchSlug: string;
  assignmentId: string;
};

const PengumpulanJawaban = ({ batchSlug, assignmentId }: Props) => {
  const { data, isLoading } = useGetData({
    queryKey: ["tugas", assignmentId],
    dataProtected: `assignments/${assignmentId}`,
  });

  const tugas: TAssignment | undefined = data?.data?.data;

  if (isLoading) return <div>Memuat data tugas…</div>;
  if (!tugas) return <div>Data tugas tidak ditemukan.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{tugas.title}</h2>
      <p className="text-sm text-muted-foreground">{tugas.description}</p>

      {tugas.type === "essay" ? (
        <PengumpulanEssay batchSlug={batchSlug} assignment={tugas} />
      ) : (
        <PengumpulanFile batchSlug={batchSlug} assignment={tugas} />
      )}
    </div>
  );
};

export default PengumpulanJawaban;
