
import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Image,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Loader2,
  Database
} from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage admin login first (more reliable)
        const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
        
        if (isAdminLoggedIn) {
          console.log("Admin logged in via localStorage");
          setLoading(false);
          return;
        }
        
        // If not logged in via localStorage, check Supabase session
        const { data } = await supabase.auth.getSession();
        const isSupabaseLoggedIn = !!data.session;
        
        if (isSupabaseLoggedIn) {
          console.log("User logged in via Supabase");
          setLoading(false);
          return;
        }
        
        // Neither auth method worked, redirect to login
        console.log("No valid authentication found, redirecting to login");
        toast({
          title: "Access denied",
          description: "Please login to access the admin dashboard",
          variant: "destructive",
        });
        navigate("/admin");
      } catch (error) {
        console.error("Auth check error:", error);
        toast({
          title: "Authentication error",
          description: "Please try logging in again",
          variant: "destructive",
        });
        navigate("/admin");
      }
    };
    
    // Add a delay to ensure all auth processes have completed
    setTimeout(checkAuth, 300);
    
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      // Clear admin login state from localStorage (legacy support)
      localStorage.removeItem("adminLoggedIn");
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      toast({
        title: "Signed out",
        description: "You have been signed out of the admin dashboard",
      });
      navigate("/admin");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "An error occurred while trying to sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-dark">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gold" />
          <p className="mt-4 text-luxury-light">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-stone-dark">
      {/* Sidebar */}
      <div 
        className={`fixed lg:relative inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-stone-dark border-r border-gold/20 w-64 p-6`}
      >
        {isMobile && (
          <button 
            className="absolute top-4 right-4 text-luxury-light hover:text-gold"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        )}
        
        <div className="mb-8">
          <h1 className="font-playfair text-xl font-bold gold-gradient mb-1">
            SoukSparkle Admin
          </h1>
          <p className="text-sm text-luxury-light">Management Dashboard</p>
        </div>
        
        <nav className="space-y-1">
          {[
            { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
            { name: "Trader Applications", icon: Users, path: "/admin/dashboard/trader-applications" },
            { name: "Products", icon: ShoppingBag, path: "/admin/dashboard/products" },
            { name: "Images & Media", icon: Image, path: "/admin/dashboard/media" },
            { name: "Database Tables", icon: Database, path: "/admin/dashboard/tables" },
            { name: "Settings", icon: Settings, path: "/admin/dashboard/settings" }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-3 text-luxury-light hover:bg-gold/10 hover:text-gold rounded-md transition-colors group"
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
              <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full border-gold/20 text-gold hover:bg-gold/10 justify-between"
          >
            <span className="flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-40 bg-stone-dark/95 backdrop-blur-sm border-b border-gold/20 px-6 py-4">
          <div className="flex items-center justify-between">
            {isMobile && (
              <button 
                className="text-luxury-light hover:text-gold"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            
            <div className={isMobile ? "ml-4" : ""}>
              <h2 className="text-xl font-medium">Admin Dashboard</h2>
            </div>
            
            <div className="flex items-center space-x-2">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gold/20 text-gold hover:bg-gold/10"
                >
                  View Site
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
