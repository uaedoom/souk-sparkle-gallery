
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User, Lock, Mail, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLoginHelp from "@/components/admin/AdminLoginHelp";
import { resetAuthState } from "@/utils/authUtils";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Default admin email for bootstrapping first admin
const DEFAULT_ADMIN_EMAIL = "admin@souksparkle.com";
const DEFAULT_ADMIN_PASSWORD = "admin123";
const DEFAULT_ADMIN_USERNAME = "admin";

export default function Admin() {
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  
  // Register state
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regIsSuperAdmin, setRegIsSuperAdmin] = useState(false);
  
  // Create default admin state
  const [creatingDefaultAdmin, setCreatingDefaultAdmin] = useState(false);
  const [adminExists, setAdminExists] = useState(true);
  
  const [activeTab, setActiveTab] = useState<string>("login");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { loading: authLoading, isAuthenticated, loginAdmin, registerAdmin } = useAdminAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Legacy check - support old localStorage admin login
        const isLegacyAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
        
        if (isLegacyAdminLoggedIn) {
          console.log("Legacy admin login detected, redirecting to dashboard");
          navigate("/admin/dashboard");
          return;
        }
        
        // Check if any admin exists in the system
        const { count, error } = await supabase
          .from("admins")
          .select("*", { count: 'exact', head: true });
          
        if (error) {
          console.error("Error checking admin existence:", error);
        } else {
          console.log("Admin count:", count);
          setAdminExists(count !== null && count > 0);
        }
        
        // If authenticated, redirect to dashboard
        if (isAuthenticated) {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setCheckingSession(false);
      }
    };
    
    if (!authLoading) {
      checkAuth();
    }
  }, [navigate, authLoading, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Reset any previous auth state to avoid conflicts
      await resetAuthState();
      
      // Try to log in with new admin system
      const result = await loginAdmin(email, password);
      
      if (result.success) {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard",
        });
        
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Access denied",
          description: result.error || "Invalid admin credentials",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error signing in",
        description: error.message || "An error occurred while trying to sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await registerAdmin(
        regEmail,
        regPassword,
        regUsername,
        regIsSuperAdmin
      );
      
      if (result.success) {
        toast({
          title: "Admin registration successful",
          description: "You can now log in with your new admin account",
        });
        
        // Reset form and switch to login tab
        setRegEmail("");
        setRegPassword("");
        setRegUsername("");
        setRegIsSuperAdmin(false);
        setActiveTab("login");
      } else {
        toast({
          title: "Registration failed",
          description: result.error || "Failed to create admin account",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Error creating admin",
        description: error.message || "An error occurred while trying to create admin account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const createDefaultAdmin = async () => {
    setCreatingDefaultAdmin(true);
    
    try {
      // Create the default admin account
      const result = await registerAdmin(
        DEFAULT_ADMIN_EMAIL,
        DEFAULT_ADMIN_PASSWORD,
        DEFAULT_ADMIN_USERNAME,
        true // Super admin
      );
      
      if (result.success) {
        toast({
          title: "Default admin created",
          description: "You can now log in with the default admin credentials",
        });
        
        setAdminExists(true);
        
        // Fill in the login form with default credentials
        setEmail(DEFAULT_ADMIN_EMAIL);
        setPassword(DEFAULT_ADMIN_PASSWORD);
      } else {
        toast({
          title: "Failed to create default admin",
          description: result.error || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error creating default admin:", error);
      toast({
        title: "Error creating default admin",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setCreatingDefaultAdmin(false);
    }
  };

  if (checkingSession || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-dark">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gold" />
          <p className="mt-4 text-luxury-light">Verifying authentication...</p>
        </div>
      </div>
    );
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
        
        {!adminExists && (
          <Alert className="mb-6 border-gold/30 bg-gold/5">
            <AlertCircle className="h-4 w-4 text-gold" />
            <AlertTitle className="text-gold">No admin accounts found</AlertTitle>
            <AlertDescription className="text-luxury-light">
              Create the default admin account to get started.
              <Button 
                onClick={createDefaultAdmin}
                disabled={creatingDefaultAdmin}
                className="mt-2 w-full bg-gold hover:bg-gold-light text-stone-dark"
                size="sm"
              >
                {creatingDefaultAdmin ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Default Admin"
                )}
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm text-luxury-light mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-luxury-light" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter admin email"
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
                      placeholder="Enter password"
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
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="regUsername" className="block text-sm text-luxury-light mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-luxury-light" />
                    <Input
                      id="regUsername"
                      type="text"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="Enter admin username"
                      className="pl-10 bg-stone border-gold/20 focus:border-gold"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="regEmail" className="block text-sm text-luxury-light mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-luxury-light" />
                    <Input
                      id="regEmail"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Enter admin email"
                      className="pl-10 bg-stone border-gold/20 focus:border-gold"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="regPassword" className="block text-sm text-luxury-light mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-luxury-light" />
                    <Input
                      id="regPassword"
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="pl-10 bg-stone border-gold/20 focus:border-gold"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    id="superAdmin"
                    type="checkbox"
                    checked={regIsSuperAdmin}
                    onChange={(e) => setRegIsSuperAdmin(e.target.checked)}
                    className="h-4 w-4 rounded border-gold/20 text-gold focus:ring-gold"
                  />
                  <label htmlFor="superAdmin" className="text-sm text-luxury-light">
                    Super Admin (has all privileges)
                  </label>
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
                    Creating Admin...
                  </>
                ) : (
                  "Register New Admin"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-luxury-light">
            Return to{" "}
            <a href="/" className="text-gold hover:underline">
              Main Site
            </a>
          </p>
          <div className="mt-2">
            <AdminLoginHelp />
          </div>
        </div>
      </div>
    </div>
  );
}
