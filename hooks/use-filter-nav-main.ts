import { LucideIcon } from "lucide-react";
import { routePermissions } from "@/middleware";
import { useDecodedToken } from "./use-decoded-token";

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon; // ⬅️ Ganti dari React.ElementType ke LucideIcon
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export const useFilteredNavMain = (menu: NavItem[]) => {
  const decodedToken = useDecodedToken();

  if (!decodedToken) return [];

  const role = decodedToken.role?.toLowerCase();
  let allowedRoutes: string[] = [];

  switch (role) {
    case "admin":
      allowedRoutes = [
        ...routePermissions.baseRoutes,
        ...routePermissions.adminRoutes,
        ...routePermissions.commonAdminAndTeacherRoutes,
      ];
      break;
    case "guru":
      allowedRoutes = [
        ...routePermissions.baseRoutes,
        ...routePermissions.teacherRoutes,
        ...routePermissions.commonAdminAndTeacherRoutes,
      ];
      break;
    case "siswa":
      allowedRoutes = [
        ...routePermissions.baseRoutes,
        ...routePermissions.studentRoutes,
      ];
      break;
  }

  return menu
    .map((nav) => {
      const filteredItems = nav.items?.filter((item) =>
        allowedRoutes.some((allowed) => item.url.startsWith(allowed))
      );
      if (filteredItems && filteredItems.length > 0) {
        return { ...nav, items: filteredItems };
      }
      return null;
    })
    .filter(Boolean) as NavItem[];
};
