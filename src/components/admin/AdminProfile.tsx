
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminProfile() {
  const { adminData } = useAdminAuth();
  const [email, setEmail] = useState<string | null>(null);
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data && data.user) {
        setEmail(data.user.email);
      }
    };
    
    getUser();
  }, []);
  
  if (!adminData) return null;
  
  return (
    <div className="flex items-center space-x-4 p-4 mb-6 bg-stone border border-gold/10 rounded-md">
      <Avatar className="h-12 w-12 border border-gold/20">
        <AvatarFallback className="bg-gold/10 text-gold">
          {adminData.username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">{adminData.username}</h3>
          {adminData.is_super_admin && (
            <Badge variant="outline" className="bg-gold/10 text-gold border-gold/20">
              Super Admin
            </Badge>
          )}
        </div>
        {email && <p className="text-sm text-luxury-light">{email}</p>}
      </div>
    </div>
  );
}
