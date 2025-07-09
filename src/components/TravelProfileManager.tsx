
import { useState } from "react";
import { User, Settings, Heart, Wallet, MapPin, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TravelProfile {
  personalInfo: {
    name: string;
    age: string;
    nationality: string;
    languages: string[];
  };
  preferences: {
    travelStyle: 'adventure' | 'cultural' | 'relaxed' | 'luxury' | 'budget';
    interests: string[];
    budgetRange: 'low' | 'medium' | 'high' | 'luxury';
    accommodationType: string[];
    transportPreference: string[];
  };
  accessibility: {
    mobilityNeeds: string[];
    dietaryRestrictions: string[];
    medicalConditions: string[];
  };
  safety: {
    riskTolerance: 'low' | 'medium' | 'high';
    emergencyContacts: Array<{ name: string; phone: string; relationship: string }>;
    travelInsurance: boolean;
  };
}

export const TravelProfileManager = () => {
  const [profile, setProfile] = useState<TravelProfile>({
    personalInfo: {
      name: "Alex Johnson",
      age: "28",
      nationality: "United States",
      languages: ["English", "French", "Spanish"]
    },
    preferences: {
      travelStyle: 'cultural',
      interests: ["History", "Art", "Food", "Photography", "Architecture"],
      budgetRange: 'medium',
      accommodationType: ["Hotels", "Boutique Properties"],
      transportPreference: ["Walking", "Public Transit", "Rideshare"]
    },
    accessibility: {
      mobilityNeeds: [],
      dietaryRestrictions: ["Vegetarian"],
      medicalConditions: []
    },
    safety: {
      riskTolerance: 'medium',
      emergencyContacts: [
        { name: "Sarah Johnson", phone: "+1-555-0123", relationship: "Sister" }
      ],
      travelInsurance: true
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const interestOptions = [
    "Adventure Sports", "Art & Museums", "Architecture", "Beach & Water", 
    "Culture & History", "Food & Dining", "Music & Entertainment", 
    "Nature & Wildlife", "Photography", "Shopping", "Nightlife", "Wellness"
  ];

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        interests: prev.preferences.interests.includes(interest)
          ? prev.preferences.interests.filter(i => i !== interest)
          : [...prev.preferences.interests, interest]
      }
    }));
  };

  const getTravelStyleColor = (style: string) => {
    switch (style) {
      case 'adventure':
        return 'bg-green-100 text-green-800';
      case 'cultural':
        return 'bg-purple-100 text-purple-800';
      case 'relaxed':
        return 'bg-blue-100 text-blue-800';
      case 'luxury':
        return 'bg-yellow-100 text-yellow-800';
      case 'budget':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Travel Profile</h2>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
          >
            <Settings className="h-4 w-4 mr-2" />
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="preferences" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Travel Style
                </h3>
                <Badge className={`${getTravelStyleColor(profile.preferences.travelStyle)} capitalize`}>
                  {profile.preferences.travelStyle}
                </Badge>
                {isEditing && (
                  <div className="mt-2 space-y-2">
                    {['adventure', 'cultural', 'relaxed', 'luxury', 'budget'].map((style) => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="travelStyle"
                          value={style}
                          checked={profile.preferences.travelStyle === style}
                          onChange={(e) => setProfile(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, travelStyle: e.target.value as any }
                          }))}
                        />
                        <span className="capitalize">{style}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Wallet className="h-4 w-4 mr-2" />
                  Budget Range
                </h3>
                <Badge className="capitalize">{profile.preferences.budgetRange}</Badge>
                {isEditing && (
                  <div className="mt-2 space-y-2">
                    {['low', 'medium', 'high', 'luxury'].map((budget) => (
                      <label key={budget} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="budgetRange"
                          value={budget}
                          checked={profile.preferences.budgetRange === budget}
                          onChange={(e) => setProfile(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, budgetRange: e.target.value as any }
                          }))}
                        />
                        <span className="capitalize">{budget}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {isEditing ? (
                  interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={profile.preferences.interests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))
                ) : (
                  profile.preferences.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">{interest}</Badge>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                {isEditing ? (
                  <Input
                    value={profile.personalInfo.name}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, name: e.target.value }
                    }))}
                  />
                ) : (
                  <p className="text-muted-foreground">{profile.personalInfo.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                {isEditing ? (
                  <Input
                    value={profile.personalInfo.age}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, age: e.target.value }
                    }))}
                  />
                ) : (
                  <p className="text-muted-foreground">{profile.personalInfo.age}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Languages</label>
              <div className="flex flex-wrap gap-2">
                {profile.personalInfo.languages.map((lang) => (
                  <Badge key={lang} variant="outline">{lang}</Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Dietary Restrictions</h3>
              <div className="flex flex-wrap gap-2">
                {profile.accessibility.dietaryRestrictions.length > 0 ? (
                  profile.accessibility.dietaryRestrictions.map((restriction) => (
                    <Badge key={restriction} variant="secondary">{restriction}</Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">None specified</p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Risk Tolerance
                </h3>
                <Badge className="capitalize">{profile.safety.riskTolerance}</Badge>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Travel Insurance</h3>
                <Badge variant={profile.safety.travelInsurance ? "default" : "destructive"}>
                  {profile.safety.travelInsurance ? "Active" : "Not Active"}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Emergency Contacts</h3>
              {profile.safety.emergencyContacts.map((contact, index) => (
                <Card key={index} className="p-3 mb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                    </div>
                    <p className="text-sm font-mono">{contact.phone}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
