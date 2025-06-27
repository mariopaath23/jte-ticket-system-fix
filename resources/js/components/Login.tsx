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
          Masuk
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-900 h-auto sm:max-w-[680px] border border-gray-200 dark:border-gray-700">
        <div className="p-6 rounded text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-6 text-center">
              Masuk
            </DialogTitle>
          </DialogHeader>
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}