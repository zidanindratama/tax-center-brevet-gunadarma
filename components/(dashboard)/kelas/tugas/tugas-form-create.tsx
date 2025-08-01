"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useFileUploader } from "@/hooks/use-file-uploader";
import FileInput from "@/components/ui/file-input";
import { usePostData } from "@/hooks/use-post-data";
import {
  CreateAssignmentFormData,
  CreateAssignmentSchema,
} from "./_schemas/assignment-create-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { normalizeToUTCDateOnly } from "../../profile/_libs/normalize-to-utc-date";

type Props = {
  batchSlug: string;
  meetingId?: string;
};

const TugasFormCreate = ({ meetingId, batchSlug }: Props) => {
  console.log(meetingId);

  const { uploadFile } = useFileUploader();

  const form = useForm<CreateAssignmentFormData>({
    resolver: zodResolver(CreateAssignmentSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "file",
      start_at: undefined,
      end_at: undefined,
      assignment_files: [],
    },
  });

  const { mutate: submitAssignment, isPending } = usePostData({
    queryKey: "assignments",
    dataProtected: `meetings/${meetingId}/assignments`,
    successMessage: "Tugas berhasil ditambahkan!",
    backUrl: `/dashboard/kelas/${batchSlug}/tugas?${meetingId}`,
  });

  const onSubmit = async (values: CreateAssignmentFormData) => {
    const uploadedUrls: string[] = [];

    for (const file of values.assignment_files) {
      if (typeof file === "string") {
        uploadedUrls.push(file);
      } else {
        const isImage = file.type.startsWith("image/");
        const url = await uploadFile(file, isImage ? "images" : "documents");
        if (url) uploadedUrls.push(url);
      }
    }

    const payload = {
      ...values,
      start_at: normalizeToUTCDateOnly(values.start_at),
      end_at: normalizeToUTCDateOnly(values.end_at),
      assignment_files: uploadedUrls,
    };

    submitAssignment(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Tugas</CardTitle>
            <CardDescription>
              Silakan isi detail tugas di bawah ini.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Tugas</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Contoh: Tugas Golang" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Contoh: Kerjakan soal linked list dan concurrency"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe Tugas</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih tipe tugas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="file">File</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mulai</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        placeholder="Pilih tanggal & waktu mulai"
                        value={field.value}
                        onChange={field.onChange}
                        granularity="day"
                        displayFormat={{ hour24: "PPP" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selesai</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        placeholder="Pilih tanggal & waktu selesai"
                        value={field.value}
                        onChange={field.onChange}
                        granularity="day"
                        displayFormat={{ hour24: "PPP" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="assignment_files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Tugas</FormLabel>
                  <FormControl>
                    <FileInput onFilesChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-fit"
              variant="orange"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default TugasFormCreate;
