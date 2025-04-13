
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface PrivateAdminRouteProps {
  children: React.ReactNode;
}

const PrivateAdminRoute = ({ children }: PrivateAdminRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      // First check localStorage admin login (for backward compatibility)
      const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      
      if (isAdminLoggedIn) {
        // If admin is logged in via localStorage, also sign in with Supabase
        // This ensures RLS policies will work
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: 'admin@souksparkle.com',
            password: 'admin',
          });
          
          if (!error) {
            setIsAuthorized(true);
          }
        } catch (error) {
          console.error("Error signing in admin with Supabase:", error);
        }
      } else {
        // Check if user is authenticated with Supabase
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          // User is authenticated with Supabase, mark as authorized
          setIsAuthorized(true);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-dark">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gold" />
          <p className="mt-4 text-luxury-light">Verifying access...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

export default PrivateAdminRoute;
