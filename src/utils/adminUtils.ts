
import { supabase } from "@/integrations/supabase/client";

/**
 * Check if there are any admin accounts in the system
 * @returns Promise<boolean> True if at least one admin exists, false otherwise
 */
export const checkAdminExists = async (): Promise<boolean> => {
  try {
    const { count, error } = await supabase
      .from("admins")
      .select("*", { count: 'exact', head: true });
    
    if (error) {
      console.error("Error checking admin existence:", error);
      return false;
    }
    
    return count !== null && count > 0;
  } catch (error) {
    console.error("Error checking admin existence:", error);
    return false;
  }
};

/**
 * Create a default admin account - ONLY USE FOR SETUP
 * @param email Admin email
 * @param password Admin password
 * @param username Admin username
 * @returns Promise with result object
 */
export const createDefaultAdmin = async (
  email: string, 
  password: string, 
  username: string
): Promise<{success: boolean, error?: string, admin?: any}> => {
  try {
    // First check if admins already exist
    const adminExists = await checkAdminExists();
    if (adminExists) {
      return {
        success: false,
        error: "Admin accounts already exist"
      };
    }
    
    // Create user in Supabase auth
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
          is_super_admin: true
        }
      ])
      .select()
      .single();
    
    if (adminError) {
      throw adminError;
    }
    
    return { success: true, admin: adminData };
  } catch (error: any) {
    console.error("Admin setup error:", error);
    return { 
      success: false, 
      error: error.message || "Failed to create admin account" 
    };
  }
};
