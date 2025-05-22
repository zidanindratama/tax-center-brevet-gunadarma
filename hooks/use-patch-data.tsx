import axiosInstance from "@/helpers/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type fetchProps = {
  queryKey: string;
  dataProtected: string;
  backUrl?: string;
  multipart?: boolean;
  successMessage?: string;
};

export const usePatchData = ({
  queryKey,
  dataProtected,
  backUrl,
  multipart = false,
  successMessage = "Data berhasil diperbarui.",
}: fetchProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      const contentType = multipart
        ? "multipart/form-data"
        : "application/json";

      return axiosInstance.patch(`/${dataProtected}`, data, {
        headers: {
          "Content-Type": contentType,
        },
      });
    },
    onMutate: () => {
      toast("Mohon menunggu sebentar!", {
        description: "Data sedang dalam proses.",
      });
    },
    onError: (error: any) => {
      console.error(error);

      const msg =
        typeof error?.response?.data?.message === "string"
          ? error.response.data.message
          : error?.response?.data?.message?.message || "Gagal mengubah data.";

      toast("Terjadi kesalahan!", {
        description: msg,
      });
    },
    onSuccess: () => {
      toast("Berhasil!", {
        description: successMessage,
      });

      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (backUrl) {
        router.push(backUrl);
      }
    },
  });

  return mutation;
};
