
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts, useWishlist } from "@/hooks/use-supabase-data";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

// Color placeholders for products
const placeholderColors = [
  "bg-gold/20",
  "bg-[#e6e6e6]", // Silver-like color for diamonds
  "bg-[#58a85d]/20", // Green for emeralds
  "bg-gold/30",
  "bg-[#b91c1c]/20", // Red for rubies
  "bg-[#e6e6e6]"
];

export function FeaturedProducts() {
  const { products, loading } = useProducts({ featured: true, limit: 6 });
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleWishlistToggle = async (productId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
        toast({
          title: "Removed from wishlist",
          description: "The item has been removed from your wishlist",
        });
      } else {
        await addToWishlist(productId);
        toast({
          title: "Added to wishlist",
          description: "The item has been added to your wishlist",
        });
      }
    } catch (error: any) {
      toast({
        title: "Operation failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gold-gradient">Collections</span>
          </h2>
          <p className="text-luxury-light max-w-2xl mx-auto">
            Discover our exquisite selection of premium gold, diamonds, and rare stones 
            from Dubai's finest jewelers and traders.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="animate-pulse bg-stone-dark/30 rounded-lg h-[350px]"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="group bg-stone border border-gold/10 rounded-lg overflow-hidden hover-scale"
              >
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className={`aspect-square ${placeholderColors[index % placeholderColors.length]} relative overflow-hidden`}>
                    {/* This would be replaced with actual product images */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-playfair text-xl text-stone-dark/60">
                        {product.category}
                      </span>
                    </div>
                    
                    {/* Wishlist Button */}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`absolute top-3 right-3 ${
                        isInWishlist(product.id)
                          ? 'bg-gold/80 text-stone-dark'
                          : 'bg-black/20 hover:bg-black/40 text-white'
                      } rounded-full w-9 h-9 opacity-70 group-hover:opacity-100 transition-opacity`}
                      onClick={(e) => handleWishlistToggle(product.id, e)}
                    >
                      <Heart className="h-5 w-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    </Button>
                  </div>
                </Link>
                
                {/* Product Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-playfair font-semibold text-lg text-white hover:text-gold transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-luxury text-sm">
                        by {typeof product.trader === 'object' && product.trader && 'name' in product.trader 
                          ? product.trader.name 
                          : 'Unknown Trader'}
                      </p>
                    </div>
                    <span className="text-gold font-semibold">
                      ${Number(product.price).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gold/10 flex justify-between items-center">
                    <span className="px-3 py-1 text-xs bg-stone-light text-luxury-light rounded-full">
                      {product.category}
                    </span>
                    <Link 
                      to={`/product/${product.id}`} 
                      className="text-gold text-sm font-medium hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button className="bg-gold hover:bg-gold-light text-stone-dark px-8">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
}
