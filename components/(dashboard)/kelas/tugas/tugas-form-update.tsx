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
import { useGetData } from "@/hooks/use-get-data";
import {
  CreateAssignmentFormData,
  CreateAssignmentSchema,
} from "./_schemas/assignment-create-schema";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { normalizeToUTCDateOnly } from "../../profile/_libs/normalize-to-utc-date";
import { usePatchData } from "@/hooks/use-patch-data";
import { TAssignment } from "./_types/tugas-type";

type Props = {
  assignmentId: string;
  meetingId?: string;
  batchSlug: string;
};

const TugasFormUpdate = ({ assignmentId, meetingId, batchSlug }: Props) => {
  const { uploadFile } = useFileUploader();
  const [initialUrls, setInitialUrls] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  const { data, isLoading: isFetching } = useGetData({
    queryKey: ["assignment", assignmentId],
    dataProtected: `assignments/${assignmentId}`,
    options: { refetchOnWindowFocus: false },
  });

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

  const { mutate: updateAssignment, isPending } = usePatchData({
    queryKey: "assignments",
    dataProtected: `assignments/${assignmentId}`,
    successMessage: "Tugas berhasil diperbarui!",
    backUrl: `/dashboard/kelas/${batchSlug}/tugas?${meetingId}`,
  });

  const handleRemoveInitial = (index: number) => {
    setInitialUrls((prev) => {
      const newUrls = prev.filter((_, i) => i !== index);

      const currentFiles = form.getValues("assignment_files") as (
        | string
        | File
      )[];

      const updatedFiles = currentFiles.filter((file) =>
        typeof file === "string" ? newUrls.includes(file) : true
      );

      form.setValue("assignment_files", updatedFiles);

      return newUrls;
    });
  };

  const onSubmit = async (values: CreateAssignmentFormData) => {
    const newUrls: string[] = [];
    const existingUrls: string[] = [];

    for (const file of values.assignment_files) {
      if (typeof file === "string") {
        existingUrls.push(file);
      } else {
        const isImage = file.type.startsWith("image/");
        const url = await uploadFile(file, isImage ? "images" : "documents");
        if (url) newUrls.push(url);
      }
    }

    const payload = {
      ...values,
      assignment_id: assignmentId,
      start_at: normalizeToUTCDateOnly(values.start_at),
      end_at: normalizeToUTCDateOnly(values.end_at),
      assignment_files: [...existingUrls, ...newUrls],
    };

    console.log(payload);

    updateAssignment(payload);
  };

  useEffect(() => {
    if (data?.data?.data && !form.formState.isDirty) {
      const tugas = data.data.data as TAssignment;
      const oldUrls = tugas.assignment_files.map((f) => f.file_url);

      form.reset({
        title: tugas.title ?? "",
        description: tugas.description ?? "",
        type: tugas.type ?? "file",
        start_at: new Date(tugas.start_at),
        end_at: new Date(tugas.end_at),
        assignment_files: oldUrls,
      });

      setInitialUrls(oldUrls);
      setIsReady(true);
    }
  }, [data, form]);

  if (!isReady) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Perbarui Tugas</CardTitle>
            <CardDescription>
              Ubah informasi tugas di bawah ini.
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
                    <Input {...field} disabled={isFetching} />
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
                    <Input {...field} disabled={isFetching} />
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
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isFetching}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
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
                    <FileInput
                      onFilesChange={field.onChange}
                      initialUrls={initialUrls}
                      onRemoveInitial={handleRemoveInitial}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={isPending || isFetching}
              className="w-full md:w-fit"
              variant="orange"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Perbarui Tugas"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default TugasFormUpdate;
