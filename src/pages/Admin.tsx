
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock } from "lucide-react";

// This is temporary until we have proper role management
// Replace this with the admin email that should have access
const ADMIN_EMAIL = "admin@example.com"; 

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          setCheckingStatus(false);
          return;
        }
        
        // Check if user email matches admin email
        if (session.session.user.email === ADMIN_EMAIL) {
          setIsAdmin(true);
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setCheckingStatus(false);
      }
    };
    
    checkAdminStatus();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Check if the user is an admin by email
      if (data.user?.email === ADMIN_EMAIL) {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/admin/dashboard");
      } else {
        await supabase.auth.signOut();
        toast({
          title: "Access denied",
          description: "You do not have admin privileges",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-dark">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gold" />
          <p className="mt-4 text-luxury-light">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return null; // Will be redirected to dashboard
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-dark">
      <div className="w-full max-w-md p-8 space-y-8 bg-stone-dark border border-gold/20 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold gold-gradient mb-2">
            SoukSparkle Admin
          </h1>
          <p className="text-luxury-light">Sign in to access the admin dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-luxury-light mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-luxury-light" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-stone border-gold/20 focus:border-gold"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm text-luxury-light mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-luxury-light" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 bg-stone border-gold/20 focus:border-gold"
                  required
                />
              </div>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light text-stone-dark py-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in to Admin"
            )}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-luxury-light">
            Return to{" "}
            <a href="/" className="text-gold hover:underline">
              Main Site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
