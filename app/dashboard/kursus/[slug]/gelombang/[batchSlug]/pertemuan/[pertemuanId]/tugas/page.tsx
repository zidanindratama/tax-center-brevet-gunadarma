"use client";

import TugasDataTable from "@/components/(dashboard)/kursus/gelombang/pertemuan/tugas/tugas-datatable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";

const DashboardDatatableTugasPage = () => {
  const params = useParams();
  const courseSlug = params.slug as string;
  const batchSlug = params.batchSlug as string;
  const meetingId = params.pertemuanId as string;

  return (
    <section>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard/kursus">Kursus</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href={`/dashboard/kursus/${courseSlug}/gelombang`}
                >
                  Gelombang
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href={`/dashboard/kursus/${courseSlug}/gelombang/${batchSlug}/pertemuan`}
                >
                  Pertemuan
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Tugas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex flex-row justify-end">
          <Button variant={"orange"} className="w-fit" asChild>
            <Link
              href={`/dashboard/kursus/${courseSlug}/gelombang/${batchSlug}/pertemuan/${meetingId}/tugas/tambah`}
            >
              Tambah Tugas
            </Link>
          </Button>
        </div>
        <Suspense>
          <TugasDataTable batchSlug={batchSlug} meetingId={meetingId} />
        </Suspense>
      </div>
    </section>
  );
};

export default DashboardDatatableTugasPage;
