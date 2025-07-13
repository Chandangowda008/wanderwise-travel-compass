import { useState } from "react";
import { User, Camera, Edit3, Save, X, LogOut, Bell, Shield, Palette, MapPin, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
}

interface AppSettings {
  theme: string;
  pushNotifications: boolean;
  emailNotifications: boolean;
  locationSharing: boolean;
  dataCollection: boolean;
  mapType: string;
  showTraffic: boolean;
  autoSaveLocation: boolean;
}

const ProfileManager = () => {
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    username: "alex_traveler",
    bio: "Passionate traveler exploring the world one destination at a time. Love sharing authentic experiences and hidden gems! 🌍✈️",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    followers: 2847,
    following: 892,
    posts: 156,
    verified: true,
  });

  const [settings, setSettings] = useState<AppSettings>({
    theme: 'auto',
    pushNotifications: true,
    emailNotifications: false,
    locationSharing: true,
    dataCollection: false,
    mapType: 'satellite',
    showTraffic: true,
    autoSaveLocation: true,
  });

  const [editForm, setEditForm] = useState<UserProfile>(profile);
  const { toast } = useToast();

  const handleSave = () => {
    setProfile(editForm);
    setShowProfileSettings(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated!",
    });
  };

  const handleCancel = () => {
    setEditForm(profile);
    setShowProfileSettings(false);
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

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gradient mb-2">
          Profile & Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile and app preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE - Unified Profile Section */}
        <div className="space-y-6">
          {/* Profile Display */}
          <Card className="glass-card border-gradient shadow-soft-hover">
            <CardHeader className="text-center pb-6">
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-100 to-red-100 text-orange-600 text-2xl">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
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

              {/* Edit Profile Button */}
              <div className="flex justify-center mt-6">
                <Button onClick={() => setShowProfileSettings(true)} variant="outline">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Profile Edit Form */}
          {showProfileSettings && (
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
                  <Label>Profile Picture</Label>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={editForm.avatar} alt={editForm.name} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-100 to-red-100 text-orange-600">
                        {editForm.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <label className="bg-orange-500 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-orange-600 transition-colors text-sm">
                      <Camera className="h-4 w-4 mr-2 inline" />
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="gradient-bg text-white flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex-1">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT SIDE - Unified Settings Section with 3 Columns */}
        <div className="space-y-6">
          <Card className="glass-card border-gradient shadow-soft-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                App Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 - Appearance & Theme */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Appearance
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Theme</label>
                      <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Column 2 - Notifications */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Push Notifications</label>
                        <p className="text-xs text-muted-foreground">Travel updates</p>
                      </div>
                      <Switch 
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Email Notifications</label>
                        <p className="text-xs text-muted-foreground">Email updates</p>
                      </div>
                      <Switch 
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Column 3 - Privacy & Maps */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Privacy & Maps
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Location Sharing</label>
                        <p className="text-xs text-muted-foreground">Share with friends</p>
                      </div>
                      <Switch 
                        checked={settings.locationSharing}
                        onCheckedChange={(checked) => handleSettingChange('locationSharing', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Data Collection</label>
                        <p className="text-xs text-muted-foreground">Improve app</p>
                      </div>
                      <Switch 
                        checked={settings.dataCollection}
                        onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
                      />
                    </div>
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
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Show Traffic</label>
                        <p className="text-xs text-muted-foreground">Real-time traffic</p>
                      </div>
                      <Switch 
                        checked={settings.showTraffic}
                        onCheckedChange={(checked) => handleSettingChange('showTraffic', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Auto Save Location</label>
                        <p className="text-xs text-muted-foreground">Save visited places</p>
                      </div>
                      <Switch 
                        checked={settings.autoSaveLocation}
                        onCheckedChange={(checked) => handleSettingChange('autoSaveLocation', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Card className="glass-card border-gradient shadow-soft-hover">
            <CardContent className="pt-6">
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
    </div>
  );
};

export default ProfileManager;
export { ProfileManager }; 