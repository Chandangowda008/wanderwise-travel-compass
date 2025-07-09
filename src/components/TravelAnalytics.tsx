
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, MapPin, Clock, Footprints, Camera, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TravelStats {
  totalTrips: number;
  countriesVisited: number;
  totalDistance: number;
  totalDays: number;
  favoriteDestination: string;
  averageRating: number;
}

interface MonthlySpending {
  month: string;
  amount: number;
}

interface CategorySpending {
  name: string;
  value: number;
  color: string;
}

interface PopularDestination {
  city: string;
  country: string;
  visits: number;
  lastVisit: string;
  rating: number;
}

export const TravelAnalytics = () => {
  const [stats, setStats] = useState<TravelStats>({
    totalTrips: 12,
    countriesVisited: 8,
    totalDistance: 25430,
    totalDays: 89,
    favoriteDestination: "Paris, France",
    averageRating: 4.7
  });

  const [monthlyData, setMonthlyData] = useState<MonthlySpending[]>([
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 800 },
    { month: 'Mar', amount: 2100 },
    { month: 'Apr', amount: 1500 },
    { month: 'May', amount: 2800 },
    { month: 'Jun', amount: 1900 },
  ]);

  const [categoryData, setCategoryData] = useState<CategorySpending[]>([
    { name: 'Accommodation', value: 35, color: '#8884d8' },
    { name: 'Food & Dining', value: 25, color: '#82ca9d' },
    { name: 'Transportation', value: 20, color: '#ffc658' },
    { name: 'Activities', value: 15, color: '#ff7c7c' },
    { name: 'Shopping', value: 5, color: '#8dd1e1' },
  ]);

  const [popularDestinations, setPopularDestinations] = useState<PopularDestination[]>([
    { city: 'Paris', country: 'France', visits: 3, lastVisit: '2024-01-15', rating: 4.8 },
    { city: 'Barcelona', country: 'Spain', visits: 2, lastVisit: '2023-11-20', rating: 4.6 },
    { city: 'Amsterdam', country: 'Netherlands', visits: 2, lastVisit: '2023-09-10', rating: 4.5 },
    { city: 'Rome', country: 'Italy', visits: 1, lastVisit: '2023-07-05', rating: 4.9 },
  ]);

  const formatCurrency = (value: number) => `€${value.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Travel Analytics</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalTrips}</p>
            <p className="text-sm text-muted-foreground">Total Trips</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-xl">🌍</span>
            </div>
            <p className="text-2xl font-bold">{stats.countriesVisited}</p>
            <p className="text-sm text-muted-foreground">Countries</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Footprints className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalDistance.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">KM Traveled</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalDays}</p>
            <p className="text-sm text-muted-foreground">Travel Days</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold">{stats.averageRating}</p>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Camera className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold">347</p>
            <p className="text-sm text-muted-foreground">Photos</p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="spending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="spending">Spending Trends</TabsTrigger>
          <TabsTrigger value="destinations">Top Destinations</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Monthly Spending</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), 'Amount']} />
                  <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Spending by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="destinations" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Most Visited Destinations</h3>
            <div className="space-y-4">
              {popularDestinations.map((dest, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                    <div>
                      <h4 className="font-semibold">{dest.city}, {dest.country}</h4>
                      <p className="text-sm text-muted-foreground">
                        Last visit: {new Date(dest.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{dest.visits} visits</Badge>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{dest.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Travel Patterns</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="font-medium text-blue-800">Peak Travel Season</p>
                  <p className="text-sm text-blue-600">You travel most frequently in Spring and Summer months</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <p className="font-medium text-green-800">Budget Efficiency</p>
                  <p className="text-sm text-green-600">You're 15% under budget on average - great planning!</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <p className="font-medium text-purple-800">Destination Preference</p>
                  <p className="text-sm text-purple-600">You prefer European cities with rich cultural heritage</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="font-medium text-yellow-800">New Destination</p>
                  <p className="text-sm text-yellow-600">Based on your preferences, consider visiting Prague or Vienna</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <p className="font-medium text-orange-800">Best Time to Book</p>
                  <p className="text-sm text-orange-600">Book flights 6-8 weeks in advance for optimal pricing</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                  <p className="font-medium text-indigo-800">Activity Suggestion</p>
                  <p className="text-sm text-indigo-600">Try food tours - they align with your cultural interests</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
