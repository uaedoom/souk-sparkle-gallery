
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-stone-dark border-t border-gold/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-playfair text-2xl font-bold gold-gradient">SoukSparkle</span>
            </Link>
            <p className="text-luxury-light text-sm mt-2 max-w-xs">
              The premier marketplace for gold, diamonds, and precious stones in Dubai Gold Souk.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-luxury hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-luxury hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-luxury hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-medium text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gold" className="text-luxury-light hover-gold text-sm">Gold Collections</Link>
              </li>
              <li>
                <Link to="/diamonds" className="text-luxury-light hover-gold text-sm">Diamond Jewelry</Link>
              </li>
              <li>
                <Link to="/stones" className="text-luxury-light hover-gold text-sm">Precious Stones</Link>
              </li>
              <li>
                <Link to="/traders" className="text-luxury-light hover-gold text-sm">Traders Directory</Link>
              </li>
              <li>
                <Link to="/about" className="text-luxury-light hover-gold text-sm">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-medium text-gold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-luxury-light text-sm">Dubai Gold Souk, Al Ras, Deira, Dubai, UAE</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <span className="text-luxury-light text-sm">+971 4 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <span className="text-luxury-light text-sm">info@souksparkle.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-medium text-gold">Subscribe</h3>
            <p className="text-luxury-light text-sm">Stay updated on new arrivals and exclusive offers.</p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-stone border-gold/20 focus:border-gold text-sm"
              />
              <Button className="bg-gold hover:bg-gold-light text-stone-dark text-sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 mt-12 pt-6 text-center">
          <p className="text-luxury text-xs">
            © {new Date().getFullYear()} SoukSparkle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
