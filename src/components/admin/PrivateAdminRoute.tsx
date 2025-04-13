
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

interface PrivateAdminRouteProps {
  children: React.ReactNode;
}

const PrivateAdminRoute = ({ children }: PrivateAdminRouteProps) => {
  // Use our new admin authentication hook
  const { loading: authLoading, isAuthenticated } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check localStorage admin login (for backward compatibility)
        const isLegacyAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (isLegacyAdminLoggedIn) {
          console.log("Admin logged in via localStorage (legacy)");
          setIsAuthorized(true);
        } else if (isAuthenticated) {
          console.log("Admin authenticated via Supabase");
          setIsAuthorized(true);
        } else {
          // If not authenticated via either method, check if user exists in admins table
          if (!authLoading) {
            const { data: session } = await supabase.auth.getSession();
            
            if (session && session.session) {
              const { data: adminData, error } = await supabase
                .from('admins')
                .select('*')
                .eq('user_id', session.session.user.id)
                .single();
                
              if (adminData && !error) {
                console.log("Admin found in database", adminData);
                setIsAuthorized(true);
              } else {
                console.log("User is not an admin");
              }
            } else {
              console.log("No authentication found");
            }
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading) {
      checkAuth();
    }
  }, [authLoading, isAuthenticated]);
  
  if (loading || authLoading) {
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
