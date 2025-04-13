
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
import { createDefaultAdmin } from "@/utils/adminUtils";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLoginHelp() {
  const [resetting, setResetting] = useState(false);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const { toast } = useToast();
  
  const clearLocalStorage = async () => {
    setResetting(true);
    try {
      await resetAuthState();
      toast({
        title: "Authentication reset",
        description: "Login state has been reset. Please try logging in again.",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error resetting auth state:", error);
      toast({
        title: "Reset failed",
        description: "An error occurred while resetting login state.",
        variant: "destructive",
      });
      setResetting(false);
    }
  };
  
  const setupDefaultAdmin = async () => {
    setCreatingAdmin(true);
    try {
      const result = await createDefaultAdmin(
        "admin@souksparkle.com",
        "admin123",
        "admin"
      );
      
      if (result.success) {
        toast({
          title: "Default admin created",
          description: "You can now login with email: admin@souksparkle.com and password: admin123",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast({
          title: "Admin creation failed",
          description: result.error || "An error occurred",
          variant: "destructive",
        });
        setCreatingAdmin(false);
      }
    } catch (error: any) {
      console.error("Error creating default admin:", error);
      toast({
        title: "Admin creation failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setCreatingAdmin(false);
    }
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
            <p>Default admin email: <span className="text-gold">admin@souksparkle.com</span></p>
            <p>Default admin password: <span className="text-gold">admin123</span></p>
          </div>
          <div className="text-luxury-light">
            <h3 className="font-medium">Troubleshooting Steps</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ensure cookies and local storage are enabled in your browser</li>
              <li>Try using a private/incognito window</li>
              <li>Clear browser cache and try again</li>
              <li>If you can't log in, try resetting the login state</li>
              <li>If no admin account exists, you can create the default admin</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={clearLocalStorage}
              disabled={resetting || creatingAdmin}
            >
              {resetting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Login State"
              )}
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-gold/20 text-gold hover:bg-gold/10"
              onClick={setupDefaultAdmin}
              disabled={resetting || creatingAdmin}
            >
              {creatingAdmin ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Default Admin"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
