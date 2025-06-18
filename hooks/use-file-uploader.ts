import axiosInstance from "@/helpers/axios-instance";
import { toast } from "sonner";

type UploadType = "documents" | "images";

export const useFileUploader = () => {
  const uploadFile = async (
    file: File,
    type: UploadType
  ): Promise<string | null> => {
    // Validasi berdasarkan tipe dan ukuran
    if (type === "documents" && file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file dokumen maksimal 5MB");
      return null;
    }

    if (type === "images" && !file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("location", type === "images" ? "profile" : "docs");

    const toastId = toast.loading("Mengunggah file...");

    try {
      const res = await axiosInstance.post(`/upload/${type}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("File berhasil diunggah!", { id: toastId });

      return `https://be-brevet.tcugapps.com${res?.data.data}` || null;
    } catch (error) {
      toast.error("Gagal mengunggah file", { id: toastId });
      return null;
    }
  };

  return { uploadFile };
};
