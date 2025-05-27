"use client";

import { newsDetail } from "@/lib/data/news-detail";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const NewsDetail = () => {
  return (
    <div className="max-w-screen-md mx-auto py-16 px-6">
      <Badge variant="outline" className="capitalize">
        {newsDetail.category}
      </Badge>

      <h1 className="text-3xl font-bold tracking-tight mt-4">
        {newsDetail.title}
      </h1>

      <p className="text-muted-foreground mt-2 text-sm">
        {format(new Date(newsDetail.date), "EEEE, dd MMMM yyyy", {
          locale: id,
        })}
      </p>

      <div className="relative w-full h-64 mt-6 mb-10 rounded-xl overflow-hidden border">
        <Image
          src={newsDetail.thumbnail}
          alt={newsDetail.title}
          fill
          className="object-cover"
        />
      </div>

      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: newsDetail.content }}
      />
    </div>
  );
};

export default NewsDetail;
