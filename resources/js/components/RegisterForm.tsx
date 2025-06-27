"use client";

import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
 } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export function RegisterForm() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };
  
  return(
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">
          Nama
        </Label>
        <Input 
          className="px-3.5 py-2.5"
          placeholder="Masukkan nama anda"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">
          Email UNSRAT
        </Label>
        <Input 
          className="px-3.5 py-2.5"
          placeholder="example@unsrat.ac.id | example@student.unsrat.ac.id"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">
          NIP / NIM
        </Label>
        <Input
          className="px-3.5 py-2.5"
          placeholder="Masukkan NIP atau NIM anda"
        />
      </div>

      <div className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col gap-1.5 md:w-1/2 w-full">
          <Label className="text-sm">
            Password
          </Label>
          <div className="flex">
            <Input 
              type={passwordVisibility ? "text" : "password"}
              className="px-3.5 py-2.5"
              placeholder="Masukkan password"
            />
            <Button variant={"outline"} onClick={togglePasswordVisibility}>
              {passwordVisibility ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 md:w-1/2 w-full">
          <Label className="text-sm">
            Konfirmasi Password
          </Label>
          <div className="flex">
            <Input
              type={confirmPasswordVisibility ? "text" : "password"}
              className="px-3.5 py-2.5"
              placeholder="Konfirmasi Password"
            />
            <Button variant={"outline"} onClick={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisibility ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        </div>
      </div>
      <Button size={"lg"} className="w-full mt-3">
        Daftar
      </Button>
    </div>
  )
}