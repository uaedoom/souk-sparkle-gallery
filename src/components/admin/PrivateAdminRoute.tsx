
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
      try {
        // First check localStorage admin login (for backward compatibility)
        const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (isAdminLoggedIn) {
          console.log("Admin logged in via localStorage");
          // If using localStorage auth, immediately mark as authorized
          setIsAuthorized(true);
          
          // Also try to sign in with Supabase for RLS policies, but don't block on this
          try {
            // Don't await here, just attempt the sign-in in the background
            supabase.auth.signInWithPassword({
              email: 'admin@souksparkle.com',
              password: 'admin',
            }).then(() => {
              console.log("Supabase admin login attempted");
            }).catch(err => {
              console.error("Non-critical Supabase auth error:", err);
            });
          } catch (supabaseError) {
            console.error("Non-critical Supabase auth error:", supabaseError);
            // Continue anyway since we're using localStorage
          }
        } else {
          // Check if user is authenticated with Supabase
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            console.log("User authenticated with Supabase session");
            // User is authenticated with Supabase, mark as authorized
            setIsAuthorized(true);
          } else {
            console.log("No authentication found");
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // In case of any error, we default to not authorized
      } finally {
        // Always set loading to false, regardless of outcome
        setLoading(false);
      }
    };
    
    // Small delay to ensure localStorage has been set
    setTimeout(checkAuth, 100);
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
