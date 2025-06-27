import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { RegisterForm } from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";

export default function Register(){
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Daftar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white h-auto sm:max-w-[680px]">
        <div className="p-6 rounded">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-6 text-center">
              Daftar
            </DialogTitle>
          </DialogHeader>
          <RegisterForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}