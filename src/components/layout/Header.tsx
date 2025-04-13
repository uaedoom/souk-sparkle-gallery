
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, ShoppingCartIcon, HeartIcon, UserIcon, MenuIcon, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="bg-stone-dark/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gold/20 w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-playfair text-2xl font-bold gold-gradient">SoukSparkle</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover-gold font-medium">Home</Link>
          <Link to="/gold" className="text-foreground hover-gold font-medium">Gold</Link>
          <Link to="/diamonds" className="text-foreground hover-gold font-medium">Diamonds</Link>
          <Link to="/stones" className="text-foreground hover-gold font-medium">Stones</Link>
          <Link to="/traders" className="text-foreground hover-gold font-medium">Traders</Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-gold/10">
            <SearchIcon className="h-5 w-5 text-foreground" />
          </Button>
          
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="hover:bg-gold/10">
                <HeartIcon className="h-5 w-5 text-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gold/10">
                <ShoppingCartIcon className="h-5 w-5 text-foreground" />
              </Button>
              <Button 
                variant="ghost" 
                className="hover:bg-gold/10 flex items-center gap-2" 
                onClick={() => signOut()}
              >
                <LogOut className="h-5 w-5 text-foreground" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-gold hover:bg-gold-light text-stone-dark ml-4">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <MenuIcon className="h-6 w-6 text-foreground" />
          )}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-stone-dark border-b border-gold/20 py-4 md:hidden animate-fade-in">
            <nav className="flex flex-col space-y-4 px-4">
              <Link to="/" className="text-foreground hover-gold py-2">Home</Link>
              <Link to="/gold" className="text-foreground hover-gold py-2">Gold</Link>
              <Link to="/diamonds" className="text-foreground hover-gold py-2">Diamonds</Link>
              <Link to="/stones" className="text-foreground hover-gold py-2">Stones</Link>
              <Link to="/traders" className="text-foreground hover-gold py-2">Traders</Link>
              <div className="flex items-center space-x-4 py-2">
                <Button variant="ghost" size="icon" className="hover:bg-gold/10">
                  <SearchIcon className="h-5 w-5 text-foreground" />
                </Button>
                {user && (
                  <>
                    <Button variant="ghost" size="icon" className="hover:bg-gold/10">
                      <HeartIcon className="h-5 w-5 text-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-gold/10">
                      <ShoppingCartIcon className="h-5 w-5 text-foreground" />
                    </Button>
                  </>
                )}
              </div>
              
              {user ? (
                <Button 
                  variant="outline" 
                  className="border-gold/20 text-gold hover:bg-gold/10 w-full"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              ) : (
                <Link to="/auth" className="w-full">
                  <Button className="bg-gold hover:bg-gold-light text-stone-dark w-full">
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
