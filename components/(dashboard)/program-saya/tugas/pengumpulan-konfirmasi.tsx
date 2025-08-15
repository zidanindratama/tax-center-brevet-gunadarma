"use client";

import { useGetData } from "@/hooks/use-get-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ Skeleton shadcn
import Link from "next/link";
import { Clock4, Repeat2, CheckCircle2, Info } from "lucide-react";
import { format, formatDistanceToNowStrict, isAfter, isBefore } from "date-fns";
import { id as localeID } from "date-fns/locale";
import * as React from "react";

type TSubmission = {
  id: string;
  attempt_no?: number | null;
  score?: number | null;
  status?: "draft" | "submitted" | "graded" | string;
  created_at: string;
};

type TAssignmentExtra = {
  attempts_limit?: number | null;
  time_limit_minutes?: number | null;
  grading_method?: "highest" | "latest" | string | null;
};

type TAssignmentBase = {
  id: string;
  title: string;
  description: string;
  type: "file" | "essay";
  start_at: string;
  end_at: string;
} & Partial<TAssignmentExtra>;

type Props = { batchSlug: string; assignmentId: string };

const pill = (state: "open" | "notStarted" | "closed") => {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[13px] font-medium ring-1";
  if (state === "open")
    return `${base} bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300`;
  if (state === "closed")
    return `${base} bg-red-500/10 text-red-700 ring-red-600/20 dark:text-red-300`;
  return `${base} bg-muted text-foreground/80 ring-border/60`;
};

const chip =
  "inline-flex min-h-9 items-center gap-2 rounded-md border bg-background px-3 py-1 text-sm text-muted-foreground transition-shadow hover:shadow-sm";

const clamp = (n: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, n));

