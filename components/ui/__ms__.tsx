"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import GoogleSvg from "../design/GoogleSvg";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "lucide-react";

const dialogState = {
  isOpen: false,
  options: {} as ShowLoginOptions,
  setIsOpen: null as null | ((open: boolean) => void),
};

export function sm(options: ShowLoginOptions) {
  const defaultOptions: ShowLoginOptions = {
    title: "Login Required",
    description: "Please login with Google to continue",
    onCancel: () => {},
  };

  dialogState.options = { ...defaultOptions, ...options };

  if (dialogState.setIsOpen) {
    dialogState.setIsOpen(true);
  } else {
    setTimeout(() => {
      if (dialogState.setIsOpen) {
        dialogState.setIsOpen(true);
      }
    }, 100);
  }
}

export function SMProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dialogState.setIsOpen = setIsOpen;

    return () => {
      dialogState.setIsOpen = null;
    };
  }, []);

  const handleGoogleLogin = () => {
    setIsOpen(false);
    router.push("/login");
  };

  // const handleClose = () => {
  //   setIsOpen(false);
  //   if (dialogState.options.onCancel) {
  //     dialogState.options.onCancel();
  //   }
  // };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-8 rounded-xl">
        <DialogHeader className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="font-bold text-2xl italic">Medium</div>
          </div>
          <DialogTitle className="text-xl font-normal">
            {dialogState.options.description}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full py-6">
              Log in
            </Button>
          </Link>

          <div className="text-xs text-center text-gray-500 mt-2">
            By creating an account you agree with our{" "}
            <a href="#" className="text-gray-700 hover:underline">
              Terms of Service
            </a>
            ,{" "}
            <a href="#" className="text-gray-700 hover:underline">
              Privacy Policy
            </a>
            , and our default{" "}
            <a href="#" className="text-gray-700 hover:underline">
              Notification Settings
            </a>
            .
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
