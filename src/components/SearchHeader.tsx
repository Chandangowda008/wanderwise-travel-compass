import { Mountain, Sparkles, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SearchHeaderProps {
  onSearch: (city: string) => void;
  onNavigationToggle?: () => void;
  onNavigateToFeature?: (feature: string) => void;
  currentFeature?: string;
}

export const SearchHeader = ({ onSearch, onNavigationToggle, onNavigateToFeature, currentFeature }: SearchHeaderProps) => {
  // User profile data - in a real app this would come from context or props
  const userProfile = {
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  };

  const handleHomeClick = () => {
    if (onNavigateToFeature) {
      onNavigateToFeature("home");
    }
  };

  const handleProfileClick = () => {
    if (onNavigateToFeature) {
      onNavigateToFeature("profile");
    }
  };

  return (
    <header className="glass-effect sticky top-0 z-50 px-4 py-3 shadow-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Profile Icon and Home Button (Left) */}
        <div className="flex items-center space-x-3">
          {/* Home Button - Only show when viewing a specific feature */}
          {currentFeature && currentFeature !== "home" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className="p-2 hover:bg-orange-50 transition-all duration-200 hover:scale-105 active:scale-95"
              title="Back to Home"
            >
              <Home className="h-5 w-5 text-orange-600" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleProfileClick}
            className="p-2 hover:bg-orange-50 transition-all duration-200 hover:scale-105 active:scale-95"
            title="Profile Settings"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="bg-gradient-to-br from-orange-100 to-red-100 text-orange-600 text-sm">
                {userProfile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>

        {/* Center - Logo Section */}
        <div className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-xl p-2 shadow-soft group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Mountain className="h-6 w-6 md:h-8 md:w-8 text-gradient" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-display font-bold text-gradient">WanderWise</h1>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-muted-foreground">AI Travel Companion</span>
            </div>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-display font-bold text-gradient">WanderWise</h1>
          </div>
        </div>

        {/* Right side - Empty space for balance */}
        <div className="flex items-center space-x-3">
          {/* This div provides balance to center the logo */}
        </div>
      </div>
    </header>
  );
};