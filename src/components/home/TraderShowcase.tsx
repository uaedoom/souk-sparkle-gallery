
import { Link } from "react-router-dom";
import { Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample traders data
const featuredTraders = [
  {
    id: 1,
    name: "Al Romaizan Jewellery",
    specialty: "Gold & Traditional Jewelry",
    rating: 4.9,
    reviews: 324,
    image: "/images/trader-1.jpg" // We'll use placeholder for now
  },
  {
    id: 2,
    name: "Damas Jewellery",
    specialty: "Premium Diamonds & Luxury Watches",
    rating: 4.8,
    reviews: 412,
    image: "/images/trader-2.jpg"
  },
  {
    id: 3,
    name: "Joyalukkas",
    specialty: "Gold, Diamonds & Precious Stones",
    rating: 4.7,
    reviews: 286,
    image: "/images/trader-3.jpg"
  }
];

export function TraderShowcase() {
  return (
    <section className="py-16 bg-stone-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
              Featured <span className="gold-gradient">Traders</span>
            </h2>
            <p className="text-luxury-light max-w-2xl">
              Meet the most trusted traders from Dubai Gold Souk, offering exceptional craftsmanship and service.
            </p>
          </div>
          <Link to="/traders" className="mt-4 md:mt-0 group flex items-center text-gold hover:text-gold-light">
            <span className="font-medium">View All Traders</span>
            <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTraders.map((trader) => (
            <div 
              key={trader.id} 
              className="bg-stone border border-gold/10 rounded-lg overflow-hidden hover-scale"
            >
              {/* Trader Image/Logo Placeholder */}
              <div className="h-40 bg-stone-light/10 flex items-center justify-center">
                <span className="font-playfair text-xl text-luxury opacity-50">
                  {trader.name}
                </span>
              </div>
              
              {/* Trader Info */}
              <div className="p-6">
                <h3 className="font-playfair font-semibold text-xl text-white mb-2">
                  {trader.name}
                </h3>
                <p className="text-luxury-light text-sm mb-4">
                  {trader.specialty}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        fill={i < Math.floor(trader.rating) ? "#D4AF37" : "none"}
                        stroke={i < Math.floor(trader.rating) ? "#D4AF37" : "#9F9EA1"}
                        className="h-4 w-4"
                      />
                    ))}
                  </div>
                  <span className="text-gold font-medium">{trader.rating}</span>
                  <span className="text-luxury-light text-sm ml-1">({trader.reviews} reviews)</span>
                </div>
                
                <Link to={`/traders/${trader.id}`}>
                  <Button className="w-full bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20">
                    Visit Shop
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
