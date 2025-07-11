import * as z from "zod";

export const CreateBatchSchema = z.object({
  title: z.string().min(3, { message: "Judul wajib diisi" }),
  description: z.string().min(5, { message: "Deskripsi wajib diisi" }),
  start_at: z.date({ required_error: "Tanggal mulai wajib diisi" }),
  end_at: z.date({ required_error: "Tanggal selesai wajib diisi" }),
  room: z.string().min(2, { message: "Ruangan wajib diisi" }),
  quota: z.coerce.number().min(1, { message: "Minimal 1 peserta" }),
  batch_thumbnail: z.string().min(1, { message: "Gambar wajib diunggah" }),
  course_type: z.enum(["online", "offline"], {
    errorMap: () => ({ message: "Tipe kursus wajib dipilih" }),
  }),
  days: z
    .array(z.string())
    .min(1, { message: "Minimal pilih 1 hari" })
    .refine((val) => val.every((v) => typeof v === "string")),
});

export type CreateBatchFormData = z.infer<typeof CreateBatchSchema>;
