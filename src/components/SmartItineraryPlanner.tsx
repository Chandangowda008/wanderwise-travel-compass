
import { useState } from "react";
import { Calendar, Clock, MapPin, Plus, Trash2, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  category: 'dining' | 'attraction' | 'transport' | 'accommodation' | 'activity';
  priority: 'low' | 'medium' | 'high';
  estimatedCost?: number;
  notes?: string;
}

interface DayPlan {
  date: string;
  items: ItineraryItem[];
}

export const SmartItineraryPlanner = () => {
  const [itinerary, setItinerary] = useState<DayPlan[]>([
    {
      date: "2024-01-20",
      items: [
        {
          id: "1",
          title: "Arrive at Charles de Gaulle Airport",
          description: "Flight landing, customs, and baggage claim",
          location: "CDG Airport, Terminal 2E",
          startTime: "10:00",
          endTime: "11:30",
          category: "transport",
          priority: "high"
        },
        {
          id: "2",
          title: "Hotel Check-in",
          description: "Check into Hotel des Grands Boulevards",
          location: "17 Boulevard Poissonnière, 75002 Paris",
          startTime: "13:00",
          endTime: "14:00",
          category: "accommodation",
          priority: "high",
          estimatedCost: 150
        },
        {
          id: "3",
          title: "Lunch at Local Bistro",
          description: "Traditional French cuisine at Le Comptoir du Relais",
          location: "9 Carrefour de l'Odéon, 75006 Paris",
          startTime: "14:30",
          endTime: "16:00",
          category: "dining",
          priority: "medium",
          estimatedCost: 45
        },
        {
          id: "4",
          title: "Explore Louvre Museum",
          description: "Visit world-famous art collections including Mona Lisa",
          location: "Rue de Rivoli, 75001 Paris",
          startTime: "16:30",
          endTime: "19:00",
          category: "attraction",
          priority: "high",
          estimatedCost: 17
        }
      ]
    }
  ]);

  const [newItem, setNewItem] = useState<Partial<ItineraryItem>>({
    category: 'activity',
    priority: 'medium'
  });
  const [selectedDate, setSelectedDate] = useState(itinerary[0]?.date || "2024-01-20");
  const [showAddForm, setShowAddForm] = useState(false);

  const addItem = () => {
    if (!newItem.title || !newItem.location || !newItem.startTime || !newItem.endTime) {
      return;
    }

    const item: ItineraryItem = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description || "",
      location: newItem.location,
      startTime: newItem.startTime,
      endTime: newItem.endTime,
      category: newItem.category || 'activity',
      priority: newItem.priority || 'medium',
      estimatedCost: newItem.estimatedCost,
      notes: newItem.notes
    };

    setItinerary(prev => prev.map(day => 
      day.date === selectedDate 
        ? { ...day, items: [...day.items, item].sort((a, b) => a.startTime.localeCompare(b.startTime)) }
        : day
    ));

    setNewItem({ category: 'activity', priority: 'medium' });
    setShowAddForm(false);
  };

  const removeItem = (itemId: string) => {
    setItinerary(prev => prev.map(day => ({
      ...day,
      items: day.items.filter(item => item.id !== itemId)
    })));
  };

  const getCategoryIcon = (category: ItineraryItem['category']) => {
    switch (category) {
      case 'dining':
        return '🍽️';
      case 'attraction':
        return '🏛️';
      case 'transport':
        return '🚗';
      case 'accommodation':
        return '🏨';
      case 'activity':
        return '🎯';
      default:
        return '📍';
    }
  };

  const getPriorityColor = (priority: ItineraryItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentDay = itinerary.find(day => day.date === selectedDate);
  const totalCost = currentDay?.items.reduce((sum, item) => sum + (item.estimatedCost || 0), 0) || 0;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold">Smart Itinerary Planner</h2>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Travel Date</p>
              <p className="text-sm text-muted-foreground">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Activities Planned</p>
              <p className="text-sm text-muted-foreground">{currentDay?.items.length || 0} activities</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Star className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Estimated Budget</p>
              <p className="text-sm text-muted-foreground">€{totalCost}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Activity Form */}
      {showAddForm && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Add New Activity</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Activity Title</label>
              <Input
                placeholder="e.g., Visit Eiffel Tower"
                value={newItem.title || ""}
                onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                placeholder="e.g., Champ de Mars, 75007 Paris"
                value={newItem.location || ""}
                onChange={(e) => setNewItem(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <Input
                type="time"
                value={newItem.startTime || ""}
                onChange={(e) => setNewItem(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Time</label>
              <Input
                type="time"
                value={newItem.endTime || ""}
                onChange={(e) => setNewItem(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={newItem.category || 'activity'}
                onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value as ItineraryItem['category'] }))}
              >
                <option value="activity">Activity</option>
                <option value="dining">Dining</option>
                <option value="attraction">Attraction</option>
                <option value="transport">Transport</option>
                <option value="accommodation">Accommodation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                className="w-full p-2 border rounded-md"
                value={newItem.priority || 'medium'}
                onChange={(e) => setNewItem(prev => ({ ...prev, priority: e.target.value as ItineraryItem['priority'] }))}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Brief description of the activity..."
                value={newItem.description || ""}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Estimated Cost (€)</label>
              <Input
                type="number"
                placeholder="0"
                value={newItem.estimatedCost || ""}
                onChange={(e) => setNewItem(prev => ({ ...prev, estimatedCost: parseFloat(e.target.value) || undefined }))}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={addItem}>Add Activity</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {/* Itinerary Timeline */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Daily Timeline</h3>
        
        {currentDay?.items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No activities planned for this day</p>
            <Button variant="outline" onClick={() => setShowAddForm(true)} className="mt-4">
              Add First Activity
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {currentDay?.items.map((item, index) => (
              <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{item.startTime} - {item.endTime}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{item.location}</span>
                    </div>
                    {item.estimatedCost && (
                      <span className="font-medium">€{item.estimatedCost}</span>
                    )}
                  </div>
                  
                  {item.notes && (
                    <p className="mt-2 text-sm bg-muted p-2 rounded italic">
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
