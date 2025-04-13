
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample featured products data
const featuredProducts = [
  {
    id: 1,
    name: "18K Gold Arabic Bracelet",
    category: "Gold",
    price: "$2,450",
    image: "/images/product-1.jpg", // We'll use placeholder for now
    trader: "Al Romaizan Jewellery"
  },
  {
    id: 2,
    name: "Diamond Solitaire Ring",
    category: "Diamonds",
    price: "$3,899",
    image: "/images/product-2.jpg",
    trader: "Damas Jewellery"
  },
  {
    id: 3,
    name: "Emerald & Gold Necklace",
    category: "Stones",
    price: "$5,299",
    image: "/images/product-3.jpg",
    trader: "Joyalukkas"
  },
  {
    id: 4,
    name: "22K Gold Chain",
    category: "Gold",
    price: "$1,850",
    image: "/images/product-4.jpg",
    trader: "Malabar Gold & Diamonds"
  },
  {
    id: 5,
    name: "Ruby & Diamond Earrings",
    category: "Stones",
    price: "$2,750",
    image: "/images/product-5.jpg",
    trader: "Sky Jewellery"
  },
  {
    id: 6,
    name: "Diamond Tennis Bracelet",
    category: "Diamonds",
    price: "$7,499",
    image: "/images/product-6.jpg",
    trader: "Dhamani Jewels"
  }
];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="group bg-stone border border-gold/10 rounded-lg overflow-hidden hover-scale"
            >
              {/* Product Image */}
              <div className={`aspect-square ${placeholderColors[index]} relative overflow-hidden`}>
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
                  className="absolute top-3 right-3 bg-black/20 hover:bg-black/40 text-white rounded-full w-9 h-9 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Product Info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-white">
                      {product.name}
                    </h3>
                    <p className="text-luxury text-sm">
                      by {product.trader}
                    </p>
                  </div>
                  <span className="text-gold font-semibold">
                    {product.price}
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

        <div className="text-center mt-12">
          <Button className="bg-gold hover:bg-gold-light text-stone-dark px-8">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
}
