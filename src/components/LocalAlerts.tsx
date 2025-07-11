
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Bell, BellRing, BellOff, MapPin, Clock, DollarSign, Calendar, Star, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocalAlert {
  id: string;
  type: 'event' | 'deal' | 'weather' | 'transport' | 'safety';
  title: string;
  description: string;
  location: string;
  distance: number;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  expiresAt?: string;
  discount?: number;
}

interface NotificationSettings {
  events: boolean;
  deals: boolean;
  weather: boolean;
  transport: boolean;
  safety: boolean;
  radius: number;
}

export const LocalAlerts = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [settings, setSettings] = useState<NotificationSettings>({
    events: true,
    deals: true,
    weather: true,
    transport: false,
    safety: true,
    radius: 5
  });

  const [alerts, setAlerts] = useState<LocalAlert[]>([
    {
      id: '1',
      type: 'deal',
      title: '30% Off at Le Petit Bistro',
      description: 'Limited time offer on dinner menu until 9 PM today',
      location: 'Montmartre District',
      distance: 0.3,
      priority: 'medium',
      timestamp: '2024-03-20T15:30:00Z',
      expiresAt: '2024-03-20T21:00:00Z',
      discount: 30
    },
    {
      id: '2',
      type: 'event',
      title: 'Street Art Festival',
      description: 'Local artists showcasing their work in the plaza',
      location: 'Place du Tertre',
      distance: 0.5,
      priority: 'low',
      timestamp: '2024-03-20T14:00:00Z',
      expiresAt: '2024-03-20T22:00:00Z'
    },
    {
      id: '3',
      type: 'weather',
      title: 'Rain Alert',
      description: 'Light rain expected in 30 minutes. Consider indoor activities.',
      location: 'Current Area',
      distance: 0,
      priority: 'medium',
      timestamp: '2024-03-20T16:15:00Z'
    },
    {
      id: '4',
      type: 'safety',
      title: 'Area Advisory',
      description: 'Large crowds at Eiffel Tower. Allow extra time for visits.',
      location: 'Champ de Mars',
      distance: 1.2,
      priority: 'high',
      timestamp: '2024-03-20T13:45:00Z'
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    setPermission(Notification.permission);
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        setNotificationsEnabled(true);
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive real-time local alerts and deals.",
        });
      } else {
        toast({
          title: "Notifications Blocked",
          description: "Enable notifications in your browser settings to receive alerts.",
          variant: "destructive"
        });
      }
    }
  };

  const toggleNotifications = () => {
    if (!notificationsEnabled && permission !== 'granted') {
      requestNotificationPermission();
    } else {
      setNotificationsEnabled(!notificationsEnabled);
      toast({
        title: notificationsEnabled ? "Notifications Disabled" : "Notifications Enabled",
        description: notificationsEnabled 
          ? "You won't receive local alerts anymore."
          : "You'll receive real-time local alerts and deals.",
      });
    }
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getAlertIcon = (type: LocalAlert['type']) => {
    switch (type) {
      case 'event': return Calendar;
      case 'deal': return DollarSign;
      case 'weather': return AlertTriangle;
      case 'transport': return MapPin;
      case 'safety': return AlertTriangle;
      default: return Bell;
    }
  };

  const getAlertColor = (priority: LocalAlert['priority']) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority: LocalAlert['priority']) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };
    return colors[priority];
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDistance = (distance: number) => {
    if (distance === 0) return 'Your location';
    return distance < 1 ? `${(distance * 1000).toFixed(0)}m away` : `${distance.toFixed(1)}km away`;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-display font-semibold">Local Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Real-time notifications for nearby events, deals, and important information
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={notificationsEnabled ? "default" : "secondary"}>
              {notificationsEnabled ? "Active" : "Inactive"}
            </Badge>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={toggleNotifications}
            />
          </div>
        </div>

        {permission === 'denied' && (
          <Alert className="mb-4">
            <BellOff className="h-4 w-4" />
            <AlertDescription>
              Notifications are blocked. Enable them in your browser settings to receive local alerts.
            </AlertDescription>
          </Alert>
        )}

        {/* Notification Settings */}
        <Card className="p-4 mb-6">
          <h4 className="font-medium mb-3">Notification Preferences</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              {Object.entries(settings).filter(([key]) => key !== 'radius').map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize text-sm">{key}</span>
                  <Switch
                    checked={value as boolean}
                    onCheckedChange={(checked) => updateSetting(key as keyof NotificationSettings, checked)}
                    disabled={!notificationsEnabled}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Alert Radius</label>
                <select
                  value={settings.radius}
                  onChange={(e) => updateSetting('radius', Number(e.target.value))}
                  disabled={!notificationsEnabled}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value={1}>1 km</option>
                  <option value={2}>2 km</option>
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Alerts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Recent Alerts</h4>
            <Badge variant="outline">
              {alerts.length} Active
            </Badge>
          </div>

          {alerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type);
            return (
              <Card key={alert.id} className={`p-4 ${getAlertColor(alert.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-0.5">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium">{alert.title}</h5>
                        <Badge className={`text-xs ${getPriorityBadge(alert.priority)}`}>
                          {alert.priority}
                        </Badge>
                        {alert.discount && (
                          <Badge variant="outline" className="text-xs">
                            {alert.discount}% OFF
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location} • {formatDistance(alert.distance)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(alert.timestamp)}
                        </span>
                        {alert.expiresAt && (
                          <span className="text-orange-600">
                            Expires {formatTime(alert.expiresAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <BellRing className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
