
import { useState, useEffect } from "react";
import { Sparkles, MapPin, Clock, Star, Heart, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TravelRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'restaurant' | 'attraction' | 'activity' | 'shopping' | 'nightlife';
  rating: number;
  estimatedTime: string;
  estimatedCost: number;
  distance: string;
  aiReason: string;
  tags: string[];
  imageUrl?: string;
}

interface AITravelRecommendationsProps {
  userProfile?: {
    interests: string[];
    budget: 'low' | 'medium' | 'high';
    travelStyle: 'adventure' | 'cultural' | 'relaxed' | 'luxury';
  };
  currentLocation?: string;
}

export const AITravelRecommendations = ({ 
  userProfile = {
    interests: ['culture', 'food', 'history'],
    budget: 'medium',
    travelStyle: 'cultural'
  },
  currentLocation = "Paris, France"
}: AITravelRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<TravelRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulate AI recommendation generation
    const mockRecommendations: TravelRecommendation[] = [
      {
        id: "1",
        title: "Musée d'Orsay",
        description: "World-renowned impressionist art collection in a beautiful former railway station",
        category: "attraction",
        rating: 4.8,
        estimatedTime: "2-3 hours",
        estimatedCost: 16,
        distance: "1.2 km",
        aiReason: "Perfect match for your cultural interests and love of art history",
        tags: ["Art", "History", "Architecture", "Indoor"]
      },
      {
        id: "2",
        title: "Le Comptoir du Relais",
        description: "Authentic Parisian bistro serving traditional French cuisine",
        category: "restaurant",
        rating: 4.6,
        estimatedTime: "1-2 hours",
        estimatedCost: 45,
        distance: "800m",
        aiReason: "Highly rated local cuisine matching your food interests and budget",
        tags: ["French Cuisine", "Local Favorite", "Bistro"]
      },
      {
        id: "3",
        title: "Seine River Walk",
        description: "Peaceful stroll along the historic Seine with stunning city views",
        category: "activity",
        rating: 4.9,
        estimatedTime: "1-4 hours",
        estimatedCost: 0,
        distance: "200m",
        aiReason: "Free cultural activity perfect for your relaxed travel style",
        tags: ["Free", "Walking", "Scenic", "Photography"]
      },
      {
        id: "4",
        title: "Marché des Enfants Rouges",
        description: "Paris's oldest covered market with diverse food vendors",
        category: "shopping",
        rating: 4.4,
        estimatedTime: "1-2 hours",
        estimatedCost: 25,
        distance: "1.5 km",
        aiReason: "Combines your love of food and culture with local shopping experience",
        tags: ["Local Market", "Food", "Cultural", "Shopping"]
      }
    ];

    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1200);
  }, [userProfile, currentLocation]);

  const getCategoryIcon = (category: TravelRecommendation['category']) => {
    switch (category) {
      case 'restaurant':
        return '🍽️';
      case 'attraction':
        return '🏛️';
      case 'activity':
        return '🎯';
      case 'shopping':
        return '🛍️';
      case 'nightlife':
        return '🌙';
      default:
        return '📍';
    }
  };

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold">AI is generating personalized recommendations...</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">AI-Powered Recommendations</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Based on your {userProfile.travelStyle} travel style, {userProfile.budget} budget, and interests in {userProfile.interests.join(', ')}
        </p>
      </Card>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCategoryIcon(rec.category)}</span>
                <div>
                  <h4 className="font-semibold text-lg">{rec.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{rec.rating}</span>
                    <span>•</span>
                    <MapPin className="h-4 w-4" />
                    <span>{rec.distance}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleLike(rec.id)}
                className={likedItems.has(rec.id) ? "text-red-500" : "text-gray-400"}
              >
                <Heart className={`h-4 w-4 ${likedItems.has(rec.id) ? "fill-current" : ""}`} />
              </Button>
            </div>

            <p className="text-muted-foreground mb-3">{rec.description}</p>

            <div className="flex items-center space-x-4 text-sm mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{rec.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">€{rec.estimatedCost}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {rec.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
              <div className="flex items-start space-x-2">
                <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                <p className="text-sm text-blue-700">
                  <strong>AI Insight:</strong> {rec.aiReason}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
