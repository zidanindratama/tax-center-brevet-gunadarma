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
import { usePostData } from "@/hooks/use-post-data";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useFileUploader } from "@/hooks/use-file-uploader";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import FileInput from "@/components/ui/file-input";
import {
  CreateCourseFormData,
  CreateCourseSchema,
} from "./_schemas/course-create-schema";

const CourseFormCreate = () => {
  const { uploadFile } = useFileUploader();

  const form = useForm<CreateCourseFormData>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: "",
      short_description: "",
      description: "",
      learning_outcomes: "",
      achievements: "",
      course_files: [],
    },
  });

  const { mutate: submitCourse, isPending } = usePostData({
    queryKey: "courses",
    dataProtected: `courses`,
    successMessage: "Kursus berhasil ditambahkan!",
    backUrl: "/dashboard/kursus",
  });

  const onSubmit = async (values: CreateCourseFormData) => {
    const newUrls: string[] = [];
    const existingUrls: string[] = [];

    for (const file of values.course_files) {
      if (typeof file === "string") {
        existingUrls.push(file);
      } else if (file instanceof File) {
        const url = await uploadFile(file, "images");
        if (url) newUrls.push(url);
      }
    }

    const payload = {
      ...values,
      course_images: [
        ...existingUrls.map((url) => ({ image_url: url })),
        ...newUrls.map((url) => ({ image_url: url })),
      ],
    };

    submitCourse(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Kursus</CardTitle>
            <CardDescription>
              Lengkapi informasi kursus baru di sini.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Kursus</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan judul kursus" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Singkat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkan deskripsi singkat"
                    />
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
                  <FormLabel>Deskripsi Lengkap</FormLabel>
                  <FormControl>
                    <MinimalTiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Tuliskan deskripsi lengkap kursus..."
                      autofocus
                      editable
                      output="html"
                      className="w-full"
                      editorContentClassName="p-4 prose"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="learning_outcomes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasil Pembelajaran (Learning Outcomes)</FormLabel>
                  <FormControl>
                    <MinimalTiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Apa yang akan dipelajari peserta?"
                      autofocus={false}
                      editable
                      output="html"
                      className="w-full"
                      editorContentClassName="p-4 prose"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pencapaian (Achievements)</FormLabel>
                  <FormControl>
                    <MinimalTiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Apa yang akan dicapai peserta?"
                      autofocus={false}
                      editable
                      output="html"
                      className="w-full"
                      editorContentClassName="p-4 prose"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course_files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar Kursus</FormLabel>
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
                "Simpan Kursus"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CourseFormCreate;
