
import { useState } from "react";
import { Search, Star, TrendingUp, MapPin } from "lucide-react";
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
    <section className="px-4 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-6">
          Discover
          <span className="text-primary block">Authentic</span>
          Experiences
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Skip the tourist traps and find hidden gems. WanderWise helps you discover 
          authentic dining experiences that locals actually love.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Where are you traveling to?"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-14 pr-32 py-6 text-lg bg-white shadow-lg border-0 rounded-2xl"
            />
            <Button 
              type="submit" 
              className="absolute right-2 top-2 gradient-bg hover:opacity-90 transition-opacity rounded-xl px-8 py-4"
            >
              Explore
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <span className="text-sm text-muted-foreground mr-2">Popular:</span>
          {popularCities.map((city) => (
            <Button
              key={city}
              variant="outline"
              size="sm"
              onClick={() => onSearch(city)}
              className="rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              {city}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="font-display font-semibold text-xl mb-2">Avoid Tourist Traps</h3>
          <p className="text-muted-foreground">
            Identify overrated spots that might not live up to the hype
          </p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-display font-semibold text-xl mb-2">Find Hidden Gems</h3>
          <p className="text-muted-foreground">
            Discover authentic local favorites that are truly worth visiting
          </p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-display font-semibold text-xl mb-2">Smart Analysis</h3>
          <p className="text-muted-foreground">
            Our algorithm combines ratings with review patterns for better insights
          </p>
        </Card>
      </div>
    </section>
  );
};
