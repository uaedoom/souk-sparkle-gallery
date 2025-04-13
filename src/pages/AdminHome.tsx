
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, ShoppingBag, Calendar, TrendingUp, ImageIcon, Settings, Database } from "lucide-react";

export default function AdminHome() {
  const [stats, setStats] = useState({
    traders: 0,
    applications: 0,
    products: 0,
    pendingApplications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats immediately on load
    fetchStats();
    
    // Also add a 1-second fallback refresh in case authentication takes time
    const refreshTimer = setTimeout(() => {
      if (stats.pendingApplications === 0) {
        console.log("Refreshing stats after delay...");
        fetchStats();
      }
    }, 1000);
    
    return () => clearTimeout(refreshTimer);
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      console.log("Fetching admin dashboard stats...");
      
      // Get total number of traders
      const { data: tradersData, error: tradersError } = await supabase
        .from('traders')
        .select('id');
      
      if (tradersError) console.error("Error fetching traders:", tradersError);
      
      // Get all applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('trader_applications')
        .select('id, status');
      
      if (applicationsError) console.error("Error fetching applications:", applicationsError);
      
      // Get total number of products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id');
      
      if (productsError) console.error("Error fetching products:", productsError);
      
      // Calculate pending applications from the full data
      const pendingApplications = applicationsData ? 
        applicationsData.filter(app => app.status === 'pending').length : 0;
      
      console.log("Stats calculated:", {
        traders: tradersData?.length || 0,
        applications: applicationsData?.length || 0,
        pendingApplications,
        products: productsData?.length || 0
      });
      
      // Update stats with whatever data we successfully retrieved
      setStats({
        traders: tradersData?.length || 0,
        applications: applicationsData?.length || 0,
        products: productsData?.length || 0,
        pendingApplications
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold gold-gradient mb-4">Dashboard Overview</h1>
      <p className="text-luxury-light mb-6">Welcome to your SoukSparkle admin control center. View key statistics and access important features.</p>
      
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Recent Activity</CardTitle>
            <Link to="/admin/dashboard/trader-applications" className="text-sm text-gold hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Welcome to the SoukSparkle admin dashboard. From here, you can manage trader applications, 
              products, and site content. Use the navigation sidebar to access different sections.
            </p>
            <div className="space-y-4">
              <div className="flex items-center p-4 rounded-md bg-stone border border-gold/10">
                <div className="mr-4 rounded-full p-2 bg-amber-500 bg-opacity-10">
                  <Calendar className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium">New Trader Applications</h3>
                  <p className="text-sm text-luxury-light mt-1">
                    Check the "Trader Applications" section to review and approve pending applications.
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-md bg-stone border border-gold/10">
                <div className="mr-4 rounded-full p-2 bg-blue-500 bg-opacity-10">
                  <Database className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Database Tables</h3>
                  <p className="text-sm text-luxury-light mt-1">
                    Use the Database Tables section to view all data stored in your Supabase database.
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-md bg-stone border border-gold/10">
                <div className="mr-4 rounded-full p-2 bg-emerald-500 bg-opacity-10">
                  <Settings className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-medium">Configure Settings</h3>
                  <p className="text-sm text-luxury-light mt-1">
                    Customize your marketplace settings and preferences in the Settings section.
                  </p>
                </div>
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
              <Link to="/admin/dashboard/trader-applications" className="p-4 rounded-md bg-stone border border-gold/20 hover:border-gold transition-colors cursor-pointer">
                <Users className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-medium">Manage Traders</h3>
                <p className="text-sm text-luxury-light mt-1">
                  Review and approve pending trader applications.
                </p>
              </Link>
              <Link to="/admin/dashboard/products" className="p-4 rounded-md bg-stone border border-gold/20 hover:border-gold transition-colors cursor-pointer">
                <ShoppingBag className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-medium">Manage Products</h3>
                <p className="text-sm text-luxury-light mt-1">
                  Add, edit or remove products from the marketplace.
                </p>
              </Link>
              <Link to="/admin/dashboard/media" className="p-4 rounded-md bg-stone border border-gold/20 hover:border-gold transition-colors cursor-pointer">
                <ImageIcon className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-medium">Upload Media</h3>
                <p className="text-sm text-luxury-light mt-1">
                  Upload images and manage media files.
                </p>
              </Link>
              <Link to="/admin/dashboard/tables" className="p-4 rounded-md bg-stone border border-gold/20 hover:border-gold transition-colors cursor-pointer">
                <Database className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-medium">Database Tables</h3>
                <p className="text-sm text-luxury-light mt-1">
                  View all data from database tables.
                </p>
              </Link>
              <Link to="/admin/dashboard/settings" className="p-4 rounded-md bg-stone border border-gold/20 hover:border-gold transition-colors cursor-pointer">
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
  // Determine link based on title
  let link = "";
  if (title.includes("Traders")) {
    link = "/admin/dashboard/trader-applications";
  } else if (title.includes("Products")) {
    link = "/admin/dashboard/products";
  } else if (title.includes("Applications")) {
    link = "/admin/dashboard/trader-applications";
  } else if (title.includes("Media")) {
    link = "/admin/dashboard/media";
  }

  const card = (
    <Card className={link ? "cursor-pointer hover:shadow-md transition-shadow" : ""}>
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

  if (link) {
    return <Link to={link}>{card}</Link>;
  }
  
  return card;
}
