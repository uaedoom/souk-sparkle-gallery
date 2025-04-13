
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  status: 'available' | 'out_of_stock' | 'discontinued';
  trader_id: string;
  trader_name?: string;
  created_at: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll simulate a successful fetch
      // In a real app, this would be a Supabase query
      // const { data, error } = await supabase.from('products').select('*');
      
      // Demo data
      const demoData: Product[] = [
        {
          id: '1',
          name: 'Handcrafted Leather Bag',
          price: 299.99,
          category: 'Leather Goods',
          status: 'available',
          trader_id: '101',
          trader_name: 'Moroccan Leathercraft',
          created_at: '2023-05-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Traditional Carpet (3x5m)',
          price: 1299.99,
          category: 'Home Decor',
          status: 'available',
          trader_id: '102',
          trader_name: 'Atlas Carpets',
          created_at: '2023-06-22T14:45:00Z'
        },
        {
          id: '3',
          name: 'Ceramic Tea Set',
          price: 89.99,
          category: 'Kitchenware',
          status: 'out_of_stock',
          trader_id: '103',
          trader_name: 'Fez Pottery',
          created_at: '2023-04-10T09:15:00Z'
        },
        {
          id: '4',
          name: 'Argan Oil (100ml)',
          price: 49.99,
          category: 'Beauty',
          status: 'available',
          trader_id: '104',
          trader_name: 'Souss Valley Cosmetics',
          created_at: '2023-07-05T11:20:00Z'
        },
        {
          id: '5',
          name: 'Handwoven Straw Hat',
          price: 39.99,
          category: 'Accessories',
          status: 'discontinued',
          trader_id: '105',
          trader_name: 'Sahara Crafts',
          created_at: '2023-03-18T16:30:00Z'
        }
      ];
      
      setProducts(demoData);
    } catch (error: any) {
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Available</Badge>;
      case 'out_of_stock':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Out of Stock</Badge>;
      case 'discontinued':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Discontinued</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        
        <Button className="bg-gold hover:bg-gold-light text-stone-dark">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 border rounded-md bg-muted/20">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="bg-card rounded-md shadow">
          <Table>
            <TableCaption>List of all products</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Trader</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.trader_name}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
