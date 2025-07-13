import { useState } from "react";
import { User, Camera, Edit3, Save, X, Calendar, MapPin, Globe, Heart, Bookmark, Settings, LogOut, Bell, Moon, Sun, Shield, Eye, Download, Trash2, Palette, Volume2, Wifi, Smartphone, Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  dateOfBirth: string;
  avatar: string;
  location: string;
  website: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
}

interface AppSettings {
  theme: string;
  accentColor: string;
  pushNotifications: boolean;
  emailNotifications: boolean;
  soundEnabled: boolean;
  notificationVolume: number;
  locationSharing: boolean;
  dataCollection: boolean;
  analyticsEnabled: boolean;
  personalizedAds: boolean;
  mapType: string;
  showTraffic: boolean;
  showTransit: boolean;
  autoSaveLocation: boolean;
  language: string;
  currency: string;
  timezone: string;
  autoSync: boolean;
  offlineMode: boolean;
  autoBackup: boolean;
  cacheSize: number;
  clearCache: boolean;
}

const ProfileManager = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'liked-posts' | 'saved-places' | 'my-trips'>('profile');
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    username: "alex_traveler",
    bio: "Passionate traveler exploring the world one destination at a time. Love sharing authentic experiences and hidden gems! 🌍✈️",
    dateOfBirth: "1995-03-15",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    location: "San Francisco, CA",
    website: "https://alex-travels.com",
    followers: 2847,
    following: 892,
    posts: 156,
    verified: true,
  });

  const [settings, setSettings] = useState<AppSettings>({
    theme: 'auto',
    accentColor: 'orange',
    pushNotifications: true,
    emailNotifications: false,
    soundEnabled: true,
    notificationVolume: 70,
    locationSharing: true,
    dataCollection: false,
    analyticsEnabled: true,
    personalizedAds: false,
    mapType: 'satellite',
    showTraffic: true,
    showTransit: true,
    autoSaveLocation: true,
    language: 'en',
    currency: 'USD',
    timezone: 'auto',
    autoSync: true,
    offlineMode: false,
    autoBackup: true,
    cacheSize: 50,
    clearCache: false,
  });

  const [editForm, setEditForm] = useState<UserProfile>(profile);
  const { toast } = useToast();

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated!",
    });
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm({
          ...editForm,
          avatar: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Setting Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been updated.`,
    });
  };

  const handleSaveSettings = () => {
    localStorage.setItem('wanderwise-settings', JSON.stringify(settings));
    
    toast({
      title: "Settings Saved",
      description: "Your preferences have been saved successfully.",
    });
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'auto',
      accentColor: 'orange',
      pushNotifications: true,
      emailNotifications: false,
      soundEnabled: true,
      notificationVolume: 70,
      locationSharing: true,
      dataCollection: false,
      analyticsEnabled: true,
      personalizedAds: false,
      mapType: 'satellite',
      showTraffic: true,
      showTransit: true,
      autoSaveLocation: true,
      language: 'en',
      currency: 'USD',
      timezone: 'auto',
      autoSync: true,
      offlineMode: false,
      autoBackup: true,
      cacheSize: 50,
      clearCache: false,
    };
    
    setSettings(defaultSettings);
    localStorage.setItem('wanderwise-settings', JSON.stringify(defaultSettings));
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  const handleClearCache = () => {
    setSettings(prev => ({ ...prev, clearCache: true }));
    
    toast({
      title: "Cache Cleared",
      description: "App cache has been cleared successfully.",
    });
    
    setTimeout(() => {
      setSettings(prev => ({ ...prev, clearCache: false }));
    }, 2000);
  };

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    // In a real app, this would handle actual sign out logic
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <Card className="glass-card border-gradient shadow-soft-hover">
                <CardHeader className="text-center pb-6">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-100 to-red-100 text-orange-600 text-2xl">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                        <Camera className="h-4 w-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-2xl font-display font-bold">{profile.name}</h2>
                      {profile.verified && (
                        <Badge variant="secondary" className="text-xs">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">@{profile.username}</p>
                    <p className="text-sm leading-relaxed max-w-md mx-auto">{profile.bio}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center space-x-8 mt-6">
                    <div className="text-center">
                      <div className="text-xl font-bold">{formatNumber(profile.posts)}</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">{formatNumber(profile.followers)}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">{formatNumber(profile.following)}</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-3 mt-6">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSave} className="gradient-bg text-white">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} variant="outline">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div className="lg:col-span-1">
                <Card className="glass-card border-gradient shadow-soft-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit3 className="h-5 w-5" />
                      Edit Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={editForm.dateOfBirth}
                        onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        placeholder="Where are you based?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={editForm.website}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                        placeholder="https://your-website.com"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <Card className="glass-card border-gradient shadow-soft-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('liked-posts')}
                  >
                    <Heart className="h-4 w-4 mr-3" />
                    Liked Posts
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('saved-places')}
                  >
                    <Bookmark className="h-4 w-4 mr-3" />
                    Saved Places
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('my-trips')}
                  >
                    <Globe className="h-4 w-4 mr-3" />
                    My Trips
                  </Button>
                  <Separator />
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
              <Button 
                variant="outline" 
                onClick={handleResetSettings}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Default
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClearCache}
                disabled={settings.clearCache}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Theme & Appearance */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-500" />
                    Theme & Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme Mode</label>
                    <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto (System)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Accent Color</label>
                    <Select value={settings.accentColor} onValueChange={(value) => handleSettingChange('accentColor', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="pink">Pink</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-500" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Push Notifications</label>
                      <p className="text-xs text-muted-foreground">Receive travel updates and alerts</p>
                    </div>
                    <Switch 
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Email Notifications</label>
                      <p className="text-xs text-muted-foreground">Get updates via email</p>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Sound Enabled</label>
                      <p className="text-xs text-muted-foreground">Play notification sounds</p>
                    </div>
                    <Switch 
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
                    />
                  </div>

                  {settings.soundEnabled && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notification Volume</label>
                      <Slider
                        value={[settings.notificationVolume]}
                        onValueChange={(value) => handleSettingChange('notificationVolume', value[0])}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">{settings.notificationVolume}%</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Location Sharing</label>
                      <p className="text-xs text-muted-foreground">Share your location with friends</p>
                    </div>
                    <Switch 
                      checked={settings.locationSharing}
                      onCheckedChange={(checked) => handleSettingChange('locationSharing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Data Collection</label>
                      <p className="text-xs text-muted-foreground">Allow data collection for improvements</p>
                    </div>
                    <Switch 
                      checked={settings.dataCollection}
                      onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Analytics</label>
                      <p className="text-xs text-muted-foreground">Help improve the app with analytics</p>
                    </div>
                    <Switch 
                      checked={settings.analyticsEnabled}
                      onCheckedChange={(checked) => handleSettingChange('analyticsEnabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Personalized Ads</label>
                      <p className="text-xs text-muted-foreground">Show personalized advertisements</p>
                    </div>
                    <Switch 
                      checked={settings.personalizedAds}
                      onCheckedChange={(checked) => handleSettingChange('personalizedAds', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Map Settings */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    Map Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Map Type</label>
                    <Select value={settings.mapType} onValueChange={(value) => handleSettingChange('mapType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="satellite">Satellite</SelectItem>
                        <SelectItem value="terrain">Terrain</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Show Traffic</label>
                      <p className="text-xs text-muted-foreground">Display real-time traffic</p>
                    </div>
                    <Switch 
                      checked={settings.showTraffic}
                      onCheckedChange={(checked) => handleSettingChange('showTraffic', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Show Transit</label>
                      <p className="text-xs text-muted-foreground">Display public transit</p>
                    </div>
                    <Switch 
                      checked={settings.showTransit}
                      onCheckedChange={(checked) => handleSettingChange('showTransit', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Auto Save Location</label>
                      <p className="text-xs text-muted-foreground">Automatically save visited places</p>
                    </div>
                    <Switch 
                      checked={settings.autoSaveLocation}
                      onCheckedChange={(checked) => handleSettingChange('autoSaveLocation', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'liked-posts':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-red-500" />
              <h2 className="text-2xl font-bold mb-4">Liked Posts</h2>
              <p className="text-muted-foreground mb-6">Posts you've liked will appear here</p>
              <Button onClick={() => setActiveTab('profile')} variant="outline">
                ← Back to Profile
              </Button>
            </div>
          </div>
        );

      case 'saved-places':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Bookmark className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <h2 className="text-2xl font-bold mb-4">Saved Places</h2>
              <p className="text-muted-foreground mb-6">Your saved places will appear here</p>
              <Button onClick={() => setActiveTab('profile')} variant="outline">
                ← Back to Profile
              </Button>
            </div>
          </div>
        );

      case 'my-trips':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold mb-4">My Trips</h2>
              <p className="text-muted-foreground mb-6">Your planned and completed trips will appear here</p>
              <Button onClick={() => setActiveTab('profile')} variant="outline">
                ← Back to Profile
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gradient mb-2">
          {activeTab === 'profile' ? 'Profile' : 
           activeTab === 'settings' ? 'Settings' :
           activeTab === 'liked-posts' ? 'Liked Posts' :
           activeTab === 'saved-places' ? 'Saved Places' :
           activeTab === 'my-trips' ? 'My Trips' : 'Profile'}
        </h1>
        <p className="text-muted-foreground">
          {activeTab === 'profile' ? 'Manage your travel profile and preferences' :
           activeTab === 'settings' ? 'Customize your WanderWise experience' :
           activeTab === 'liked-posts' ? 'Posts you\'ve liked and saved' :
           activeTab === 'saved-places' ? 'Your favorite places and destinations' :
           activeTab === 'my-trips' ? 'Your travel history and planned trips' : 'Profile management'}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('profile')}
            className="rounded-md"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('settings')}
            className="rounded-md"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default ProfileManager;
export { ProfileManager }; 