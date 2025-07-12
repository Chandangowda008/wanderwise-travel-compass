import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, MapPin, Calendar, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const TravelFeed = () => {
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
      comments: 89,
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
      comments: 156,
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
      comments: 234,
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
      comments: 123,
      shares: 34,
      isLiked: true,
      isSaved: false,
      tags: ["Bali", "Indonesia", "Yoga", "RiceTerraces"]
    }
  ]);

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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Feed Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gradient mb-2">Travel Feed</h1>
        <p className="text-muted-foreground">Discover amazing destinations through fellow travelers</p>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="glass-card border-gradient shadow-soft-hover overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-100 to-red-100 text-orange-600">
                    {post.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{post.user.name}</h3>
                    {post.user.verified && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>@{post.user.username}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="p-1">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Post Image */}
            <div className="relative">
              <img 
                src={post.image} 
                alt={post.location}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop";
                }}
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-black/50 text-white border-0">
                  <MapPin className="h-3 w-3 mr-1" />
                  {post.location}
                </Badge>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-sm mb-3 leading-relaxed">{post.content}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`p-2 hover:bg-red-50 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="ml-1 text-sm">{formatNumber(post.likes)}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-50">
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    <span className="ml-1 text-sm">{formatNumber(post.comments)}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-green-50">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <span className="ml-1 text-sm">{formatNumber(post.shares)}</span>
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSave(post.id)}
                  className={`p-2 hover:bg-yellow-50 ${post.isSaved ? 'text-yellow-500' : 'text-muted-foreground'}`}
                >
                  <Bookmark className={`h-5 w-5 ${post.isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TravelFeed; 