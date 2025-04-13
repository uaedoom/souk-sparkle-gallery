
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User, Lock } from "lucide-react";

// Hardcoded admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (isAdminLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple credential check
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set admin as logged in
      localStorage.setItem("adminLoggedIn", "true");
      
      toast({
        title: "Admin login successful",
        description: "Welcome to the admin dashboard",
      });
      
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Access denied",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
    
    setLoading(false);
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
