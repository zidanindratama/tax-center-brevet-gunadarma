import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
      <div className="max-w-screen-xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0">
        <div className="max-w-xl w-full flex flex-col items-center text-center lg:items-start lg:text-left">
          <Badge className="bg-[#54458C] text-white rounded-full py-1 border-none">
            Terbuka Pendaftaran!
          </Badge>
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
            Tax Center Brevet Gunadarma
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Platform pelatihan pajak resmi Universitas Gunadarma. Daftarkan
            dirimu untuk mengikuti kursus Brevet A & B, workshop pajak, dan
            layanan konsultasi pajak profesional.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant={"purple"}
              size="lg"
              className="w-full sm:w-auto rounded-full text-base"
              asChild
            >
              <Link href={"/auth/sign-up"}>
                Daftar Sekarang <ArrowUpRight className="!h-5 !w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative lg:max-w-lg xl:max-w-xl w-full bg-accent rounded-xl aspect-square">
          <Image
            src="/brevet/brevet-1.jpg"
            fill
            alt="Hero Image"
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
