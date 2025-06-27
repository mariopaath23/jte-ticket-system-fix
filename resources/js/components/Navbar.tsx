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
import AppearanceToggleDropdown from "@/components/appearance-dropdown";
import { router } from "@inertiajs/react";

export default function NavbarHome() {
  return (
    <nav className="bg-[#F9F6EE] dark:bg-[#1A1A1A] py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-black dark:text-white">JTE Ticketing System</a>
          <ul className="flex space-x-6 items-center">
            <li>
              <Login />
            </li>
            <li>
              <Register />
            </li>
            <li>
              <AppearanceToggleDropdown />
            </li>
          </ul>
        </div>
      </nav>
  );
}