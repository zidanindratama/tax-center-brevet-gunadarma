import { LifeBuoy, Send, SquareTerminal, User, Users } from "lucide-react";

export const routeItems = {
  navMain: [
    {
      title: "Berita",
      url: "/dashboard/berita",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "List Berita",
          url: "/dashboard/berita",
        },
        {
          title: "Tambah Berita",
          url: "/dashboard/berita/tambah",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Bantuan",
      url: "/bantuan",
      icon: LifeBuoy,
    },
    {
      title: "Umpan Balik",
      url: "/umpan-balik",
      icon: Send,
    },
  ],
  managementNav: [
    {
      name: "Member",
      url: "/dashboard/member",
      icon: User,
    },
    {
      name: "Guru",
      url: "/dashboard/guru",
      icon: Users,
    },
  ],
};
