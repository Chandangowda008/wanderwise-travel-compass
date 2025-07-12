
import { useState } from "react";
import { Search, Star, TrendingUp, MapPin, Sparkles, Globe, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface HeroSectionProps {
  onSearch: (city: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const popularCities = ["Paris", "Tokyo", "New York", "Barcelona", "Rome"];

  return (
    <section className="relative px-4 py-20 max-w-7xl mx-auto overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="text-center mb-16 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-6 border border-orange-200/50">
          <Sparkles className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-medium text-orange-700">AI-Powered Travel Discovery</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 mb-6 leading-tight">
          Discover
          <span className="text-gradient block">Authentic</span>
          <span className="text-gray-700">Experiences</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Skip the tourist traps and find hidden gems. WanderWise helps you discover 
          authentic dining experiences that locals actually love.
        </p>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative flex items-center bg-white rounded-2xl shadow-soft border-gradient overflow-hidden">
              <div className="flex items-center px-6 py-4">
                <Globe className="h-6 w-6 text-orange-500 mr-3" />
                <Input
                  type="text"
                  placeholder="Where are you traveling to?"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="border-0 text-lg bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
              </div>
              <Button 
                type="submit" 
                className="gradient-bg hover:opacity-90 transition-all duration-300 rounded-r-2xl px-8 py-4 text-white font-semibold shadow-soft-hover"
              >
                <Search className="h-5 w-5 mr-2" />
                Explore
              </Button>
            </div>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          <span className="text-sm text-muted-foreground mr-2 flex items-center">
            <Compass className="h-4 w-4 mr-1" />
            Popular:
          </span>
          {popularCities.map((city, index) => (
            <Button
              key={city}
              variant="outline"
              size="sm"
              onClick={() => onSearch(city)}
              className="rounded-full hover:bg-primary hover:text-white transition-all duration-300 border-orange-200 hover:border-orange-300 shadow-soft-hover animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {city}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up">
          <div className="bg-gradient-to-br from-red-100 to-red-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
            <TrendingUp className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="font-display font-semibold text-2xl mb-4 text-gray-900">Avoid Tourist Traps</h3>
          <p className="text-muted-foreground leading-relaxed">
            Identify overrated spots that might not live up to the hype with our smart analysis
          </p>
        </Card>

        <Card className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
            <Star className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="font-display font-semibold text-2xl mb-4 text-gray-900">Find Hidden Gems</h3>
          <p className="text-muted-foreground leading-relaxed">
            Discover authentic local favorites that are truly worth visiting and experiencing
          </p>
        </Card>

        <Card className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
            <MapPin className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="font-display font-semibold text-2xl mb-4 text-gray-900">Smart Analysis</h3>
          <p className="text-muted-foreground leading-relaxed">
            Our advanced algorithm combines ratings with review patterns for better insights
          </p>
        </Card>
      </div>
    </section>
  );
};
