
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2, Facebook, Twitter, Instagram, Link, Mail, MessageCircle, Camera, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareableContent {
  id: string;
  type: 'itinerary' | 'photo' | 'location' | 'trip';
  title: string;
  description: string;
  image?: string;
  location?: string;
  date?: string;
}

export const SocialSharing = () => {
  const [shareContent, setShareContent] = useState<ShareableContent[]>([
    {
      id: '1',
      type: 'itinerary',
      title: 'Paris Adventure - 5 Days',
      description: 'Complete itinerary covering Eiffel Tower, Louvre, and hidden gems',
      location: 'Paris, France',
      date: '2024-03-15'
    },
    {
      id: '2',
      type: 'photo',
      title: 'Sunset at Seine River',
      description: 'Golden hour magic captured from Pont Neuf',
      location: 'Paris, France',
      date: '2024-03-16'
    },
    {
      id: '3',
      type: 'location',
      title: 'Le Petit Bistro',
      description: 'Amazing authentic French cuisine - highly recommended!',
      location: 'Montmartre, Paris',
      date: '2024-03-17'
    }
  ]);

  const [selectedContent, setSelectedContent] = useState<ShareableContent | null>(null);
  const [shareMessage, setShareMessage] = useState('');
  const { toast } = useToast();

  const handleShare = async (platform: string, content: ShareableContent) => {
    const shareUrl = `https://wanderwise.app/${content.type}/${content.id}`;
    const shareText = shareMessage || `Check out my ${content.type}: ${content.title}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so copy to clipboard
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast({
          title: "Copied to Clipboard",
          description: "Share text copied! Paste it in your Instagram story or post.",
        });
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(content.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`);
        break;
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Share link has been copied to clipboard.",
        });
        break;
    }

    toast({
      title: "Shared Successfully",
      description: `Your ${content.type} has been shared on ${platform}!`,
    });
  };

  const getIconForContent = (type: ShareableContent['type']) => {
    switch (type) {
      case 'itinerary': return Calendar;
      case 'photo': return Camera;
      case 'location': return MapPin;
      case 'trip': return MapPin;
      default: return Share2;
    }
  };

  const getColorForContent = (type: ShareableContent['type']) => {
    switch (type) {
      case 'itinerary': return 'bg-blue-500';
      case 'photo': return 'bg-green-500';
      case 'location': return 'bg-purple-500';
      case 'trip': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-display font-semibold">Social Sharing</h3>
            <p className="text-sm text-muted-foreground">
              Share your travel memories and itineraries with friends and family
            </p>
          </div>
          <Badge variant="outline">
            {shareContent.length} Items Ready
          </Badge>
        </div>

        <div className="grid gap-4">
          {shareContent.map((content) => {
            const IconComponent = getIconForContent(content.type);
            return (
              <Card key={content.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg ${getColorForContent(content.type)} flex items-center justify-center`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{content.title}</h4>
                        <Badge variant="outline" className="capitalize text-xs">
                          {content.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {content.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {content.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {content.location}
                          </span>
                        )}
                        {content.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {content.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedContent(content)}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Share {content.title}</DialogTitle>
                        <DialogDescription>
                          Choose how you'd like to share this {content.type}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Add a message (optional)
                          </label>
                          <Textarea
                            placeholder={`Check out my ${content.type}: ${content.title}`}
                            value={shareMessage}
                            onChange={(e) => setShareMessage(e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <Button
                            variant="outline"
                            className="flex flex-col gap-2 h-auto py-3"
                            onClick={() => handleShare('facebook', content)}
                          >
                            <Facebook className="h-5 w-5 text-blue-600" />
                            <span className="text-xs">Facebook</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="flex flex-col gap-2 h-auto py-3"
                            onClick={() => handleShare('twitter', content)}
                          >
                            <Twitter className="h-5 w-5 text-blue-400" />
                            <span className="text-xs">Twitter</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="flex flex-col gap-2 h-auto py-3"
                            onClick={() => handleShare('instagram', content)}
                          >
                            <Instagram className="h-5 w-5 text-pink-600" />
                            <span className="text-xs">Instagram</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="flex flex-col gap-2 h-auto py-3"
                            onClick={() => handleShare('whatsapp', content)}
                          >
                            <MessageCircle className="h-5 w-5 text-green-600" />
                            <span className="text-xs">WhatsApp</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="flex flex-col gap-2 h-auto py-3"
                            onClick={() => handleShare('email', content)}
                          >
                            <Mail className="h-5 w-5 text-gray-600" />
                            <span className="text-xs">Email</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="flex flex-col gap-2 h-auto py-3"
                            onClick={() => handleShare('copy', content)}
                          >
                            <Link className="h-5 w-5 text-gray-600" />
                            <span className="text-xs">Copy Link</span>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
