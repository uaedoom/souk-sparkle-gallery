
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search, Filter, MapPin, Phone, Mail } from "lucide-react";

// Sample traders data
const tradersData = [
  {
    id: 1,
    name: "Al Romaizan Jewellery",
    specialty: "Gold & Traditional Jewelry",
    description: "Specializing in traditional Arabic gold designs and intricate craftsmanship since 1976.",
    rating: 4.9,
    reviews: 324,
    location: "Gold Souk, Shop #12, Deira",
    phone: "+971 4 226 3580",
    email: "contact@alromaizan.com",
    image: "/images/trader-1.jpg"
  },
  {
    id: 2,
    name: "Damas Jewellery",
    specialty: "Premium Diamonds & Luxury Watches",
    description: "One of the region's leading jewelry retailers offering exquisite diamond collections and luxury timepieces.",
    rating: 4.8,
    reviews: 412,
    location: "Gold Souk, Shop #45, Deira",
    phone: "+971 4 223 1424",
    email: "info@damas.com",
    image: "/images/trader-2.jpg"
  },
  {
    id: 3,
    name: "Joyalukkas",
    specialty: "Gold, Diamonds & Precious Stones",
    description: "A global jewelry retailer known for their diverse collection of gold, diamond, and gemstone jewelry.",
    rating: 4.7,
    reviews: 286,
    location: "Gold Souk, Shop #78, Deira",
    phone: "+971 4 226 5040",
    email: "care@joyalukkas.com",
    image: "/images/trader-3.jpg"
  },
  {
    id: 4,
    name: "Malabar Gold & Diamonds",
    specialty: "Gold Ornaments & Diamond Jewelry",
    description: "Renowned for their extensive range of traditional and contemporary gold and diamond jewelry.",
    rating: 4.8,
    reviews: 356,
    location: "Gold Souk, Shop #32, Deira",
    phone: "+971 4 223 0011",
    email: "info@malabargold.com",
    image: "/images/trader-4.jpg"
  },
  {
    id: 5,
    name: "Sky Jewellery",
    specialty: "Colored Gemstones & Custom Designs",
    description: "Specializing in rare colored gemstones and offering personalized custom jewelry designs.",
    rating: 4.6,
    reviews: 198,
    location: "Gold Souk, Shop #56, Deira",
    phone: "+971 4 226 4320",
    email: "support@skyjewellery.com",
    image: "/images/trader-5.jpg"
  },
  {
    id: 6,
    name: "Dhamani Jewels",
    specialty: "High-End Luxury Diamonds",
    description: "Purveyors of high-end luxury diamonds and gemstones, catering to the most discerning clientele.",
    rating: 4.9,
    reviews: 274,
    location: "Gold Souk, Shop #89, Deira",
    phone: "+971 4 223 5500",
    email: "contact@dhamani.com",
    image: "/images/trader-6.jpg"
  }
];

const Traders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Filter traders based on search term and specialty filter
  const filteredTraders = tradersData.filter(trader => {
    const matchesSearch = trader.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trader.specialty.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesFilter = filter === "all" || trader.specialty.toLowerCase().includes(filter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-stone-dark relative">
        <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg')] bg-center bg-no-repeat bg-cover"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Premier Gold Souk <span className="gold-gradient">Traders</span>
            </h1>
            <p className="text-luxury-light text-lg mb-8">
              Connect with the finest gold, diamond, and precious stone traders from Dubai's legendary Gold Souk.
            </p>
            <Button 
              className="bg-gold hover:bg-gold-light text-stone-dark px-8 py-6 text-lg"
              onClick={() => navigate("/apply-as-trader")}
            >
              Become a Trader
            </Button>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-8 bg-stone border-b border-gold/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-light h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Search traders..." 
                className="pl-10 bg-stone-dark border-gold/20 focus:border-gold"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-gold text-stone-dark" : "border-gold/20 text-luxury-light"}
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={filter === "gold" ? "default" : "outline"}
                onClick={() => setFilter("gold")}
                className={filter === "gold" ? "bg-gold text-stone-dark" : "border-gold/20 text-luxury-light"}
                size="sm"
              >
                Gold
              </Button>
              <Button 
                variant={filter === "diamond" ? "default" : "outline"}
                onClick={() => setFilter("diamond")}
                className={filter === "diamond" ? "bg-gold text-stone-dark" : "border-gold/20 text-luxury-light"}
                size="sm"
              >
                Diamonds
              </Button>
              <Button 
                variant={filter === "stone" ? "default" : "outline"}
                onClick={() => setFilter("stone")}
                className={filter === "stone" ? "bg-gold text-stone-dark" : "border-gold/20 text-luxury-light"}
                size="sm"
              >
                Stones
              </Button>
              <Button 
                variant={filter === "watch" ? "default" : "outline"}
                onClick={() => setFilter("watch")}
                className={filter === "watch" ? "bg-gold text-stone-dark" : "border-gold/20 text-luxury-light"}
                size="sm"
              >
                Watches
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Traders Listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTraders.map(trader => (
              <div key={trader.id} className="bg-stone border border-gold/10 rounded-lg overflow-hidden hover-scale">
                <div className="flex flex-col md:flex-row">
                  {/* Trader Image/Logo Placeholder */}
                  <div className="md:w-1/3 h-40 md:h-auto bg-stone-light/10 flex items-center justify-center">
                    <span className="font-playfair text-xl text-luxury opacity-50">
                      {trader.name}
                    </span>
                  </div>
                  
                  {/* Trader Info */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair font-semibold text-xl text-white">
                        {trader.name}
                      </h3>
                      {/* Rating */}
                      <div className="flex items-center">
                        <Star fill="#D4AF37" className="h-4 w-4 text-gold mr-1" />
                        <span className="text-gold font-medium">{trader.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gold text-sm mb-3">
                      {trader.specialty}
                    </p>
                    
                    <p className="text-luxury-light text-sm mb-4 line-clamp-2">
                      {trader.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start text-sm">
                        <MapPin className="h-4 w-4 text-luxury mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-luxury-light">{trader.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-luxury mr-2 flex-shrink-0" />
                        <span className="text-luxury-light">{trader.phone}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20"
                      onClick={() => navigate(`/traders/${trader.id}`)}
                    >
                      Visit Shop
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTraders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-luxury-light text-lg">No traders found matching your search criteria.</p>
              <Button 
                variant="link" 
                className="text-gold mt-2"
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-stone-dark border-t border-gold/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Ready to Showcase Your <span className="gold-gradient">Collections?</span>
          </h2>
          <p className="text-luxury-light max-w-2xl mx-auto mb-8">
            Join SoukSparkle's exclusive marketplace and connect with customers seeking premium gold, diamond, and stone products.
          </p>
          <Button 
            className="bg-gold hover:bg-gold-light text-stone-dark px-8 py-3"
            onClick={() => navigate("/apply-as-trader")}
          >
            Apply as a Trader
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Traders;
