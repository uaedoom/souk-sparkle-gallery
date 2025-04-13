
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { resetAuthState } from "@/utils/authUtils";

export default function AdminLoginHelp() {
  const clearLocalStorage = async () => {
    await resetAuthState();
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-sm text-gold/80 hover:text-gold"
        >
          Having trouble logging in?
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-stone-dark border border-gold/20">
        <DialogHeader>
          <DialogTitle className="text-gold">Admin Login Help</DialogTitle>
          <DialogDescription className="text-luxury-light">
            If you're having trouble logging in to the admin dashboard, try these steps:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-luxury-light">
            <h3 className="font-medium">Login Credentials</h3>
            <p>Default admin username: <span className="text-gold">admin</span></p>
            <p>Default admin password: <span className="text-gold">admin</span></p>
          </div>
          <div className="text-luxury-light">
            <h3 className="font-medium">Troubleshooting Steps</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure cookies and local storage are enabled in your browser</li>
              <li>Try using a private/incognito window</li>
              <li>Clear browser cache and try again</li>
              <li>If still having issues, click the reset button below</li>
            </ul>
          </div>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={clearLocalStorage}
          >
            Reset Login State
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
