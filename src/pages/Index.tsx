
import { Layout } from "@/components/layout/Layout";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TraderShowcase } from "@/components/home/TraderShowcase";
import { Button } from "@/components/ui/button";
import { Search, Gem, ShieldCheck, Truck } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Search Section */}
      <section className="py-12 bg-stone">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-stone-dark/80 backdrop-blur-sm border border-gold/10 rounded-lg p-6 md:p-8 -mt-20 relative z-20 shadow-lg">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-center mb-6">
              Find Your Perfect <span className="gold-gradient">Treasure</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-light h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Search for gold, diamonds, stones..." 
                  className="w-full pl-10 pr-4 py-3 bg-stone border border-gold/20 rounded-md focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none text-foreground"
                />
              </div>
              <Button className="bg-gold hover:bg-gold-light text-stone-dark py-3 px-8">
                Search
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6">
              <Button variant="ghost" className="text-sm text-luxury-light hover:text-gold hover:bg-transparent">
                Gold Necklaces
              </Button>
              <Button variant="ghost" className="text-sm text-luxury-light hover:text-gold hover:bg-transparent">
                Diamond Rings
              </Button>
              <Button variant="ghost" className="text-sm text-luxury-light hover:text-gold hover:bg-transparent">
                Emerald Jewelry
              </Button>
              <Button variant="ghost" className="text-sm text-luxury-light hover:text-gold hover:bg-transparent">
                Ruby Sets
              </Button>
              <Button variant="ghost" className="text-sm text-luxury-light hover:text-gold hover:bg-transparent">
                Sapphires
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Feature Highlights */}
      <section className="py-16 bg-stone">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gold-gradient">SoukSparkle</span>
            </h2>
            <p className="text-luxury-light max-w-2xl mx-auto">
              Connect with Dubai's finest gold traders and jewelers in one premium marketplace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-stone-dark border border-gold/10 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3">Authentic Products</h3>
              <p className="text-luxury-light">
                Every item is certified and verified for authenticity by Dubai's trusted traders.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-stone-dark border border-gold/10 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3">Secure Transactions</h3>
              <p className="text-luxury-light">
                Shop with confidence with our secure payment systems and buyer protection policy.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-stone-dark border border-gold/10 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3">Global Shipping</h3>
              <p className="text-luxury-light">
                Fast and insured delivery to your doorstep, with real-time tracking available.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Traders Showcase */}
      <TraderShowcase />
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-stone-dark to-stone">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Join the Premier Gold & Diamond <span className="gold-gradient">Marketplace</span>
          </h2>
          <p className="text-luxury-light max-w-2xl mx-auto mb-8">
            Whether you're a trader looking to showcase your collections or a customer seeking the finest jewelry,
            SoukSparkle connects you to Dubai's legendary Gold Souk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gold hover:bg-gold-light text-stone-dark px-8 py-6 text-lg">
              Start Shopping
            </Button>
            <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 px-8 py-6 text-lg">
              Become a Trader
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
