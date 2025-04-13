
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Hardcoded admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";
// For Supabase auth (this email doesn't need to exist)
const ADMIN_EMAIL = "admin@souksparkle.com";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // Check if admin is already logged in via localStorage (legacy)
      const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
      
      // Check if user is authenticated with Supabase
      const { data } = await supabase.auth.getSession();
      
      if (isAdminLoggedIn || data.session) {
        navigate("/admin/dashboard");
      }
      
      setCheckingSession(false);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simple credential check for admin
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set admin as logged in via localStorage (legacy)
        localStorage.setItem("adminLoggedIn", "true");
        
        // Try to sign in with Supabase for RLS access, but don't block if it fails
        try {
          await supabase.auth.signInWithPassword({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
          });
        } catch (supabaseError) {
          console.error("Non-critical Supabase auth error:", supabaseError);
          // Continue anyway since we're using localStorage for admin auth
        }
        
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard",
        });
        
        // Small delay to ensure localStorage is set before navigating
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 100);
      } else {
        // Try to sign in user with Supabase (for regular users who are traders)
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: username, // Assuming username is an email
            password: password
          });
          
          if (error) {
            toast({
              title: "Access denied",
              description: "Invalid credentials",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login successful",
              description: "Welcome to the admin dashboard",
            });
            
            setTimeout(() => {
              navigate("/admin/dashboard");
            }, 100);
          }
        } catch (supabaseError) {
          toast({
            title: "Authentication error",
            description: "Failed to authenticate with Supabase",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error signing in",
        description: "An error occurred while trying to sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
              <label htmlFor="username" className="block text-sm text-luxury-light mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-luxury-light" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
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
                  placeholder="Enter admin password"
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
