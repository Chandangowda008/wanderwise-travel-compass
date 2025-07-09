
import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
  alerts?: WeatherAlert[];
}

interface WeatherAlert {
  id: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  title: string;
  description: string;
  validUntil: string;
}

interface WeatherWidgetProps {
  location?: { lat: number; lng: number };
  locationName?: string;
}

export const WeatherWidget = ({ location, locationName = "Current Location" }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate weather API call
    const mockWeatherData: WeatherData = {
      location: locationName,
      temperature: 18,
      description: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      icon: "partly-cloudy",
      alerts: [
        {
          id: "1",
          severity: "moderate",
          title: "Rain Expected",
          description: "Light rain expected this afternoon. Consider carrying an umbrella.",
          validUntil: "2024-01-16T18:00:00Z"
        }
      ]
    };

    setTimeout(() => {
      setWeather(mockWeatherData);
      setLoading(false);
    }, 1000);
  }, [location, locationName]);

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'snowy':
        return <CloudSnow className="h-8 w-8 text-blue-200" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };

  const getAlertColor = (severity: WeatherAlert['severity']) => {
    switch (severity) {
      case 'low':
        return 'border-l-green-500 bg-green-50';
      case 'moderate':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'severe':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{weather.location}</h3>
            <p className="text-muted-foreground">{weather.description}</p>
          </div>
          <div className="text-right">
            {getWeatherIcon(weather.icon)}
            <p className="text-2xl font-bold">{weather.temperature}°C</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <span>{weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-gray-500" />
            <span>{weather.visibility} km</span>
          </div>
        </div>

        {weather.alerts && weather.alerts.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Weather Alerts</h4>
            {weather.alerts.map((alert) => (
              <div key={alert.id} className={`border-l-4 p-3 rounded ${getAlertColor(alert.severity)}`}>
                <p className="font-medium text-sm">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
