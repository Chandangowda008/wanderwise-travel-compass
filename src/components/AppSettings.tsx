import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  Shield, 
  Eye, 
  Download, 
  Trash2, 
  Palette,
  Volume2,
  Wifi,
  Smartphone,
  MapPin,
  Clock,
  Save,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AppSettings = () => {
  const [settings, setSettings] = useState({
    // Theme Settings
    theme: 'auto',
    accentColor: 'orange',
    
    // Notification Settings
    pushNotifications: true,
    emailNotifications: false,
    soundEnabled: true,
    notificationVolume: 70,
    
    // Privacy Settings
    locationSharing: true,
    dataCollection: false,
    analyticsEnabled: true,
    personalizedAds: false,
    
    // Map Settings
    mapType: 'satellite',
    showTraffic: true,
    showTransit: true,
    autoSaveLocation: true,
    
    // App Settings
    language: 'en',
    currency: 'USD',
    timezone: 'auto',
    autoSync: true,
    offlineMode: false,
    
    // Data Settings
    autoBackup: true,
    cacheSize: 50,
    clearCache: false,
  });

  const { toast } = useToast();

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
    // In a real app, this would save to backend/localStorage
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
    
    // Reset the flag after a delay
    setTimeout(() => {
      setSettings(prev => ({ ...prev, clearCache: false }));
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-gradient mb-4">
          App Settings
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Customize your WanderWise experience with personalized settings and preferences.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
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
            <CardDescription>Customize the look and feel of your app</CardDescription>
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
            <CardDescription>Manage your notification preferences</CardDescription>
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
                <label className="text-sm font-medium">Sound Alerts</label>
                <p className="text-xs text-muted-foreground">Play sounds for notifications</p>
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
                  onValueChange={([value]) => handleSettingChange('notificationVolume', value)}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>{settings.notificationVolume}%</span>
                  <span>100%</span>
                </div>
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
            <CardDescription>Control your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Location Sharing</label>
                <p className="text-xs text-muted-foreground">Share location for better recommendations</p>
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
                <p className="text-xs text-muted-foreground">Show ads based on your interests</p>
              </div>
              <Switch 
                checked={settings.personalizedAds}
                onCheckedChange={(checked) => handleSettingChange('personalizedAds', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Map Preferences */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              Map Preferences
            </CardTitle>
            <CardDescription>Customize your map experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Map Type</label>
              <Select value={settings.mapType} onValueChange={(value) => handleSettingChange('mapType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="satellite">Satellite</SelectItem>
                  <SelectItem value="terrain">Terrain</SelectItem>
                  <SelectItem value="roadmap">Road Map</SelectItem>
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
                <label className="text-sm font-medium">Auto-save Location</label>
                <p className="text-xs text-muted-foreground">Automatically save visited places</p>
              </div>
              <Switch 
                checked={settings.autoSaveLocation}
                onCheckedChange={(checked) => handleSettingChange('autoSaveLocation', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-cyan-500" />
              Regional Settings
            </CardTitle>
            <CardDescription>Set your local preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="ko">한국어</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                  <SelectItem value="AUD">AUD (A$)</SelectItem>
                  <SelectItem value="CHF">CHF (CHF)</SelectItem>
                  <SelectItem value="CNY">CNY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (System)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="CST">Central Time</SelectItem>
                  <SelectItem value="MST">Mountain Time</SelectItem>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                  <SelectItem value="GMT">GMT</SelectItem>
                  <SelectItem value="CET">Central European Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data & Storage */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-indigo-500" />
              Data & Storage
            </CardTitle>
            <CardDescription>Manage your data and storage settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Auto Sync</label>
                <p className="text-xs text-muted-foreground">Sync data across devices</p>
              </div>
              <Switch 
                checked={settings.autoSync}
                onCheckedChange={(checked) => handleSettingChange('autoSync', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Offline Mode</label>
                <p className="text-xs text-muted-foreground">Use app without internet</p>
              </div>
              <Switch 
                checked={settings.offlineMode}
                onCheckedChange={(checked) => handleSettingChange('offlineMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Auto Backup</label>
                <p className="text-xs text-muted-foreground">Backup data automatically</p>
              </div>
              <Switch 
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cache Size: {settings.cacheSize}MB</label>
              <Slider
                value={[settings.cacheSize]}
                onValueChange={([value]) => handleSettingChange('cacheSize', value)}
                max={200}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10MB</span>
                <span>200MB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Settings Summary */}
      <Card className="glass-card mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-500" />
            Current Settings Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium">Theme</div>
              <Badge variant="secondary" className="mt-1">{settings.theme}</Badge>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium">Language</div>
              <Badge variant="secondary" className="mt-1">{settings.language.toUpperCase()}</Badge>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium">Currency</div>
              <Badge variant="secondary" className="mt-1">{settings.currency}</Badge>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium">Map Type</div>
              <Badge variant="secondary" className="mt-1">{settings.mapType}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 