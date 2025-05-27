"use client";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, HomeIcon } from "@radix-ui/react-icons";
import { navLinks } from "@/lib/data/nav-links";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4 border-b transition-colors">
      <div className="flex flex-row justify-between items-center max-w-7xl w-full mx-auto">
        <Link href="/">
          <Image
            src="/logo-tc.png"
            alt="Logo Tax Center"
            width={150}
            height={50}
          />
        </Link>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tentang Kami</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <HomeIcon className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tentang Kami
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Informasi seputar Tax Center, bantuan pengguna, dan
                            FAQ.
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    {navLinks.about.map((link) => (
                      <ListItem
                        key={link.href}
                        href={link.href}
                        title={link.title}
                      >
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Jadwal</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {navLinks.schedule.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="px-4 py-2 text-sm font-medium hover:underline"
                >
                  <Link
                    href="https://database-pajak.tcugapps.com/"
                    target="_blank"
                  >
                    DB-Tax
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="px-4 py-2 text-sm font-medium hover:underline"
                >
                  <Link href="/berita">Berita</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden md:flex flex-row gap-6">
          <ModeToggle />
          <Button variant="purple" className="px-12 py-4 rounded-full">
            Daftar
          </Button>
        </div>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <HamburgerMenuIcon className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">menu</SheetTitle>
              <SheetHeader className="text-left mt-10">
                <div className="mt-4 space-y-2">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Tentang</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-4">
                          {navLinks.about.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="text-sm text-muted-foreground"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Jadwal</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-4">
                          {navLinks.schedule.map((component) => (
                            <li key={component.href}>
                              <Link
                                href={component.href}
                                className="text-sm text-muted-foreground"
                              >
                                {component.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>DB-Tax</AccordionTrigger>
                      <AccordionContent>
                        {navLinks.db_tax.map((doc) => (
                          <Link
                            key={doc.href}
                            href={doc.href}
                            className="text-sm text-muted-foreground pl-4 block"
                          >
                            {doc.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Berita</AccordionTrigger>
                      <AccordionContent>
                        {navLinks.news.map((doc) => (
                          <Link
                            key={doc.href}
                            href={doc.href}
                            className="text-sm text-muted-foreground pl-4 block"
                          >
                            {doc.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="pt-6 flex flex-col gap-4">
                    <ModeToggle className="w-full rounded-lg" />
                    <Button variant="purple" className="w-full">
                      Daftar
                    </Button>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
