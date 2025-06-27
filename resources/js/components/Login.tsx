import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";

export default function Login(){
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white h-auto sm:max-w-[680px]">
        <div className="p-6 rounded">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-6 text-center">
              Login
            </DialogTitle>
          </DialogHeader>
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}