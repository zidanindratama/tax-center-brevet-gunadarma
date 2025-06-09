"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { SignUpSchema } from "./_schema/signup-schema";
import { DateTimePicker } from "../ui/date-time-picker";
import { Textarea } from "../ui/textarea";

const ROLE_OPTIONS = [
  {
    label: "Mahasiswa Gunadarma",
    value: "MAHASISWA_GUNADARMA",
    icon: <HiOutlineUserGroup className="h-6 w-6 mb-2" />,
  },
  {
    label: "Mahasiswa Non-Gunadarma",
    value: "MAHASISWA_LUAR",
    icon: <HiOutlineUser className="h-6 w-6 mb-2" />,
  },
  {
    label: "Umum",
    value: "UMUM",
    icon: <HiOutlineUserCircle className="h-6 w-6 mb-2" />,
  },
];

export function SignupForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      username: "",
      phone: "",
      avatar: "https://example.com/avatar.png",
      email: "",
      password: "",
      confirm_password: "",
      group_id: "",
      institution: "",
      origin: "",
      birth_date: undefined,
      address: "",
      nim: "",
      nim_proof: undefined,
      nik: "",
      nik_proof: undefined,
      role: "MAHASISWA_GUNADARMA",
    },
  });

  const role = useWatch({ control: form.control, name: "role" });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    setIsPending(true);
    toast("Menyimpan data mock...", {
      description: "Ini hanya simulasi, backend belum aktif.",
    });

    try {
      await new Promise((res) => setTimeout(res, 1500));
      console.log("📦 Data mock terkirim:", values);
      toast("Pendaftaran Berhasil (Mock)!", {
        description: "Data berhasil diproses secara lokal.",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);

      toast("Terjadi kesalahan!", {
        description: "Gagal memproses data mock.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Daftar Akun Baru</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Masukkan data lengkap kamu untuk membuat akun
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {ROLE_OPTIONS.map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={option.value}
                          className="h-full min-h-[120px] flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          {option.icon}
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Budi Santoso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="budisantoso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Telepon</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asal Institusi</FormLabel>
                  <FormControl>
                    <Input placeholder="Universitas Gunadarma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asal Daerah</FormLabel>
                  <FormControl>
                    <Input placeholder="Jakarta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel htmlFor="datetime">Tanggal Lahir</FormLabel>
                <FormControl>
                  <DateTimePicker
                    placeholder="31/03/2003"
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Jl. Merdeka No. 10, Jakarta"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {role !== "UMUM" && (
            <>
              <FormField
                control={form.control}
                name="nim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIM</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nim_proof"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormLabel>Bukti NIM</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={(e) => {
                          onChange(e.target.files?.[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {role === "UMUM" && (
            <>
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input placeholder="3201234567890001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nik_proof"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem>
                    <FormLabel>Bukti NIK</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={(e) => {
                          onChange(e.target.files?.[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata Sandi</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"orange"}
            className="w-full dark:text-white"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Daftar"
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          Sudah punya akun?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Masuk di sini
          </Link>
        </div>
      </form>
    </Form>
  );
}
