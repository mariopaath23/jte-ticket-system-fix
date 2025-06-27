import { FormEventHandler, useState } from "react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { Toaster, toast } from "sonner";

interface LoginData {
  email: string;
  password: string;
}

export function LoginForm() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginData>>({
    email: "",
    password: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisibility(!passwordVisibility);

  const handleLogin: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Berhasil masuk.");
        reset("password");
      },
      onError: () => {
        toast.error("Email atau kata sandi tidak sesuai.");
      },
    });
  };

  return (
    <>
      <Toaster richColors position="top-center" />

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <Label className="text-sm" htmlFor="email">
            Email UNSRAT
          </Label>
          <Input
            id="email"
            type="email"
            className="mt-3 px-4 w-full h-[48px]"
            placeholder="Masukkan email UNSRAT anda (@unsrat.ac.id / @student.unsrat.ac.id)"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            disabled={processing}
            autoFocus
            autoComplete="email"
          />
          <InputError message={errors.email} />
        </div>

        <div>
          <Label className="text-sm" htmlFor="password">
            Kata Sandi
          </Label>
          <div className="flex w-full h-[48px] mt-3 items-center">
            <Input
              id="password"
              type={passwordVisibility ? "text" : "password"}
              className="px-4"
              placeholder="Masukkan password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              disabled={processing}
              autoComplete="current-password"
            />
            <Button
              type="button"
              onClick={togglePasswordVisibility}
              variant={"outline"}
              disabled={processing}
            >
              {passwordVisibility ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <InputError message={errors.password} />

          <Button
            type="submit"
            size={"lg"}
            className="w-full mt-6"
            disabled={processing}
          >
            {processing ? "Sedang masuk..." : "Masuk"}
          </Button>
        </div>
      </form>
    </>
  );
}