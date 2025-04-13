
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Hook for fetching products
export const useProducts = (
  options: {
    limit?: number;
    featured?: boolean;
    category?: string;
    traderId?: string;
  } = {}
) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Cast to any to bypass TypeScript's strict checking
        const supabaseAny = supabase as any;
        
        let query = supabaseAny
          .from('products')
          .select('*, trader:traders(id, name)');
        
        if (options.featured !== undefined) {
          query = query.eq('featured', options.featured);
        }
        
        if (options.category) {
          query = query.eq('category', options.category);
        }
        
        if (options.traderId) {
          query = query.eq('trader_id', options.traderId);
        }
        
        if (options.limit) {
          query = query.limit(options.limit);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setProducts(data || []);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options.limit, options.featured, options.category, options.traderId]);

  return { products, loading, error };
};

// Hook for fetching a single product
export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const supabaseAny = supabase as any;
        
        const { data, error } = await supabaseAny
          .from('products')
          .select('*, trader:traders(*)')
          .eq('id', id)
          .maybeSingle();
        
        if (error) throw error;
        
        setProduct(data);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

// Hook for fetching traders
export const useTraders = (
  options: {
    limit?: number;
    search?: string;
    specialty?: string;
  } = {}
) => {
  const [traders, setTraders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        setLoading(true);
        
        const supabaseAny = supabase as any;
        
        let query = supabaseAny.from('traders').select('*');
        
        if (options.search) {
          query = query.ilike('name', `%${options.search}%`);
        }
        
        if (options.specialty) {
          query = query.ilike('specialty', `%${options.specialty}%`);
        }
        
        if (options.limit) {
          query = query.limit(options.limit);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setTraders(data || []);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching traders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTraders();
  }, [options.limit, options.search, options.specialty]);

  return { traders, loading, error };
};

// Hook for fetching a single trader
export const useTrader = (id: string | undefined) => {
  const [trader, setTrader] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchTrader = async () => {
      try {
        setLoading(true);
        
        const supabaseAny = supabase as any;
        
        const { data, error } = await supabaseAny
          .from('traders')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (error) throw error;
        
        setTrader(data);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching trader:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrader();
  }, [id]);

  return { trader, loading, error };
};

// Hook for managing wishlist items
export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        setWishlistItems([]);
        return;
      }
      
      const supabaseAny = supabase as any;
      
      const { data, error } = await supabaseAny
        .from('wishlist_items')
        .select('*, product:products(*)')
        .eq('user_id', session.session.user.id);
      
      if (error) throw error;
      
      setWishlistItems(data || []);
    } catch (err: any) {
      setError(err);
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        fetchWishlist();
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const addToWishlist = async (productId: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("You must be logged in to add items to your wishlist");
      }
      
      const supabaseAny = supabase as any;
      
      const { error } = await supabaseAny
        .from('wishlist_items')
        .insert({
          user_id: session.session.user.id,
          product_id: productId
        });
      
      if (error) throw error;
      
      fetchWishlist();
      return true;
    } catch (err: any) {
      console.error("Error adding to wishlist:", err);
      throw err;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("You must be logged in to remove items from your wishlist");
      }
      
      const supabaseAny = supabase as any;
      
      const { error } = await supabaseAny
        .from('wishlist_items')
        .delete()
        .eq('user_id', session.session.user.id)
        .eq('product_id', productId);
      
      if (error) throw error;
      
      fetchWishlist();
      return true;
    } catch (err: any) {
      console.error("Error removing from wishlist:", err);
      throw err;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.product_id === productId);
  };

  return { 
    wishlistItems, 
    loading, 
    error, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  };
};
