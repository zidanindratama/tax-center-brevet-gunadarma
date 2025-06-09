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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostData } from "@/hooks/use-post-data";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { useForm } from "react-hook-form";
import {
  CreateNewsFormData,
  CreateNewsSchema,
} from "./_schemas/news-create-schema";

const NewsFormCreate = () => {
  const form = useForm<CreateNewsFormData>({
    resolver: zodResolver(CreateNewsSchema),
    defaultValues: {
      title: "",
      short_description: "",
      full_description: "",
    },
  });

  const { mutate: submitNews } = usePostData({
    queryKey: "news",
    dataProtected: `news`,
    successMessage: "Berita berhasil ditambahkan!",
    backUrl: "/dashboard/berita",
  });

  const onSubmit = (values: CreateNewsFormData) => {
    submitNews(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Berita</CardTitle>
            <CardDescription>Isi informasi berita terbaru.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Judul berita" />
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
                    <Textarea {...field} placeholder="Deskripsi singkat" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="full_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Isi Berita</FormLabel>
                  <FormControl>
                    <MinimalTiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Masukkan isi lengkap berita..."
                      autofocus={true}
                      editable={true}
                      output="html"
                      className="w-full"
                      editorContentClassName="p-4 prose"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" variant={"orange"}>
              Simpan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default NewsFormCreate;
