  "use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Login from "@/components/Login";
import Register from "@/components/Register";
import { router } from "@inertiajs/react";

export default function NavbarHome() {
  return (
    <nav className="bg-[#F9F6EE] dark:bg-[#1A1A1A] py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-black dark:text-white">JTE Ticketing System</a>
          <ul className="flex space-x-6">
            <li>
              <Login />
            </li>
            <li>
              <Register />
            </li>
            <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">I'm a Dev</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Dev Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                <DropdownMenuItem onMouseDown={() => router.visit("/")}>
                    Take me to /Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onMouseDown={() => router.visit("/status")}>
                    Take me to /Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onMouseDown={() => router.visit("/student/dashboard")}>
                    Take me to /studentdashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onMouseDown={() => router.visit("/admin/dashboard")}>
                    Take me to /admindashboard
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </nav>
  );
}