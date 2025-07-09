
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Plus, Calendar, Users, DollarSign, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AgencyDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "Romantic Paris Getaway",
      destination: "Paris, France",
      duration: "5 days",
      price: "$1,299",
      bookings: 12
    },
    {
      id: 2,
      title: "Tokyo Food & Culture Tour",
      destination: "Tokyo, Japan",
      duration: "7 days",
      price: "$1,899",
      bookings: 8
    }
  ]);

  const [newTrip, setNewTrip] = useState({
    title: "",
    destination: "",
    duration: "",
    price: "",
    description: ""
  });

  const handleLogout = () => {
    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    const trip = {
      id: trips.length + 1,
      title: newTrip.title,
      destination: newTrip.destination,
      duration: newTrip.duration,
      price: newTrip.price,
      bookings: 0
    };
    
    setTrips([...trips, trip]);
    setNewTrip({ title: "", destination: "", duration: "", price: "", description: "" });
    
    toast({
      title: "Trip Created",
      description: "Your new trip has been added successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">WanderWise Agency</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Agency Dashboard</h2>
          <p className="text-gray-600">Manage your travel experiences and bookings</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="create">Create Trip</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{trips.length}</div>
                  <p className="text-xs text-muted-foreground">Active experiences</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {trips.reduce((sum, trip) => sum + trip.bookings, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,580</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{trip.title}</CardTitle>
                    <CardDescription>{trip.destination}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Duration:</span>
                        <span className="text-sm font-medium">{trip.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="text-sm font-medium">{trip.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bookings:</span>
                        <span className="text-sm font-medium">{trip.bookings}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Edit Trip
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Trip
                </CardTitle>
                <CardDescription>
                  Add a new travel experience for your customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateTrip} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trip-title">Trip Title</Label>
                    <Input
                      id="trip-title"
                      placeholder="e.g., Romantic Paris Getaway"
                      value={newTrip.title}
                      onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trip-destination">Destination</Label>
                    <Input
                      id="trip-destination"
                      placeholder="e.g., Paris, France"
                      value={newTrip.destination}
                      onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trip-duration">Duration</Label>
                      <Input
                        id="trip-duration"
                        placeholder="e.g., 5 days"
                        value={newTrip.duration}
                        onChange={(e) => setNewTrip({ ...newTrip, duration: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="trip-price">Price</Label>
                      <Input
                        id="trip-price"
                        placeholder="e.g., $1,299"
                        value={newTrip.price}
                        onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trip-description">Description</Label>
                    <Textarea
                      id="trip-description"
                      placeholder="Describe your trip experience..."
                      value={newTrip.description}
                      onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Create Trip
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AgencyDashboard;
