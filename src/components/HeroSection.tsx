
import { useState } from "react";
import { Search, Star, TrendingUp, MapPin, Sparkles, Globe, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  onSearch: (city: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const isMobile = useIsMobile();

  const popularCities = ["Paris", "Tokyo", "New York", "Barcelona", "Rome"];

  return (
    <section className="relative px-4 py-12 md:py-20 max-w-7xl mx-auto overflow-hidden">
      {/* Background decorative elements - reduced on mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-2xl md:blur-3xl floating-animation"></div>
        <div className="absolute top-40 right-20 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6 border border-orange-200/50">
          <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-orange-600" />
          <span className="text-xs md:text-sm font-medium text-orange-700">AI-Powered Travel Discovery</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
          Discover
          <span className="text-gradient block">Authentic</span>
          <span className="text-gray-700">Experiences</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl md:max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
          Skip the tourist traps and find hidden gems. WanderWise helps you discover 
          authentic dining experiences that locals actually love.
        </p>

        {/* Unified Search Call-to-Action */}
        <div className="max-w-2xl md:max-w-3xl mx-auto mb-10 md:mb-12 px-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl md:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative flex flex-col md:flex-row items-center bg-white rounded-xl md:rounded-2xl shadow-soft border-gradient overflow-hidden">
              <div className="flex items-center w-full px-4 md:px-6 py-3 md:py-4">
                <Globe className="h-5 w-5 md:h-6 md:w-6 text-orange-500 mr-2 md:mr-3" />
                <div className="flex-1 text-left">
                  <p className="text-sm md:text-base text-muted-foreground">
                    {isMobile ? "Tap the menu to search destinations" : "Use the search bar above to find your next adventure"}
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => {
                  if (isMobile) {
                    // On mobile, we could trigger the menu to open
                    // For now, just show a message
                    console.log("Mobile search - use menu");
                  } else {
                    // On desktop, focus the search input
                    const searchInput = document.querySelector('input[placeholder*="destination"]') as HTMLInputElement;
                    if (searchInput) {
                      searchInput.focus();
                    }
                  }
                }}
                className="gradient-bg hover:opacity-90 transition-all duration-300 text-white font-semibold px-6 md:px-8 py-3 md:py-4 w-full md:w-auto rounded-t-none md:rounded-t-2xl md:rounded-l-none md:rounded-r-2xl shadow-soft-hover group"
              >
                <Search className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Start Exploring
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 md:mb-20 px-4">
          <span className="text-xs md:text-sm text-muted-foreground mr-2 flex items-center">
            <Compass className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            Popular:
          </span>
          {popularCities.map((city, index) => (
            <Button
              key={city}
              variant="outline"
              size="sm"
              onClick={() => onSearch(city)}
              className="rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-orange-200 hover:border-orange-300 shadow-soft-hover animate-scale-in text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {city}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
        <Card className="glass-card p-6 md:p-8 text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up">
          <div className="bg-gradient-to-br from-red-100 to-red-200 w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
            <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-red-600" />
          </div>
          <h3 className="font-display font-semibold text-lg md:text-2xl mb-3 md:mb-4 text-gray-900">Avoid Tourist Traps</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Identify overrated spots that might not live up to the hype with our smart analysis
          </p>
        </Card>

        <Card className="glass-card p-6 md:p-8 text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
            <Star className="h-8 w-8 md:h-10 md:w-10 text-green-600" />
          </div>
          <h3 className="font-display font-semibold text-lg md:text-2xl mb-3 md:mb-4 text-gray-900">Find Hidden Gems</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Discover authentic local favorites that are truly worth visiting and experiencing
          </p>
        </Card>

        <Card className="glass-card p-6 md:p-8 text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
            <MapPin className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
          </div>
          <h3 className="font-display font-semibold text-lg md:text-2xl mb-3 md:mb-4 text-gray-900">Smart Analysis</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Our advanced algorithm combines ratings with review patterns for better insights
          </p>
        </Card>
      </div>
    </section>
  );
};
