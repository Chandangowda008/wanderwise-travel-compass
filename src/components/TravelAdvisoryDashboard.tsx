
import { useState, useEffect } from "react";
import { AlertTriangle, Shield, Info, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TravelAdvisory {
  id: string;
  country: string;
  city?: string;
  level: 'low' | 'moderate' | 'high' | 'critical';
  category: 'safety' | 'health' | 'weather' | 'political' | 'transport';
  title: string;
  description: string;
  lastUpdated: string;
  source: string;
  recommendations: string[];
}

interface TravelAdvisoryDashboardProps {
  destination?: string;
}

export const TravelAdvisoryDashboard = ({ destination = "Paris" }: TravelAdvisoryDashboardProps) => {
  const [advisories, setAdvisories] = useState<TravelAdvisory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for travel advisories
    const mockAdvisories: TravelAdvisory[] = [
      {
        id: "1",
        country: "France",
        city: "Paris",
        level: "low",
        category: "safety",
        title: "General Safety Information",
        description: "Paris maintains good overall security with regular police patrols in tourist areas.",
        lastUpdated: "2024-01-15",
        source: "US State Department",
        recommendations: [
          "Stay aware of your surroundings",
          "Keep valuables secure",
          "Use official transportation"
        ]
      },
      {
        id: "2",
        country: "France",
        city: "Paris",
        level: "moderate",
        category: "transport",
        title: "Metro Strike Ongoing",
        description: "Intermittent metro strikes may affect public transportation schedules.",
        lastUpdated: "2024-01-14",
        source: "RATP Transport Authority",
        recommendations: [
          "Check metro schedules before traveling",
          "Consider alternative transport options",
          "Allow extra travel time"
        ]
      },
      {
        id: "3",
        country: "France",
        level: "low",
        category: "health",
        title: "No Health Alerts",
        description: "No significant health advisories are currently in effect for France.",
        lastUpdated: "2024-01-10",
        source: "WHO",
        recommendations: [
          "Maintain standard health precautions",
          "Ensure travel insurance is valid"
        ]
      },
      {
        id: "4",
        country: "France",
        city: "Paris",
        level: "moderate",
        category: "weather",
        title: "Winter Weather Advisory",
        description: "Cold temperatures and occasional snow expected. Ice conditions possible on walkways.",
        lastUpdated: "2024-01-16",
        source: "Météo-France",
        recommendations: [
          "Dress warmly and in layers",
          "Wear appropriate footwear",
          "Be cautious of icy conditions"
        ]
      }
    ];

    setTimeout(() => {
      setAdvisories(mockAdvisories);
      setLoading(false);
    }, 1000);
  }, [destination]);

  const getLevelIcon = (level: TravelAdvisory['level']) => {
    switch (level) {
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'moderate':
        return <Info className="h-4 w-4 text-yellow-500" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: TravelAdvisory['level']) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: TravelAdvisory['category']) => {
    switch (category) {
      case 'safety':
        return <Shield className="h-4 w-4" />;
      case 'health':
        return <CheckCircle className="h-4 w-4" />;
      case 'weather':
        return <Info className="h-4 w-4" />;
      case 'political':
        return <AlertTriangle className="h-4 w-4" />;
      case 'transport':
        return <Clock className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const filterByCategory = (category: string) => {
    if (category === 'all') return advisories;
    return advisories.filter(advisory => advisory.category === category);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading travel advisories for {destination}...</p>
        </div>
      </Card>
    );
  }

  const overallRisk = Math.max(...advisories.map(a => 
    a.level === 'low' ? 1 : a.level === 'moderate' ? 2 : a.level === 'high' ? 3 : 4
  ));
  const overallLevel = overallRisk === 1 ? 'low' : overallRisk === 2 ? 'moderate' : overallRisk === 3 ? 'high' : 'critical';

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold">Travel Advisory Dashboard</h2>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current destination</p>
            <p className="font-semibold">{destination}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            {getLevelIcon(overallLevel)}
            <div>
              <p className="font-medium">Overall Risk Level</p>
              <Badge className={`${getLevelColor(overallLevel)} capitalize`}>
                {overallLevel}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Info className="h-4 w-4 text-blue-500" />
            <div>
              <p className="font-medium">Active Advisories</p>
              <p className="text-sm text-muted-foreground">{advisories.length} advisories</p>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="political">Political</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <AdvisoryList advisories={advisories} />
        </TabsContent>
        <TabsContent value="safety" className="space-y-4">
          <AdvisoryList advisories={filterByCategory('safety')} />
        </TabsContent>
        <TabsContent value="health" className="space-y-4">
          <AdvisoryList advisories={filterByCategory('health')} />
        </TabsContent>
        <TabsContent value="weather" className="space-y-4">
          <AdvisoryList advisories={filterByCategory('weather')} />
        </TabsContent>
        <TabsContent value="transport" className="space-y-4">
          <AdvisoryList advisories={filterByCategory('transport')} />
        </TabsContent>
        <TabsContent value="political" className="space-y-4">
          <AdvisoryList advisories={filterByCategory('political')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface AdvisoryListProps {
  advisories: TravelAdvisory[];
}

const AdvisoryList = ({ advisories }: AdvisoryListProps) => {
  const getLevelIcon = (level: TravelAdvisory['level']) => {
    switch (level) {
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'moderate':
        return <Info className="h-4 w-4 text-yellow-500" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: TravelAdvisory['level']) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (advisories.length === 0) {
    return (
      <Card className="p-6 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-semibold mb-2">No Advisories</h3>
        <p className="text-muted-foreground">No travel advisories in this category.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {advisories.map((advisory) => (
        <Card key={advisory.id} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getLevelIcon(advisory.level)}
              <div>
                <h3 className="font-semibold">{advisory.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {advisory.city ? `${advisory.city}, ${advisory.country}` : advisory.country}
                </p>
              </div>
            </div>
            <Badge className={`${getLevelColor(advisory.level)} capitalize`}>
              {advisory.level}
            </Badge>
          </div>

          <p className="text-muted-foreground mb-4">{advisory.description}</p>

          {advisory.recommendations.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {advisory.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Source: {advisory.source}</span>
            <span>Updated: {new Date(advisory.lastUpdated).toLocaleDateString()}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
