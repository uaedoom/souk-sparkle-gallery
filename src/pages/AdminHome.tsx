
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, ShoppingBag, Calendar, TrendingUp, ImageIcon, Settings } from "lucide-react";

export default function AdminHome() {
  const [stats, setStats] = useState({
    traders: 0,
    applications: 0,
    products: 0,
    pendingApplications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total number of traders
        const { count: tradersCount, error: tradersError } = await supabase
          .from('traders')
          .select('*', { count: 'exact', head: true });
        
        if (tradersError) throw tradersError;
        
        // Get total number of applications
        const { count: applicationsCount, error: applicationsError } = await supabase
          .from('trader_applications')
          .select('*', { count: 'exact', head: true });
        
        if (applicationsError) throw applicationsError;
        
        // Get pending applications count
        const { count: pendingCount, error: pendingError } = await supabase
          .from('trader_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
        
        if (pendingError) throw pendingError;
        
        // Get total number of products
        const { count: productsCount, error: productsError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });
        
        if (productsError) throw productsError;
        
        setStats({
          traders: tradersCount || 0,
          applications: applicationsCount || 0,
          products: productsCount || 0,
          pendingApplications: pendingCount || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Traders" 
          value={stats.traders} 
          icon={Users}
          color="bg-blue-500"
          loading={loading}
        />
        <StatCard 
          title="Pending Applications" 
          value={stats.pendingApplications} 
          icon={Calendar}
          color="bg-amber-500"
          loading={loading}
        />
        <StatCard 
          title="Total Products" 
          value={stats.products} 
          icon={ShoppingBag}
          color="bg-emerald-500"
          loading={loading}
        />
        <StatCard 
          title="Total Applications" 
          value={stats.applications} 
          icon={TrendingUp}
          color="bg-purple-500"
          loading={loading}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Welcome to the SoukSparkle admin dashboard. From here, you can manage trader applications, 
              products, and site content. Use the navigation sidebar to access different sections.
            </p>
            <div className="mt-4 space-y-4">
              <div className="p-4 rounded-md bg-stone">
                <h3 className="font-medium">Getting Started</h3>
                <p className="text-sm text-luxury-light mt-1">
                  Check the "Trader Applications" section to review and approve new trader applications.
                  Approved traders will be automatically added to the marketplace.
                </p>
              </div>
              <div className="p-4 rounded-md bg-stone">
                <h3 className="font-medium">What's New</h3>
                <p className="text-sm text-luxury-light mt-1">
                  This admin dashboard allows you to manage all aspects of your SoukSparkle marketplace.
                  More features will be added in future updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/admin/trader-applications" className="p-4 rounded-md bg-stone border border-gold/20 hover:border-gold transition-colors cursor-pointer">
                <Users className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-medium">Manage Traders</h3>
                <p className="text-sm text-luxury-light mt-1">
                  Review and approve pending trader applications.
                </p>
              </Link>
              <Link to="/admin/products" className="p-4 rounded-md bg-stone border border-gold/20 hover:border-gold transition-colors cursor-pointer">
                <ShoppingBag className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-medium">Manage Products</h3>
                <p className="text-sm text-luxury-light mt-1">
                  Add, edit or remove products from the marketplace.
                </p>
              </Link>
              <Link to="/admin/media" className="p-4 rounded-md bg-stone border border-gold/20 hover:border-gold transition-colors cursor-pointer">
                <ImageIcon className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-medium">Upload Media</h3>
                <p className="text-sm text-luxury-light mt-1">
                  Upload images and manage media files.
                </p>
              </Link>
              <Link to="/admin/settings" className="p-4 rounded-md bg-stone border border-gold/20 hover:border-gold transition-colors cursor-pointer">
                <Settings className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-medium">Settings</h3>
                <p className="text-sm text-luxury-light mt-1">
                  Configure site settings and preferences.
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  loading: boolean;
}

function StatCard({ title, value, icon: Icon, color, loading }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-luxury-light">{title}</p>
            <h3 className="text-3xl font-bold mt-1">
              {loading ? "..." : value}
            </h3>
          </div>
          <div className={`rounded-full p-2 ${color} bg-opacity-10`}>
            <Icon className={`h-6 w-6 ${color} text-opacity-90`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
