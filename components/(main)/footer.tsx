import { Separator } from "@/components/ui/separator";
import { navLinks } from "@/lib/data/nav-links";
import { Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerSections = [
  {
    title: "Tentang",
    links: navLinks.about,
  },
  {
    title: "Jadwal",
    links: navLinks.schedule,
  },
  {
    title: "DB-Tax",
    links: navLinks.db_tax,
  },
  {
    title: "Berita",
    links: navLinks.news,
  },
];

const Footer = () => {
  return (
    <footer className="mt-12 xs:mt-20 dark bg-background border-t">
      <div className="max-w-screen-xl mx-auto py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6">
        <div className="col-span-full xl:col-span-2">
          <Link href="/">
            <Image
              src="/logo-tc.png"
              alt="Logo Tax Center"
              width={150}
              height={50}
            />
          </Link>
          <p className="mt-4 text-muted-foreground">
            Platform edukasi dan pelatihan perpajakan Universitas Gunadarma.
          </p>
        </div>

        <div className="xl:justify-self-end">
          <h6 className="font-semibold text-foreground">Alamat</h6>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Kampus D</span>
              <p>Jl. Margonda Raya No. 100, Depok, Jawa Barat (021) 78881112</p>
            </li>
            <li>
              <span className="font-medium text-foreground">Kampus F4</span>
              <p>
                Jl. Raya Bogor No. 28, Depok 16951, Jawa Barat (021) 39730888
              </p>
            </li>
          </ul>
        </div>

        {footerSections.map(({ title, links }) => (
          <div key={title} className="xl:justify-self-end">
            <h6 className="font-semibold text-foreground">{title}</h6>
            <ul className="mt-6 space-y-4">
              {links.map(({ title: linkTitle, href }) => (
                <li key={linkTitle}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {linkTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator />

      <div className="max-w-screen-xl mx-auto py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6">
        <span className="text-muted-foreground text-center xs:text-start">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="#" target="_blank">
            Tim IT Tax Center
          </Link>
          . All rights reserved.
        </span>

        <div className="flex items-center gap-5 text-muted-foreground">
          <Link href="https://www.instagram.com/taxcenter.ug" target="_blank">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/taxcenter-ug"
            target="_blank"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="zidanindratama03@gmail.com" target="_blank">
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
