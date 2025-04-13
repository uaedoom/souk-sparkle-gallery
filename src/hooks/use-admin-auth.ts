
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AdminData {
  id: string;
  username: string;
  is_super_admin: boolean;
}

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Initialize - check if user is authenticated as admin
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        // First check existing session
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (!sessionData.session) {
          console.log("No active session found");
          setLoading(false);
          return;
        }
        
        // Check if user is in admins table
        const { data: adminResult, error: adminError } = await supabase
          .from("admins")
          .select("*")
          .eq("user_id", sessionData.session.user.id)
          .single();
        
        if (adminError || !adminResult) {
          console.log("User is not an admin:", adminError?.message);
          setLoading(false);
          return;
        }
        
        console.log("Admin authenticated:", adminResult);
        setAdminData(adminResult);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Admin auth check error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        
        if (event === "SIGNED_OUT") {
          setAdminData(null);
          setIsAuthenticated(false);
        } else if (event === "SIGNED_IN" && session) {
          // Recheck admin status on sign in
          checkAdminAuth();
        }
      }
    );
    
    checkAdminAuth();
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Login as admin
  const loginAdmin = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // First sign in with Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error("Authentication successful but no user data returned");
      }
      
      // Check if user is in admins table
      const { data: adminResult, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", data.user.id)
        .single();
      
      if (adminError) {
        // Not an admin, sign out
        await supabase.auth.signOut();
        throw new Error("User is not an admin");
      }
      
      setAdminData(adminResult);
      setIsAuthenticated(true);
      return { success: true, admin: adminResult };
    } catch (error: any) {
      console.error("Admin login error:", error);
      return { 
        success: false, 
        error: error.message || "Failed to authenticate" 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register new admin account
  const registerAdmin = async (
    email: string, 
    password: string, 
    username: string,
    isSuperAdmin: boolean = false
  ) => {
    setLoading(true);
    
    try {
      // First create user in Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { is_admin: true }
        }
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error("Signup successful but no user data returned");
      }
      
      // Add user to admins table
      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .insert([
          { 
            user_id: data.user.id, 
            username,
            is_super_admin: isSuperAdmin
          }
        ])
        .select()
        .single();
      
      if (adminError) {
        // Clean up by deleting the auth user if admin insert fails
        console.error("Failed to create admin record, cleaning up auth user");
        throw adminError;
      }
      
      return { success: true, admin: adminData };
    } catch (error: any) {
      console.error("Admin registration error:", error);
      return { 
        success: false, 
        error: error.message || "Failed to register admin account" 
      };
    } finally {
      setLoading(false);
    }
  };

  // Log out admin
  const logoutAdmin = async () => {
    try {
      await supabase.auth.signOut();
      setAdminData(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error: any) {
      console.error("Admin logout error:", error);
      return { 
        success: false, 
        error: error.message || "Failed to sign out" 
      };
    }
  };

  return {
    loading,
    adminData,
    isAuthenticated,
    loginAdmin,
    registerAdmin,
    logoutAdmin
  };
};
