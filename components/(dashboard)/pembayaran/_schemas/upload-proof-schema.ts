import { z } from "zod";

export const UploadPaymentSchema = z.object({
  payment_proof_url: z.string().min(1, "Bukti pembayaran wajib diunggah."),
});

export type UploadPaymentFormData = z.infer<typeof UploadPaymentSchema>;
