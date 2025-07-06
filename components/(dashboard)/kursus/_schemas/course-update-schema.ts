import { z } from "zod";

export const UpdateCourseSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  short_description: z.string().min(1, "Deskripsi singkat wajib diisi"),
  description: z.string().min(1, "Deskripsi lengkap wajib diisi"),
  learning_outcomes: z.string().min(1, "Learning outcomes wajib diisi"),
  achievements: z.string().min(1, "Achievements wajib diisi"),
  course_files: z
    .array(z.union([z.instanceof(File), z.string()]))
    .min(1, "Minimal upload 1 gambar kursus")
    .max(10, "Maksimal 10 gambar diperbolehkan"),
});

export type UpdateCourseFormData = z.infer<typeof UpdateCourseSchema>;
