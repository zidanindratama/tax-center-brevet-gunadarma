"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import * as React from "react";
import { NavManagement } from "./nav-management";
import { ModeToggle } from "./ui/mode-toggle";
import { LayoutDashboard } from "lucide-react";
import { routeItems } from "@/lib/data/route-items";
import { NavSecondary } from "./nav-secondary";
import Link from "next/link";
import Image from "next/image";
import { useGetData } from "@/hooks/use-get-data";
import { TUser } from "./(dashboard)/profile/_types/user-type";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: myUserData } = useGetData({
    queryKey: ["me"],
    dataProtected: "users/me",
  });

  const myUser: TUser | undefined = myUserData?.data?.data;

  const filteredMainNav = routeItems.navMain;
  const filteredManagement = routeItems.managementNav;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row items-center justify-between gap-14">
            <Link href="/">
              <Image
                src="/logo-dark-tc.png"
                alt="Logo Tax Center"
                width={150}
                height={50}
                className="block dark:hidden"
                priority
              />
              <Image
                src="/logo-dark-tc.png"
                alt="Logo Tax Center Dark"
                width={150}
                height={50}
                className="hidden dark:block"
                priority
              />
            </Link>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Beranda</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={"/dashboard"}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {filteredManagement.length > 0 && (
          <NavManagement projects={filteredManagement} />
        )}
        {filteredMainNav.length > 0 && <NavMain items={filteredMainNav} />}
        <NavSecondary items={routeItems.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: myUser?.name || "Memuat...",
            email: myUser?.email || "-",
            avatar: myUser?.avatar || "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
