import * as React from "react";
import { cn } from "@/lib/utils";

function Navbar({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar"
      className={cn("flex items-center justify-between py-4", className)}
      {...props}
    />
  );
}

function NavbarLeft({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-left"
      className={cn("flex items-center justify-start gap-4", className)}
      {...props}
    />
  );
}

function NavbarRight({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-right"
      className={cn("flex items-center justify-end gap-4", className)}
      {...props}
    />
  );
}

function NavbarCenter({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-center"
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    />
  );
}

export { Navbar, NavbarLeft, NavbarRight, NavbarCenter };
