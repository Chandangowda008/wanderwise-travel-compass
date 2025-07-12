import { useState } from "react";
import { User, Camera, Edit3, Save, X, Calendar, MapPin, Globe, Heart, Bookmark, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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

const ProfileManager = () => {
  const [isEditing, setIsEditing] = useState(false);
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gradient mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your travel profile and preferences</p>
      </div>

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
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-3" />
                Liked Posts
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bookmark className="h-4 w-4 mr-3" />
                Saved Places
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Globe className="h-4 w-4 mr-3" />
                My Trips
              </Button>
              <Separator />
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
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