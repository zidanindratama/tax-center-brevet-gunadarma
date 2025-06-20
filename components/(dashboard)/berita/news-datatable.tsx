"use client";

import { useGetData } from "@/hooks/use-get-data";
import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { DataTable } from "@/components/ui/datatable";
import { newsColumns } from "./news-column";

const NewsDataTable = () => {
  const { page, limit, search, filters } = useDataTableQueryParams();
  const category = filters.category || "";
  const status = filters.status || "";

  const filterOptions = {
    category: {
      placeholder: "Pilih Kategori",
      options: [
        { label: "Event", value: "EVENT" },
        { label: "Update", value: "UPDATE" },
        { label: "Informasi", value: "INFORMASI" },
      ],
    },
    status: {
      placeholder: "Pilih Status",
      options: [
        { label: "Dipublikasikan", value: "PUBLISH" },
        { label: "Draft", value: "DRAFT" },
      ],
    },
  };

  const { data, isLoading } = useGetData({
    queryKey: ["news", `${page}-${limit}-${search}-${category}-${status}`],
    dataProtected:
      `news?page=${page}&limit=${limit}` +
      (search ? `&search=${search}` : "") +
      (category ? `&category=${category}` : "") +
      (status ? `&status=${status}` : ""),
  });

  const news = data?.data?.news ?? [];
  const meta = data?.data?.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
  };

  return (
    <DataTable
      columns={newsColumns}
      data={news}
      meta={meta}
      isLoading={isLoading}
      searchPlaceholder="Cari Judul Berita"
      filterOptions={filterOptions}
    />
  );
};

export default NewsDataTable;
