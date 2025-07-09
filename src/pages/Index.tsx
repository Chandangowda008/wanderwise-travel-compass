
import { useState } from "react";
import { SearchHeader } from "@/components/SearchHeader";
import { HeroSection } from "@/components/HeroSection";
import { RecommendationResults } from "@/components/RecommendationResults";
import { FeatureHighlights } from "@/components/FeatureHighlights";
import { NavigationDashboard } from "@/components/NavigationDashboard";
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";

const Index = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <SearchHeader onSearch={handleSearch} />
      
      {/* Navigation Hub Button */}
      <div className="fixed top-20 right-4 z-40">
        <Button
          onClick={handleNavigationToggle}
          className="gradient-bg shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <Navigation className="h-5 w-5 mr-2" />
          Navigation Hub
        </Button>
      </div>
      
      {!showResults ? (
        <>
          <HeroSection onSearch={handleSearch} />
          <FeatureHighlights />
        </>
      ) : (
        <RecommendationResults city={searchCity} onNewSearch={() => setShowResults(false)} />
      )}
    </div>
  );
};

export default Index;
