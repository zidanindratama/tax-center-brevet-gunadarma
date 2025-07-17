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
import FileInput from "@/components/ui/file-input";
import { useGetData } from "@/hooks/use-get-data";
import { useEffect, useState } from "react";
import { TCourseImage } from "./_types/couurse-type";
import {
  UpdateCourseFormData,
  UpdateCourseSchema,
} from "./_schemas/course-update-schema";

type Props = {
  courseSlug: string;
};

const CourseFormUpdate = ({ courseSlug }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [initialUrls, setInitialUrls] = useState<string[]>([]);
  const { uploadFile } = useFileUploader();

  const { data, isLoading: isFetching } = useGetData({
    queryKey: ["courses", courseSlug],
    dataProtected: `courses/${courseSlug}`,
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const form = useForm<UpdateCourseFormData>({
    resolver: zodResolver(UpdateCourseSchema),
    defaultValues: {
      title: "",
      short_description: "",
      description: "",
      learning_outcomes: "",
      achievements: "",
      course_files: [],
    },
  });

  const { mutate: updateCourse, isPending } = usePutData({
    queryKey: "courses",
    dataProtected: `courses/${data?.data?.data?.id}`,
    successMessage: "Kursus berhasil diperbarui!",
    backUrl: "/dashboard/kursus",
  });

  const onSubmit = async (values: UpdateCourseFormData) => {
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
    updateCourse(payload);
  };

  const handleRemoveInitial = (index: number) => {
    setInitialUrls((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (data?.data?.data && !form.formState.isDirty) {
      const course = data.data.data;

      const oldUrls =
        course.course_images?.map((img: TCourseImage) => img.image_url) || [];
      form.reset({
        title: course.title || "",
        short_description: course.short_description || "",
        description: course.description || "",
        learning_outcomes: course.learning_outcomes || "",
        achievements: course.achievements || "",
        course_files: oldUrls,
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
            <CardTitle>Update Kursus</CardTitle>
            <CardDescription>
              Perbarui informasi kursus di sini.
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
                    <Input
                      {...field}
                      placeholder="Judul kursus"
                      disabled={isFetching}
                    />
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
                      placeholder="Deskripsi singkat"
                      disabled={isFetching}
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
                      key={courseSlug}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Masukkan deskripsi lengkap kursus..."
                      autofocus={false}
                      editable={!isFetching}
                      output="html"
                      className="w-full max-w-full overflow-hidden"
                      editorContentClassName="prose max-w-none p-4"
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
                      key={`lo-${courseSlug}`}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Apa yang akan dipelajari peserta?"
                      autofocus={false}
                      editable={!isFetching}
                      output="html"
                      className="w-full max-w-full overflow-hidden"
                      editorContentClassName="prose max-w-none p-4"
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
                      key={`ach-${courseSlug}`}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Apa yang akan dicapai peserta?"
                      autofocus={false}
                      editable={!isFetching}
                      output="html"
                      className="w-full max-w-full overflow-hidden"
                      editorContentClassName="prose max-w-none p-4"
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
                "Perbarui Kursus"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CourseFormUpdate;
