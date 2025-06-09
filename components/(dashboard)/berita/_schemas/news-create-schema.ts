import * as z from "zod";

export const CreateNewsSchema = z.object({
  title: z.string().min(5, {
    message: "Judul harus memiliki minimal 5 karakter",
  }),
  short_description: z.string().min(10, {
    message: "Deskripsi singkat minimal 10 karakter",
  }),
  full_description: z.string().min(20, {
    message: "Deskripsi lengkap minimal 20 karakter",
  }),
  status: z.boolean(),
});

export type CreateNewsFormData = z.infer<typeof CreateNewsSchema>;
