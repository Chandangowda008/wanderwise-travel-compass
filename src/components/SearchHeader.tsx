
import { useState } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchHeaderProps {
  onSearch: (city: string) => void;
}

export const SearchHeader = ({ onSearch }: SearchHeaderProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <header className="glass-effect sticky top-0 z-50 px-4 py-4 shadow-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white rounded-xl p-2 shadow-soft">
              <MapPin className="h-8 w-8 text-gradient" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gradient">WanderWise</h1>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-muted-foreground">AI Travel Companion</span>
            </div>
          </div>
        </div>
        
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
      </div>
    </header>
  );
};
