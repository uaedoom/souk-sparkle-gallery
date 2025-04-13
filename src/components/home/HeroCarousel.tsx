
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample data for hero carousel
const heroSlides = [
  {
    id: 1,
    image: '/images/hero-1.jpg', // We'll use placeholder images for now
    title: 'Exquisite Gold Collections',
    subtitle: 'Timeless elegance from Dubai Gold Souk',
    cta: 'Explore Gold',
    ctaLink: '/gold'
  },
  {
    id: 2,
    image: '/images/hero-2.jpg',
    title: 'Premium Diamond Jewelry',
    subtitle: 'Discover brilliance that lasts forever',
    cta: 'View Diamonds',
    ctaLink: '/diamonds'
  },
  {
    id: 3,
    image: '/images/hero-3.jpg',
    title: 'Rare Precious Stones',
    subtitle: 'Unique gems sourced from around the world',
    cta: 'See Collection',
    ctaLink: '/stones'
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Use placeholder solid color backgrounds until images are available
  const placeholderBackgrounds = [
    'bg-gradient-to-r from-stone-dark to-stone',
    'bg-gradient-to-r from-stone to-stone-light',
    'bg-gradient-to-r from-stone-light to-stone',
  ];
  
  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } ${placeholderBackgrounds[index]}`}
        >
          {/* We'll use a background gradient for now instead of images */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
                {slide.subtitle}
              </p>
              <Button 
                className="bg-gold hover:bg-gold-light text-stone-dark px-8 py-6 text-lg opacity-0 animate-fade-in" 
                style={{ animationDelay: '900ms' }}
              >
                {slide.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full w-12 h-12"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full w-12 h-12"
        onClick={goToNextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-gold w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
