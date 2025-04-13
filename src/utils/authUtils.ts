
import { supabase } from "@/integrations/supabase/client";

/**
 * Utility function to completely reset authentication state
 * This can be used when auth is stuck or not working properly
 */
export const resetAuthState = async () => {
  try {
    // Clear localStorage items related to authentication
    localStorage.removeItem("adminLoggedIn");
    
    // Sign out from Supabase
    await supabase.auth.signOut();
    
    // Clear any other Supabase storage keys
    localStorage.removeItem("supabase-auth");
    localStorage.removeItem("supabase.auth.token");
    
    console.log("Authentication state has been reset");
    return true;
  } catch (error) {
    console.error("Error resetting auth state:", error);
    return false;
  }
};
