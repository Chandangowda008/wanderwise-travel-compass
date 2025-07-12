
import { useState } from "react";
import { SearchHeader } from "@/components/SearchHeader";
import { HeroSection } from "@/components/HeroSection";
import { RecommendationResults } from "@/components/RecommendationResults";
import { FeatureHighlights } from "@/components/FeatureHighlights";
import { NavigationDashboard } from "@/components/NavigationDashboard";
import { Button } from "@/components/ui/button";
import { Navigation, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const handleSearch = (city: string) => {
    console.log("Searching for city:", city);
    setSearchCity(city);
    setShowResults(true);
    setShowNavigation(false);
  };

  const handleNavigationToggle = () => {
    setShowNavigation(!showNavigation);
    setShowResults(false);
  };

  if (showNavigation) {
    return <NavigationDashboard />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 -z-10"></div>
      
      {/* Floating background elements - reduced on mobile */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-2xl md:blur-3xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <SearchHeader onSearch={handleSearch} />
      
      {/* Enhanced Navigation Hub Button - mobile optimized */}
      <div className={`fixed z-40 ${isMobile ? 'bottom-6 right-4' : 'top-24 right-6'}`}>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl md:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <Button
            onClick={handleNavigationToggle}
            className="relative gradient-bg shadow-soft-hover hover:scale-105 transition-all duration-300 text-white font-semibold px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl"
            size={isMobile ? "default" : "lg"}
          >
            <div className="flex items-center gap-1.5 md:gap-2">
              <Navigation className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">{isMobile ? 'Nav' : 'Navigation Hub'}</span>
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </Button>
        </div>
      </div>
      
      {!showResults ? (
        <div className="animate-fade-in-up">
          <HeroSection onSearch={handleSearch} />
          <FeatureHighlights />
        </div>
      ) : (
        <div className="animate-scale-in">
          <RecommendationResults city={searchCity} onNewSearch={() => setShowResults(false)} />
        </div>
      )}
    </div>
  );
};

export default Index;
