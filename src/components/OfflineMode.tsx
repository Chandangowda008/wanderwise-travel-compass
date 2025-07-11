
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { WifiOff, Wifi, Download, HardDrive, Globe, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OfflineData {
  maps: boolean;
  recommendations: boolean;
  weatherData: boolean;
  translations: boolean;
}

export const OfflineMode = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineMode, setOfflineMode] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [offlineData, setOfflineData] = useState<OfflineData>({
    maps: false,
    recommendations: false,
    weatherData: false,
    translations: false
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const downloadOfflineData = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    const dataTypes = ['maps', 'recommendations', 'weatherData', 'translations'];
    
    for (let i = 0; i < dataTypes.length; i++) {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const dataType = dataTypes[i] as keyof OfflineData;
      setOfflineData(prev => ({ ...prev, [dataType]: true }));
      setDownloadProgress(((i + 1) / dataTypes.length) * 100);
    }

    setIsDownloading(false);
    toast({
      title: "Offline Data Ready",
      description: "All travel data has been downloaded for offline use.",
    });
  };

  const toggleOfflineMode = () => {
    setOfflineMode(!offlineMode);
    toast({
      title: offlineMode ? "Online Mode Enabled" : "Offline Mode Enabled",
      description: offlineMode ? "Using live data connections" : "Using cached offline data",
    });
  };

  const getStorageSize = () => {
    const sizes = {
      maps: 45,
      recommendations: 12,
      weatherData: 8,
      translations: 15
    };
    
    return Object.entries(offlineData)
      .reduce((total, [key, downloaded]) => 
        total + (downloaded ? sizes[key as keyof typeof sizes] : 0), 0
      );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <Wifi className="h-5 w-5 text-green-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-600" />
            )}
            <div>
              <h3 className="text-lg font-semibold">Offline Mode</h3>
              <p className="text-sm text-muted-foreground">
                Status: {isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={offlineMode ? "default" : "secondary"}>
              {offlineMode ? "Offline Mode" : "Online Mode"}
            </Badge>
            <Switch
              checked={offlineMode}
              onCheckedChange={toggleOfflineMode}
            />
          </div>
        </div>

        {!isOnline && (
          <Alert className="mb-4">
            <Globe className="h-4 w-4" />
            <AlertDescription>
              You're currently offline. Offline mode is automatically enabled with cached data.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium">Download for Offline Use</h4>
            <div className="space-y-2">
              {Object.entries(offlineData).map(([key, downloaded]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                  {downloaded ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Download className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
            
            <Button
              onClick={downloadOfflineData}
              disabled={isDownloading}
              className="w-full"
            >
              {isDownloading ? (
                <>
                  <Download className="h-4 w-4 mr-2 animate-spin" />
                  Downloading... {Math.round(downloadProgress)}%
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download All Data
                </>
              )}
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Storage Usage
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Downloaded Data:</span>
                <span>{getStorageSize()} MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Available Space:</span>
                <span>2.3 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(getStorageSize() / 100) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Perfect for international travel without roaming charges
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
