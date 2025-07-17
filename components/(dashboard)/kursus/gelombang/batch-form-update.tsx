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
import { usePutData } from "@/hooks/use-put-data";
import { useFileUploader } from "@/hooks/use-file-uploader";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { useGetData } from "@/hooks/use-get-data";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  CreateBatchFormData,
  CreateBatchSchema,
} from "./_schemas/batch-create-schema";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/ui/multiple-selector";
import { DAY_OPTIONS } from "./_constants/day-options";
import { TCourseBatch } from "./_types/course-batch-type";

const BatchFormUpdate = () => {
  const { uploadFile } = useFileUploader();
  const params = useParams();
  const courseSlug = params.slug as string;
  const batchSlug = params.batchSlug as string;

  const [isReady, setIsReady] = useState(false);

  const form = useForm<CreateBatchFormData>({
    resolver: zodResolver(CreateBatchSchema),
    defaultValues: {
      title: "",
      description: "",
      start_at: undefined,
      end_at: undefined,
      room: "",
      quota: 50,
      batch_thumbnail: "",
      days: [],
      course_type: "offline",
    },
  });

  const { data, isLoading } = useGetData({
    queryKey: ["batches", batchSlug],
    dataProtected: `batches/${batchSlug}`,
  });

  console.log(data?.data?.data);

  const { mutate: updateBatch, isPending } = usePutData({
    queryKey: "batches",
    dataProtected: `batches/${data?.data?.data?.id}`,
    successMessage: "Gelombang berhasil diperbarui!",
    backUrl: `/dashboard/kursus/${courseSlug}/gelombang`,
  });

  useEffect(() => {
    if (data?.data?.data && !form.formState.isDirty) {
      const batch: TCourseBatch = data.data.data;

      form.reset({
        title: batch.title || "",
        description: batch.description || "",
        start_at: new Date(batch.start_at),
        end_at: new Date(batch.end_at),
        room: batch.room || "",
        quota: batch.quota || 50,
        batch_thumbnail: batch.batch_thumbnail || "",
        days: batch.days.map((d) => d.day) || [],
        course_type: batch.course_type || "offline",
      });

      setIsReady(true);
    }
  }, [data, form]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file, "images");
    form.setValue("batch_thumbnail", url || "", { shouldValidate: true });
  };

  const onSubmit = (values: CreateBatchFormData) => {
    updateBatch(values);
  };

  if (!isReady) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Update Gelombang</CardTitle>
            <CardDescription>Perbarui informasi gelombang.</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Judul gelombang" />
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
                    <MinimalTiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Masukkan deskripsi gelombang"
                      autofocus={false}
                      editable={true}
                      output="html"
                      className="w-full max-w-full overflow-hidden"
                      editorContentClassName="prose max-w-none p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel htmlFor="start_at">Tanggal Mulai</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        placeholder="Pilih tanggal mulai"
                        value={field.value}
                        onChange={field.onChange}
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
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel htmlFor="end_at">Tanggal Selesai</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        placeholder="Pilih tanggal selesai"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruangan</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nama ruangan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kuota</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Jumlah peserta"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hari</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      placeholder="Pilih hari"
                      emptyIndicator={
                        <p className="text-center text-sm text-gray-500">
                          Tidak ada hari ditemukan.
                        </p>
                      }
                      defaultOptions={DAY_OPTIONS}
                      value={DAY_OPTIONS.filter((opt) =>
                        field.value.includes(opt.value)
                      )}
                      onChange={(selected) =>
                        field.onChange(selected.map((item) => item.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe Kursus</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih tipe kursus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="batch_thumbnail"
              render={() => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
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
              disabled={isPending || isLoading}
              className="w-full md:w-fit"
              variant="orange"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
                </>
              ) : (
                "Perbarui Data"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default BatchFormUpdate;
