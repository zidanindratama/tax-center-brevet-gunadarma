import { z } from "zod";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const SignUpSchema = z
  .object({
    role: z.enum(["mahasiswa gunadarma", "mahasiswa non-gunadarma", "umum"]),
    name: z.string().min(3, "Nama lengkap wajib diisi"),
    username: z.string().min(3, "Username minimal 3 karakter"),
    phone: z.string().min(10, "Nomor telepon tidak valid"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirm_password: z
      .string()
      .min(6, "Konfirmasi password minimal 6 karakter"),
    group_id: z.string().regex(uuidRegex, "Group ID tidak valid"),
    institution: z.string().min(2, "Institusi wajib diisi"),
    origin: z.string().min(2, "Asal daerah wajib diisi"),
    birth_date: z.date(),
    address: z.string().min(5, "Alamat wajib diisi"),
    nim: z.string().optional(),
    nim_proof: z.string().optional(),
    nik: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Password dan konfirmasi tidak cocok",
  })
  .superRefine((data, ctx) => {
    const isUmum = data.role === "umum";

    if (isUmum) {
      if (!data.nik) {
        ctx.addIssue({
          path: ["nik"],
          code: z.ZodIssueCode.custom,
          message: "NIK wajib diisi untuk peserta umum.",
        });
      }
    } else {
      if (!data.nim) {
        ctx.addIssue({
          path: ["nim"],
          code: z.ZodIssueCode.custom,
          message: "NIM wajib diisi.",
        });
      }
      if (!data.nim_proof) {
        ctx.addIssue({
          path: ["nim_proof"],
          code: z.ZodIssueCode.custom,
          message: "Bukti NIM wajib diunggah.",
        });
      }
    }
  });