const PengumpulanKonfirmasi = ({ batchSlug, assignmentId }: Props) => {
  const {
    data: assignmentResp,
    isLoading: assignmentLoading,
    isError: assignmentErr,
  } = useGetData({
    queryKey: ["assignment", assignmentId],
    dataProtected: `assignments/${assignmentId}`,
  });

  const {
    data: mySubsResp,
    isLoading: subsLoading,
    isError: subsErr,
  } = useGetData({
    queryKey: ["assignment-submissions-me", assignmentId],
    dataProtected: `me/assignments/${assignmentId}/submissions`,
    options: { enabled: !!assignmentId },
  });

  const assignment: TAssignmentBase | undefined = assignmentResp?.data?.data;
  const mySubmissions: TSubmission[] = mySubsResp?.data?.data ?? [];

  if (assignmentLoading || subsLoading) {
    return (
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 p-6">
        <Card className="w-full rounded-xl border shadow-sm overflow-hidden">
          <div className="h-1.5 w-full bg-primary" />
          <CardHeader className="p-5 md:p-6 border-b">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-full max-w-md" />
          </CardHeader>
          <CardContent className="p-5 md:p-6 grid gap-5">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
            <Skeleton className="h-1.5 w-full" />
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
            <Skeleton className="h-9 w-48" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assignmentErr || !assignment)
    return <div className="text-sm text-destructive">Gagal memuat tugas.</div>;

  if (subsErr) {
    /* optionally toast */
  }

  const startAt = new Date(assignment.start_at);
  const endAt = new Date(assignment.end_at);
  const now = new Date();

  const notStarted = isAfter(startAt, now);
  const closed = isBefore(endAt, now);
  const open = !notStarted && !closed;

  const totalMs = endAt.getTime() - startAt.getTime();
  const goneMs = now.getTime() - startAt.getTime();
  const pct = totalMs > 0 ? clamp((goneMs / totalMs) * 100) : 0;

  const timeInfo = open
    ? `Sisa waktu: ${formatDistanceToNowStrict(endAt, { locale: localeID })}`
    : closed
      ? `Ditutup: ${formatDistanceToNowStrict(endAt, { locale: localeID })} lalu`
      : `Mulai dalam: ${formatDistanceToNowStrict(startAt, { locale: localeID })}`;

  const attemptsAllowed = assignment.attempts_limit ?? 1;
  const attemptsUsed = mySubmissions.length;
  const hasAnyAttempt = attemptsUsed > 0;

  const gradingMethod = assignment.grading_method ?? "highest";
  const bestScore =
    gradingMethod === "latest"
      ? (mySubmissions
          .slice()
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )[0]?.score ?? null)
      : Math.max(
          ...mySubmissions
            .map((s) => (typeof s.score === "number" ? s.score : -Infinity))
            .concat(-Infinity)
        );
  const bestScoreDisplay =
    bestScore === null || bestScore === -Infinity ? "-" : `${bestScore}`;

  const actionHref = `/dashboard/program-saya/${batchSlug}/tugas/${assignmentId}/kerjakan`;
  const showDoBtn = open && attemptsUsed < attemptsAllowed;
  const goBackHref = `/dashboard/program-saya/${batchSlug}`;

  return (
    <div className="">
      <Card className="w-full rounded-xl border shadow-sm overflow-hidden">
        <div className="h-1.5 w-full bg-primary" />
        <CardHeader className="p-5 md:p-6 border-b">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <CardTitle className="text-lg md:text-xl font-semibold tracking-tight">
                {assignment.title}
              </CardTitle>
              {assignment.description && (
                <CardDescription className="text-sm leading-relaxed">
                  {assignment.description}
                </CardDescription>
              )}
            </div>
            <span
              className={
                notStarted
                  ? pill("notStarted")
                  : open
                    ? pill("open")
                    : pill("closed")
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current/70" />
              {notStarted
                ? "Belum Dibuka"
                : open
                  ? "Sedang Berjalan"
                  : "Tertutup"}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-5 md:p-6 grid gap-5">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <div className={chip}>
              <Clock4 className="h-4 w-4 text-orange-500" />
              <div className="truncate">
                <span className="font-medium text-foreground">Mulai: </span>
                {format(startAt, "dd MMM yyyy, HH:mm", {
                  locale: localeID,
                })}{" "}
                WIB
              </div>
            </div>
            <div className={chip}>
              <Clock4 className="h-4 w-4 text-orange-500" />
              <div className="truncate">
                <span className="font-medium text-foreground">Deadline: </span>
                {format(endAt, "dd MMM yyyy, HH:mm", { locale: localeID })} WIB
              </div>
            </div>
            <div className={`${chip} sm:col-span-2 lg:col-span-1`}>
              <Clock4 className="h-4 w-4 text-orange-500" />
              <div className="text-foreground/80">{timeInfo}</div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Waktu pengerjaan</span>
              <span>{Math.round(pct)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div
                className="h-1.5 rounded-full bg-orange-500 transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className={chip}>
              <Info className="h-4 w-4 text-orange-500" />
              <span>
                Attempts allowed:{" "}
                <span className="font-semibold text-foreground">
                  {attemptsAllowed}
                </span>
              </span>
            </div>
            <div className={chip}>
              <Repeat2 className="h-4 w-4 text-orange-500" />
              <span>
                Attempts used:{" "}
                <span className="font-semibold text-foreground">
                  {attemptsUsed}
                </span>
              </span>
            </div>
            <div className={chip}>
              <CheckCircle2 className="h-4 w-4 text-orange-500" />
              <span>
                Grade ({gradingMethod === "latest" ? "Latest" : "Highest"}):{" "}
                <span className="font-semibold text-foreground">
                  {bestScoreDisplay}
                </span>
              </span>
            </div>
            {typeof assignment.time_limit_minutes === "number" && (
              <div className={chip}>
                <Clock4 className="h-4 w-4 text-orange-500" />
                <span>
                  Time limit:{" "}
                  <span className="font-semibold text-foreground">
                    {assignment.time_limit_minutes} menit
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Attempts */}
          {mySubmissions.length > 0 && (
            <>
              <div className="h-px w-full bg-border" />
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Riwayat Attempt
                </p>
                <ul className="space-y-1.5">
                  {mySubmissions
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                    )
                    .map((s, idx) => (
                      <li
                        key={s.id}
                        className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-1.5 text-sm"
                      >
                        <span className="text-foreground">
                          Attempt {s.attempt_no ?? idx + 1} •{" "}
                          {format(
                            new Date(s.created_at),
                            "dd MMM yyyy, HH:mm",
                            { locale: localeID }
                          )}{" "}
                          WIB
                        </span>
                        <span className="text-muted-foreground">
                          {typeof s.score === "number"
                            ? `Skor: ${s.score}`
                            : (s.status ?? "-")}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            {showDoBtn ? (
              <Button variant="orange" asChild>
                <Link href={actionHref}>
                  {!hasAnyAttempt ? "Kerjakan" : "Kerjakan Ulang"}
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href={goBackHref}>Kembali ke Kursus</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PengumpulanKonfirmasi;
