import { Building2, LifeBuoy, Send, SquareTerminal, User } from "lucide-react";

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
      name: "Umum",
      url: "/dashboard/member-umum",
      icon: Building2,
    },
    {
      name: "Mahasiswa",
      url: "/dashboard/member-mahasiswa",
      icon: User,
    },
  ],
};
