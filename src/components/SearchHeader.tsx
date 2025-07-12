
import { useState } from "react";
import { Search, MapPin, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchHeaderProps {
  onSearch: (city: string) => void;
}

export const SearchHeader = ({ onSearch }: SearchHeaderProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setIsSheetOpen(false); // Close mobile menu after search
    }
  };

  const handleQuickSearch = (city: string) => {
    onSearch(city);
    setIsSheetOpen(false);
  };

  const popularCities = ["Paris", "Tokyo", "New York", "Barcelona", "Rome"];

  return (
    <header className="glass-effect sticky top-0 z-50 px-4 py-3 shadow-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white rounded-xl p-2 shadow-soft">
              <MapPin className="h-6 w-6 md:h-8 md:w-8 text-gradient" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-display font-bold text-gradient">WanderWise</h1>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-muted-foreground">AI Travel Companion</span>
            </div>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-display font-bold text-gradient">WanderWise</h1>
          </div>
        </div>
        
        {/* Desktop Search */}
        {!isMobile && (
          <form onSubmit={handleSubmit} className="flex items-center space-x-3 max-w-md w-full">
            <div className="relative flex-1 group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-xl border border-orange-200/50 overflow-hidden shadow-soft">
                <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Enter your destination city..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="gradient-bg hover:opacity-90 transition-all duration-300 shadow-soft-hover text-white font-medium"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-gradient">Search</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsSheetOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Search Form */}
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="relative group mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-20"></div>
                    <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-xl border border-orange-200/50 overflow-hidden shadow-soft">
                      <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Enter your destination city..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="pl-10 pr-4 py-3 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-base"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gradient-bg hover:opacity-90 transition-all duration-300 shadow-soft-hover text-white font-medium py-3"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>

                {/* Quick Search Options */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Destinations</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {popularCities.map((city) => (
                      <Button
                        key={city}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickSearch(city)}
                        className="justify-start text-sm py-2 px-3 rounded-lg border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                      >
                        {city}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <MapPin className="h-4 w-4 mr-3" />
                      My Trips
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <Sparkles className="h-4 w-4 mr-3" />
                      Saved Places
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};
