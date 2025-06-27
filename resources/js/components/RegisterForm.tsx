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
import { router } from "@inertiajs/react";

export function RegisterForm() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nim_nip: '',
    password: '',
    password_confirmation: ''
  });

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await router.post('/register', formData, {
        onSuccess: () => {
          toast.success('Registration successful!');
        },
        onError: (errors) => {
          Object.values(errors).forEach((error: any) => {
            toast.error(error);
          });
        },
        onFinish: () => {
          setIsLoading(false);
        }
      });
    } catch (error) {
      toast.error('An error occurred during registration');
      setIsLoading(false);
    }
  };
  
  return(
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">
          Nama
        </Label>
        <Input 
          className="px-3.5 py-2.5"
          placeholder="Masukkan nama anda"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">
          Email UNSRAT
        </Label>
        <Input 
          className="px-3.5 py-2.5"
          placeholder="example@unsrat.ac.id | example@student.unsrat.ac.id"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">
          NIP / NIM
        </Label>
        <Input
          className="px-3.5 py-2.5"
          placeholder="Masukkan NIP atau NIM anda"
          value={formData.nim_nip}
          onChange={(e) => handleInputChange('nim_nip', e.target.value)}
          required
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
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            <Button type="button" variant={"outline"} onClick={togglePasswordVisibility}>
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
              value={formData.password_confirmation}
              onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
              required
            />
            <Button type="button" variant={"outline"} onClick={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisibility ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        </div>
      </div>
      <Button size={"lg"} className="w-full mt-3" type="submit" disabled={isLoading}>
        {isLoading ? 'Mendaftar...' : 'Daftar'}
      </Button>
      <Toaster position="top-right" />
    </form>
  )
}