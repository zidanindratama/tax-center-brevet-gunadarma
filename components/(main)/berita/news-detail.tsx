"use client";

import Image from "next/image";
import { useGetData } from "@/hooks/use-get-data";
import { Skeleton } from "@/components/ui/skeleton";
import NotFoundContent from "../not-found-content";

type Props = {
  newsSlug: string;
};

const NewsDetail = ({ newsSlug }: Props) => {
  const { data, isLoading } = useGetData({
    queryKey: ["blog-detail", newsSlug],
    dataProtected: `blogs/${newsSlug}`,
  });

  const news = data?.data?.data;

  if (isLoading) {
    return (
      <div className="max-w-screen-md mx-auto py-16 px-6">
        <Skeleton className="w-24 h-6 mb-4" />
        <Skeleton className="w-3/4 h-10 mb-4" />
        <Skeleton className="w-1/3 h-4 mb-8" />
        <Skeleton className="w-full h-64 mb-8 rounded-xl" />
        <Skeleton className="w-full h-80 rounded" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="max-w-screen-md mx-auto py-16 px-6">
        <NotFoundContent message="Berita tidak ditemukan." />
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold tracking-tight mt-4">{news.title}</h1>

      <div className="relative w-full h-96 mt-6 mb-10 rounded-xl overflow-hidden border">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>

      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
    </div>
  );
};

export default NewsDetail;
