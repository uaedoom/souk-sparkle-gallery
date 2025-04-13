
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart, Star, ChevronRight, Info, Shield, Certificate } from "lucide-react";

// Sample product data - in a real app, this would come from an API
const productData = {
  id: 1,
  name: "18K Gold Arabic Bracelet",
  category: "Gold",
  price: "$2,450",
  description: "Exquisite 18K gold bracelet with traditional Arabic design, featuring intricate patterns and superior craftsmanship. Each piece is handcrafted by skilled artisans to ensure the highest quality and attention to detail.",
  specifications: [
    { label: "Metal", value: "18K Gold" },
    { label: "Weight", value: "25.4 grams" },
    { label: "Dimensions", value: "7.5 inches (length)" },
    { label: "Finish", value: "Polished" },
    { label: "Closure", value: "Box clasp with safety" }
  ],
  images: ["/images/product-1.jpg", "/images/product-1-alt.jpg", "/images/product-1-alt2.jpg"],
  trader: {
    id: 1,
    name: "Al Romaizan Jewellery",
    rating: 4.9,
    reviews: 324
  }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState(0);
  
  // In a real implementation, you would fetch the product data based on the ID
  
  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-luxury mb-8">
            <a href="/" className="hover-gold">Home</a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <a href="/gold" className="hover-gold">{productData.category}</a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-luxury-light">{productData.name}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="aspect-square bg-stone-light/10 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {/* Placeholder - would be an actual image in production */}
                <div className="w-full h-full flex items-center justify-center bg-gold/10">
                  <span className="font-playfair text-2xl text-gold/60">
                    {productData.name}
                  </span>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((index) => (
                  <button 
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      mainImage === index ? 'border-gold' : 'border-transparent hover:border-gold/50'
                    }`}
                    onClick={() => setMainImage(index)}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gold/10">
                      <span className="font-playfair text-sm text-gold/60">
                        View {index + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
                {productData.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star fill="#D4AF37" className="h-4 w-4 text-gold" />
                  <Star fill="#D4AF37" className="h-4 w-4 text-gold" />
                  <Star fill="#D4AF37" className="h-4 w-4 text-gold" />
                  <Star fill="#D4AF37" className="h-4 w-4 text-gold" />
                  <Star fill="#D4AF37" className="h-4 w-4 text-gold" />
                </div>
                <span className="text-luxury-light text-sm ml-2">
                  (42 reviews)
                </span>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="text-sm text-luxury-light">By</span>
                <a href={`/traders/${productData.trader.id}`} className="text-gold hover:underline ml-1">
                  {productData.trader.name}
                </a>
              </div>
              
              <div className="mb-8">
                <span className="text-3xl font-bold text-gold">{productData.price}</span>
              </div>
              
              <p className="text-luxury-light mb-8">
                {productData.description}
              </p>
              
              <div className="space-y-4 mb-8">
                <h3 className="font-playfair font-semibold text-lg">Specifications</h3>
                <div className="grid grid-cols-2 gap-y-2 border-t border-gold/10 pt-4">
                  {productData.specifications.map((spec, index) => (
                    <div key={index} className={index % 2 === 0 ? "pr-4" : "pl-4"}>
                      <span className="text-luxury text-sm">{spec.label}:</span>
                      <span className="text-luxury-light text-sm ml-2">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Button className="bg-gold hover:bg-gold-light text-stone-dark flex-1 h-12">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/10 h-12">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="ghost" className="text-luxury hover:text-gold hover:bg-transparent h-12">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
              
              {/* Product Features */}
              <div className="space-y-4 border-t border-gold/10 pt-6">
                <div className="flex items-start">
                  <div className="bg-gold/10 p-2 rounded-full mr-4">
                    <Certificate className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium">Authenticity Certificate</h4>
                    <p className="text-luxury-light text-sm">
                      Includes certificate of authenticity and quality.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gold/10 p-2 rounded-full mr-4">
                    <Shield className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium">Secure Shipping</h4>
                    <p className="text-luxury-light text-sm">
                      Fully insured global shipping with tracking.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gold/10 p-2 rounded-full mr-4">
                    <Info className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium">Quality Assurance</h4>
                    <p className="text-luxury-light text-sm">
                      Each piece is inspected by gold and jewelry experts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
