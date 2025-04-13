
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  featured: boolean;
  in_stock: boolean;
  description: string | null;
  image_url: string | null;
  trader_id: string;
  created_at: string;
  updated_at: string;
  specs: any;
}

interface TraderApplication {
  id: string;
  business_name: string;
  business_description: string;
  contact_email: string;
  contact_phone: string;
  physical_location: string;
  product_category: string;
  specialty: string;
  website: string | null;
  years_experience: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user_id: string;
}

interface Trader {
  id: string;
  name: string;
  description: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  physical_location: string | null;
  specialty: string | null;
  website: string | null;
  logo_url: string | null;
  banner_url: string | null;
  established_date: string | null;
  rating: number | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export default function AdminTables() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [traders, setTraders] = useState<Trader[]>([]);
  const [applications, setApplications] = useState<TraderApplication[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (table: string) => {
    setLoading(true);
    
    try {
      console.log(`Fetching data from ${table} table...`);
      
      switch (table) {
        case "products":
          const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('*');
          
          if (productsError) throw productsError;
          setProducts(productsData || []);
          break;
          
        case "traders":
          const { data: tradersData, error: tradersError } = await supabase
            .from('traders')
            .select('*');
          
          if (tradersError) throw tradersError;
          setTraders(tradersData || []);
          break;
          
        case "trader_applications":
          const { data: applicationsData, error: applicationsError } = await supabase
            .from('trader_applications')
            .select('*');
          
          if (applicationsError) throw applicationsError;
          setApplications(applicationsData || []);
          break;
          
        case "wishlist_items":
          const { data: wishlistData, error: wishlistError } = await supabase
            .from('wishlist_items')
            .select('*');
          
          if (wishlistError) throw wishlistError;
          setWishlistItems(wishlistData || []);
          break;
      }
    } catch (error: any) {
      console.error(`Error fetching ${table} data:`, error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold gold-gradient mb-4">Database Tables</h1>
      <p className="text-luxury-light mb-6">View and manage all data stored in the database.</p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="traders">Traders</TabsTrigger>
          <TabsTrigger value="trader_applications">Applications</TabsTrigger>
          <TabsTrigger value="wishlist_items">Wishlist Items</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="bg-card rounded-md shadow">
          <Table>
            <TableCaption>List of all products in the database</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>In Stock</TableHead>
                <TableHead>Trader ID</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">No products found</TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.price} {product.currency}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.featured ? "Yes" : "No"}</TableCell>
                    <TableCell>{product.in_stock ? "Yes" : "No"}</TableCell>
                    <TableCell className="font-mono text-xs">{product.trader_id}</TableCell>
                    <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="traders" className="bg-card rounded-md shadow">
          <Table>
            <TableCaption>List of all traders in the database</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : traders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">No traders found</TableCell>
                </TableRow>
              ) : (
                traders.map((trader) => (
                  <TableRow key={trader.id}>
                    <TableCell className="font-medium">{trader.name}</TableCell>
                    <TableCell>{trader.specialty || "-"}</TableCell>
                    <TableCell>{trader.contact_email || "-"}</TableCell>
                    <TableCell>{trader.contact_phone || "-"}</TableCell>
                    <TableCell>{trader.physical_location || "-"}</TableCell>
                    <TableCell className="font-mono text-xs">{trader.user_id}</TableCell>
                    <TableCell>{new Date(trader.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="trader_applications" className="bg-card rounded-md shadow">
          <Table>
            <TableCaption>List of all trader applications in the database</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Years Exp.</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">No applications found</TableCell>
                </TableRow>
              ) : (
                applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.business_name}</TableCell>
                    <TableCell>{application.specialty}</TableCell>
                    <TableCell>{application.product_category}</TableCell>
                    <TableCell>{application.contact_email}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>{application.years_experience}</TableCell>
                    <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="wishlist_items" className="bg-card rounded-md shadow">
          <Table>
            <TableCaption>List of all wishlist items in the database</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Product ID</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : wishlistItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">No wishlist items found</TableCell>
                </TableRow>
              ) : (
                wishlistItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">{item.id}</TableCell>
                    <TableCell className="font-mono text-xs">{item.user_id}</TableCell>
                    <TableCell className="font-mono text-xs">{item.product_id}</TableCell>
                    <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
