
import { useState } from "react";
import { SearchHeader } from "@/components/SearchHeader";
import { HeroSection } from "@/components/HeroSection";
import { RecommendationResults } from "@/components/RecommendationResults";
import { FeatureHighlights } from "@/components/FeatureHighlights";

const Index = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSearch = (city: string) => {
    console.log("Searching for city:", city);
    setSearchCity(city);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <SearchHeader onSearch={handleSearch} />
      
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
