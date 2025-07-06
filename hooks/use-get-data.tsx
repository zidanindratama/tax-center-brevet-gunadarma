import axiosInstance from "@/helpers/axios-instance";
import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type fetchProps = {
  queryKey: [string, string] | [string];
  dataProtected: string;
  options?: Partial<
    UseQueryOptions<
      AxiosResponse<any>, // TQueryFnData
      Error, // TError
      any // TData
    >
  >;
};

export const useGetData = ({
  queryKey,
  dataProtected,
  options,
}: fetchProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
    isRefetching,
    isStale,
  } = useQuery<AxiosResponse<any>, Error, any>({
    queryKey,
    queryFn: async () => await axiosInstance.get(`/${dataProtected}`),
    placeholderData: keepPreviousData,
    refetchIntervalInBackground: true,
    ...options, // ← merge opsi tambahan
  });

  return {
    data,
    isLoading,
    isError,
    isStale,
    isSuccess,
    refetch,
    isRefetching,
  };
};
