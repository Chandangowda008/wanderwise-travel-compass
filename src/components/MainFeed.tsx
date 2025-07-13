import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, MapPin, User, Settings, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ProfileManager } from "./ProfileManager";
import { NavigationDashboard } from "./NavigationDashboard";
import { googleAuthService } from "@/services/googleAuth";

interface TravelPost {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  location: string;
  date: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  user: string;
  text: string;
}

const MainFeed = () => {
  const [posts, setPosts] = useState<TravelPost[]>([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        username: "sarah_travels",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      location: "Santorini, Greece",
      date: "2 hours ago",
      content: "Just watched the most incredible sunset from Oia! The white buildings against the golden sky are absolutely magical. This place truly lives up to its reputation. 🌅 #Santorini #Greece #Travel",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
      likes: 1247,
      comments: 2,
      shares: 23,
      isLiked: false,
      isSaved: false,
      tags: ["Santorini", "Greece", "Sunset", "Travel"]
    },
    {
      id: "2",
      user: {
        name: "Mike Chen",
        username: "mike_explorer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: false,
      },
      location: "Tokyo, Japan",
      date: "5 hours ago",
      content: "Exploring the vibrant streets of Shibuya! The energy here is incredible. Found this amazing ramen spot that locals recommended. Best bowl I've ever had! 🍜 #Tokyo #Japan #Ramen",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      likes: 892,
      comments: 0,
      shares: 45,
      isLiked: true,
      isSaved: true,
      tags: ["Tokyo", "Japan", "Ramen", "Shibuya"]
    },
    {
      id: "3",
      user: {
        name: "Emma Rodriguez",
        username: "emma_wanderlust",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        verified: true,
      },
      location: "Barcelona, Spain",
      date: "1 day ago",
      content: "Gaudi's masterpiece - La Sagrada Familia! The architecture is mind-blowing. Every detail tells a story. Can't believe this has been under construction for over 140 years! ⛪ #Barcelona #Gaudi #Architecture",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop",
      likes: 2156,
      comments: 0,
      shares: 67,
      isLiked: false,
      isSaved: false,
      tags: ["Barcelona", "Spain", "Gaudi", "Architecture"]
    },
    {
      id: "4",
      user: {
        name: "Alex Thompson",
        username: "alex_adventures",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        verified: false,
      },
      location: "Bali, Indonesia",
      date: "2 days ago",
      content: "Morning yoga session with this view! The rice terraces of Tegalalang are absolutely breathtaking. This is what peace looks like. 🧘‍♀️🌾 #Bali #Yoga #RiceTerraces",
      image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d17119?w=400&h=300&fit=crop",
      likes: 1678,
      comments: 0,
      shares: 34,
      isLiked: true,
      isSaved: false,
      tags: ["Bali", "Indonesia", "Yoga", "RiceTerraces"]
    }
  ]);

  const [openComments, setOpenComments] = useState<{ [postId: string]: boolean }>({});
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({ "1": [
    { id: "1", user: "emma_wanderlust", text: "Wow, looks amazing!" },
    { id: "2", user: "mike_explorer", text: "Adding this to my bucket list." },
  ]});
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});
  const [shareDropdown, setShareDropdown] = useState<{ [postId: string]: boolean }>({});
  const [showProfile, setShowProfile] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get current user from Google Auth
    const user = googleAuthService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
  };

  const handleCommentToggle = (postId: string) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentInput = (postId: string, value: string) => {
    setCommentInput((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInput[postId]?.trim();
    if (!text) return;
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { id: Date.now().toString(), user: currentUser?.name || "you", text }],
    }));
    setCommentInput((prev) => ({ ...prev, [postId]: "" }));
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: post.comments + 1 } : post));
  };

  const handleShareToggle = (postId: string) => {
    setShareDropdown((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCopyLink = (postId: string) => {
    navigator.clipboard.writeText(`https://wanderwise.app/post/${postId}`);
    toast({ title: "Link copied!", description: "You can now share this post." });
    setShareDropdown((prev) => ({ ...prev, [postId]: false }));
    setPosts(posts.map(post => post.id === postId ? { ...post, shares: post.shares + 1 } : post));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Mobile swipe handlers
  const handleSwipeLeft = () => {
    setShowProfile(true);
    setShowNavigation(false);
  };

  const handleSwipeRight = () => {
    setShowNavigation(true);
    setShowProfile(false);
  };

  // Add touch event listeners for mobile swipe
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Check if it's a horizontal swipe (not vertical)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe left - show profile
          handleSwipeLeft();
        } else {
          // Swipe right - show navigation
          handleSwipeRight();
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-blue-50/50">
        <div className="flex items-center justify-between p-4 border-b border-border/30 bg-white/90 backdrop-blur-md">
          <Button
            variant="ghost"
            onClick={() => setShowProfile(false)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Feed
          </Button>
          <h1 className="text-lg font-semibold">Profile Settings</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
        <ProfileManager />
      </div>
    );
  }

  if (showNavigation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-blue-50/50">
        <div className="flex items-center justify-between p-4 border-b border-border/30 bg-white/90 backdrop-blur-md">
          <Button
            variant="ghost"
            onClick={() => setShowNavigation(false)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Feed
          </Button>
          <h1 className="text-lg font-semibold">Navigation Hub</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
        <NavigationDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-blue-50/50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/30 px-4 py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {/* Profile Button (Left) */}
          <Button
            variant="ghost"
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 hover:bg-orange-50"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser?.picture} alt={currentUser?.name} />
              <AvatarFallback className="bg-gradient-to-br from-orange-100 to-red-100 text-orange-600">
                {currentUser?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block font-medium">{currentUser?.name || "User"}</span>
          </Button>

          {/* App Title */}
          <div className="text-center">
            <h1 className="text-xl font-display font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              WanderWise
            </h1>
            <p className="text-xs text-muted-foreground">Travel Feed</p>
          </div>

          {/* Navigation Button (Right) */}
          <Button
            variant="ghost"
            onClick={() => setShowNavigation(true)}
            className="hover:bg-orange-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Swipe Indicators */}
      <div className="fixed top-20 left-4 z-40 pointer-events-none">
        <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">
          ← Swipe for Profile
        </div>
      </div>
      <div className="fixed top-20 right-4 z-40 pointer-events-none">
        <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">
          Navigation →
        </div>
      </div>

      {/* Feed Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Posts */}
        {posts.map((post) => (
          <Card key={post.id} className="glass-card border-gradient shadow-soft-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-100 to-red-100 text-orange-600">
                      {post.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{post.user.name}</span>
                      {post.user.verified && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {post.location} • {post.date}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Post Image */}
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.content}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Post Content */}
              <p className="text-sm leading-relaxed">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{formatNumber(post.likes)}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCommentToggle(post.id)}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">{formatNumber(post.comments)}</span>
                  </Button>

                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShareToggle(post.id)}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm">{formatNumber(post.shares)}</span>
                    </Button>
                    
                    {shareDropdown[post.id] && (
                      <div className="absolute bottom-full left-0 mb-2 bg-white border border-border rounded-lg shadow-lg p-2 z-10">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyLink(post.id)}
                          className="w-full justify-start text-sm"
                        >
                          Copy Link
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSave(post.id)}
                  className={`${post.isSaved ? 'text-orange-500' : 'text-muted-foreground'}`}
                >
                  <Bookmark className={`h-5 w-5 ${post.isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Comments Section */}
              {openComments[post.id] && (
                <div className="border-t border-border/30 pt-4 space-y-3">
                  {comments[post.id]?.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-gray-100">
                          {comment.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <span className="text-xs font-semibold">{comment.user}</span>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a comment..."
                      value={commentInput[post.id] || ''}
                      onChange={(e) => handleCommentInput(post.id, e.target.value)}
                      className="flex-1 text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddComment(post.id)}
                      disabled={!commentInput[post.id]?.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MainFeed; 