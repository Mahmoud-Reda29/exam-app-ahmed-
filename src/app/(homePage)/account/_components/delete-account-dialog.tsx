"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

interface DeleteAccountDialogProps {
  onConfirm?: () => void;
  isPending: boolean;
}

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({
  onConfirm,
  isPending,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="">
        <Button type="button" variant="delete" className="w-full">
          {isPending ? "Deleting..." : " Delete My Account"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white font-mono w-[558px] justify-center items-center ">
        <AlertDialogCancel className="top-2 right-2 border-none text-gray-400   absolute">
          <X className="h-5 w-5" />
        </AlertDialogCancel>
        <AlertDialogHeader className="h-72 flex flex-col items-center justify-center gap-4">
          {/* Updated icon with background circles */}

          <div className="flex justify-center relative mb-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-28 h-28 rounded-full bg-red-100 opacity-60" />
              <div className="absolute w-20 h-20 rounded-full bg-red-100 opacity-80" />
              <AlertTriangle className="h-12 w-12 text-red-600 relative z-10" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <AlertDialogTitle className="text-center text-red-600 font-medium text-base">
              Are you sure you want to delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center font-normal text-gray-500 text-sm">
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center gap-2 flex-1 ">
          <AlertDialogCancel className="px-6 w-full border-none bg-gray-200 text-gray-800 hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600   text-white hover:bg-red-200 hover:text-red-600 px-6 w-full"
            onClick={onConfirm}
          >
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
