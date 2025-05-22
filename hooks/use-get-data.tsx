import axiosInstance from "@/helpers/axios-instance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type fetchProps = {
  queryKey: [string, string] | [string];
  dataProtected: string;
};

export const useGetData = ({ queryKey, dataProtected }: fetchProps) => {
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
